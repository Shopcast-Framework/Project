package com.example.maxime.shopcastv3;

import android.app.Activity;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.view.ContextThemeWrapper;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.loopj.android.http.JsonHttpResponseHandler;
import com.loopj.android.http.RequestParams;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import cz.msebera.android.httpclient.Header;
import cz.msebera.android.httpclient.entity.StringEntity;

public class PlaylistActivity extends AppCompatActivity {
    private RecyclerView mRecyclerView;
    private ImageView mImageView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;
    private UserInfo mUserInfo = new UserInfo();
    private List<PlaylistInfo> playlistInfos = new ArrayList<PlaylistInfo>();
    Context context ;
    int backButtonCount = 0;

    @Override
    public void onBackPressed()
    {
        if(backButtonCount >= 1)
        {
            Intent intent = new Intent(Intent.ACTION_MAIN);
            intent.addCategory(Intent.CATEGORY_HOME);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            startActivity(intent);
        }
        else
        {
            Toast.makeText(this, "Press the back button once again to close the application.", Toast.LENGTH_SHORT).show();
            backButtonCount++;
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_playlist);

        Bundle extras = getIntent().getExtras();

  //      _userinfo.setToken(extras.get("token").toString());
   //     _userinfo.setUserName(extras.get("username").toString());

        context = this.getApplicationContext();
        Toolbar toolbar = (Toolbar)findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setTitle("Playlists");
        toolbar.setTitleTextColor(0xFFFFFFFF);
        BottomNavigationView bottomNavigationView = (BottomNavigationView)
                findViewById(R.id.bottomNavigation);

        bottomNavigationView.getMenu().getItem(0).setChecked(false);

        bottomNavigationView.getMenu().getItem(1).setEnabled(true);
        bottomNavigationView.getMenu().getItem(1).setChecked(true);

        bottomNavigationView.setOnNavigationItemSelectedListener(
                new BottomNavigationView.OnNavigationItemSelectedListener() {
                    @Override
                    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                        switch (item.getItemId()) {
                            case R.id.action_playlist:
                                break;
                            case R.id.action_media:
                                Intent myIntent = new Intent(PlaylistActivity.this, MediaActivity.class);
                                myIntent.putExtra("token", mUserInfo.getToken());
                                myIntent.putExtra("username", mUserInfo.getUsername());
                                PlaylistActivity.this.startActivity(myIntent);
                                PlaylistActivity.this.overridePendingTransition(0,0);
                                break;
                            case R.id.action_upload:
                                myIntent = new Intent(PlaylistActivity.this, UploadPictures.class);
                                myIntent.putExtra("token", mUserInfo.getToken());
                                myIntent.putExtra("username", mUserInfo.getUsername());
                                PlaylistActivity.this.startActivity(myIntent);
                                PlaylistActivity.this.overridePendingTransition(0,0);
                                break;
                            case R.id.action_dashboard:
                                myIntent = new Intent(PlaylistActivity.this, DashboardActivity.class);
                                myIntent.putExtra("token", mUserInfo.getToken());
                                myIntent.putExtra("username", mUserInfo.getUsername());
                                PlaylistActivity.this.startActivity(myIntent);
                                PlaylistActivity.this.overridePendingTransition(0,0);
                                break;
                        }
                        return true;
                    }
                });

        mRecyclerView = (RecyclerView) findViewById(R.id.my_recycler_view);
        mImageView = (ImageView) findViewById(R.id.no_playlist);
        mImageView.setVisibility(View.INVISIBLE);
        getPlaylist();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_media, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.action_upload:
                createPlaylist();
                return true;
        }
        return super.onOptionsItemSelected(item);
    }


    private void createPlaylist() {
        AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(new ContextThemeWrapper(this, R.style.myDialog));
        alertDialogBuilder.setTitle("Create a new Playlist");
        alertDialogBuilder.setMessage("Enter the name of your playlist");
        final EditText input = new EditText(this.getApplicationContext());
        alertDialogBuilder.setView(input);
        final AlertDialog alertDialog = alertDialogBuilder.create();
        alertDialog.setButton(DialogInterface.BUTTON_POSITIVE, "CREATE", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                JSONObject jsonObject = new JSONObject();
                try {
                    jsonObject.put("name", input.getText().toString());
                    jsonObject.put("descritpion","No description");
                    StringEntity entity = new StringEntity(jsonObject.toString());
                    sendPlaylist(entity);

                } catch (Exception e) {
                        e.printStackTrace();
                    }
            }
        });
        alertDialog.show();

    }

    private void sendPlaylist(StringEntity entity) {
        Requester.post(this.getApplicationContext(), mUserInfo.getToken(), "playlist", entity, "application/json", new JsonHttpResponseHandler() {
            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                Log.d("PLAYL", response.toString());
                try {
                    PlaylistInfo pl = new PlaylistInfo(response.getJSONObject("playlist").getString("name"));
                    pl.setID(response.getJSONObject("playlist").getString("id"));
                    pl.setUserId(response.getJSONObject("playlist").getString("user_id"));
                    playlistInfos.add(pl);
                    Toast toast = Toast.makeText(context, "Succefully Created", Toast.LENGTH_SHORT);
                    toast.show();
                } catch (JSONException e) {
                    e.printStackTrace();
                    Toast toast = Toast.makeText(context, "Error: Cannot create Playlist", Toast.LENGTH_SHORT);
                    toast.show();
                }
                mAdapter.notifyDataSetChanged();

            }

            @Override
            public void onFailure(int i, Header[] header, String str, Throwable throwable) {
                Toast toast = Toast.makeText(context, "Error: Cannot create playlist", Toast.LENGTH_SHORT);
                toast.show();
            }
        });
    }

    private void createView() {
        if (playlistInfos == null || playlistInfos.size() == 0) {
            mImageView.setVisibility(View.VISIBLE);
            mRecyclerView.setVisibility(View.INVISIBLE);
        } else {

            // use a linear layout manager
            mLayoutManager = new LinearLayoutManager(this);
            mRecyclerView.setLayoutManager(mLayoutManager);

            // specify an adapter (see also next example)
            mAdapter = new PlaylistAdapter(this, playlistInfos, mUserInfo);
            mRecyclerView.setAdapter(mAdapter);
        }
    }

    // method to call api
    private void getPlaylist() {

     /*   Requester.get("playlist", mUserInfo.getToken(), new JsonHttpResponseHandler() {
            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                try {
                     playlistInfos = parsePlaylist(response.getJSONArray("playlists"));
                     createView();
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }

                @Override
            public void onFailure(int i, Header[] header, String str, Throwable throwable) {
                Toast toast = Toast.makeText(context, "Error: Cannot get playlists", Toast.LENGTH_SHORT);
                toast.show();
            }

        });*/

       // playlistInfos = parsePlaylist(response.getJSONArray("playlists"));
        try {
            playlistInfos = parsePlaylist(new JSONArray());
        } catch (JSONException e) {
            e.printStackTrace();
        }
        createView();

    }

    private List<PlaylistInfo> parsePlaylist(JSONArray response) throws JSONException {
        int i = 0;

/*
        while (i != response.length()) {
*/

            while (i != 10) {

            PlaylistInfo playlist = new PlaylistInfo("TestPlaylist");
            playlist.setID(String.valueOf(i));
            playlist.setUserId("1");
            playlistInfos.add(playlist);
            i++;
            /*
            PlaylistInfo playlist = new PlaylistInfo(response.getJSONObject(i).get("name").toString());
            playlist.setID(response.getJSONObject(i).get("id").toString());
            playlist.setUserId(response.getJSONObject(i).get("user_id").toString());
            // add medias list
            playlistInfos.add(playlist);
            i++;*/
        }
        Log.d("Playlistparse", Integer.toString(playlistInfos.size()));
        return playlistInfos;
    }
}
