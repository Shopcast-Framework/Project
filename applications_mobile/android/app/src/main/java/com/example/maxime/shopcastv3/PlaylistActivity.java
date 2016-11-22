package com.example.maxime.shopcastv3;

import android.app.Activity;
import android.content.DialogInterface;
import android.content.Intent;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.view.ContextThemeWrapper;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
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
    private UserInfo _userinfo = new UserInfo();
    private List<PlaylistInfo> playlistInfos = new ArrayList<PlaylistInfo>();
    private Button mCreatePlaylist;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_playlist);

        Bundle extras = getIntent().getExtras();

        _userinfo.setToken(extras.get("token").toString());
        _userinfo.setUserName(extras.get("username").toString());


        Log.d("PlaylistaF", Integer.toString(playlistInfos.size()));


        mCreatePlaylist = (Button) findViewById(R.id.createPlaylist);

        mCreatePlaylist.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                createPlaylist();
            }
        });
        mRecyclerView = (RecyclerView) findViewById(R.id.my_recycler_view);
        mImageView = (ImageView) findViewById(R.id.no_playlist);
        mImageView.setVisibility(View.INVISIBLE);
        getPlaylist();
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
        Requester.post(this.getApplicationContext(), _userinfo.getToken(), "playlist", entity, "application/json", new JsonHttpResponseHandler() {
            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                Log.d("PLAYL", response.toString());
                try {
                    PlaylistInfo pl = new PlaylistInfo(response.getJSONObject("playlist").getString("name"));
                    pl.setID(response.getJSONObject("playlist").getString("id"));
                    pl.setUserId(response.getJSONObject("playlist").getString("user_id"));
                    playlistInfos.add(pl);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                mAdapter.notifyDataSetChanged();
            }

            @Override
            public void onFailure(int statusCode, Header[] headers, Throwable throwable, JSONObject errorResponse) {
                Log.d("Failure", Integer.toString(statusCode));
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
            mAdapter = new PlaylistAdapter(this, playlistInfos, _userinfo);
            mRecyclerView.setAdapter(mAdapter);
        }
    }

    // method to call api
    private void getPlaylist() {

        Requester.get("playlist", _userinfo.getToken(), new JsonHttpResponseHandler() {
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
            public void onFailure(int statusCode, Header[] headers, Throwable throwable, JSONObject errorResponse) {
                super.onFailure(statusCode, headers, throwable, errorResponse);
                   Log.d("LoginF", errorResponse.toString());
            }

        });

    }

    private List<PlaylistInfo> parsePlaylist(JSONArray response) throws JSONException {
        int i = 0;

        while (i != response.length()) {

            PlaylistInfo playlist = new PlaylistInfo(response.getJSONObject(i).get("name").toString());
            playlist.setID(response.getJSONObject(i).get("id").toString());
            playlist.setUserId(response.getJSONObject(i).get("user_id").toString());
            // add medias list
            playlistInfos.add(playlist);
            i++;
        }
        Log.d("Playlistparse", Integer.toString(playlistInfos.size()));
        return playlistInfos;
    }
}
