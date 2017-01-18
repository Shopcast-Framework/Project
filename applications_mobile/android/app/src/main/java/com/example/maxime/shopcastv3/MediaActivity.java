package com.example.maxime.shopcastv3;

import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.net.Uri;
import android.provider.MediaStore;
import android.support.annotation.IdRes;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
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
import android.view.animation.AccelerateInterpolator;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.loopj.android.http.JsonHttpResponseHandler;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import cz.msebera.android.httpclient.Header;
import cz.msebera.android.httpclient.entity.StringEntity;

public class MediaActivity extends AppCompatActivity {
    private UserInfo mUserInfo = new UserInfo();
    private RecyclerView mRecyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;
    private Button mUploadButton;
    private int PICK_IMAGE_REQUEST = 1;
    private List<Media> _media = new ArrayList<Media>();
    Context context;
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
        setContentView(R.layout.activity_media);

        Bundle extras = getIntent().getExtras();

        mUserInfo.setToken(extras.get("token").toString());
        mUserInfo.setUserName(extras.get("username").toString());

        mRecyclerView = (RecyclerView) findViewById(R.id.my_recycler_view_media);

        // use this setting to improve performance if you know that changes
        // in content do not change the layout size of the RecyclerView

        context = this.getApplicationContext();
        getMedia();


        BottomNavigationView bottomNavigationView = (BottomNavigationView)
                findViewById(R.id.bottomNavigation);

        bottomNavigationView.getMenu().getItem(0).setChecked(false);
        bottomNavigationView.getMenu().getItem(2).setChecked(true);

        Toolbar toolbar = (Toolbar)findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setTitle("Media");
        toolbar.setTitleTextColor(Color.parseColor("#03A9F4"));


        bottomNavigationView.setOnNavigationItemSelectedListener(
                new BottomNavigationView.OnNavigationItemSelectedListener() {
                    @Override
                    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                        switch (item.getItemId()) {
                            case R.id.action_playlist:
                                Intent myIntent = new Intent(MediaActivity.this, PlaylistActivity.class);
                                myIntent.putExtra("token", mUserInfo.getToken());
                                myIntent.putExtra("username", mUserInfo.getUsername());
                                MediaActivity.this.startActivity(myIntent);
                                MediaActivity.this.overridePendingTransition(0,0);
                                break;
                            case R.id.action_media:
                                break;
                            case R.id.action_upload:
                                myIntent = new Intent(MediaActivity.this, UploadPictures.class);
                                myIntent.putExtra("token", mUserInfo.getToken());
                                myIntent.putExtra("username", mUserInfo.getUsername());
                                MediaActivity.this.startActivity(myIntent);
                                MediaActivity.this.overridePendingTransition(0,0);
                                break;
                            case R.id.action_dashboard:
                                myIntent = new Intent(MediaActivity.this, DashboardActivity.class);
                                myIntent.putExtra("token", mUserInfo.getToken());
                                myIntent.putExtra("username", mUserInfo.getUsername());
                                MediaActivity.this.startActivity(myIntent);
                                MediaActivity.this.overridePendingTransition(0,0);
                                break;
                        }
                        return true;
                    }
                });

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
                uploadFile();
                return true;
        }
        return super.onOptionsItemSelected(item);
    }

    private void uploadFile() {
        Intent intent = new Intent();
        // Show only images, no videos or anything else
        intent.setType("image/*");
        intent.setAction(Intent.ACTION_GET_CONTENT);
        // Always show the chooser (if there are multiple options available)
        startActivityForResult(Intent.createChooser(intent, "Select Picture"), PICK_IMAGE_REQUEST);

    }

    private StringEntity getEntity(Bitmap bmp, Uri uri) {
        JSONObject jsonObject = new JSONObject();
        final String[] name = new String[1];

        try {
            jsonObject.put("name",  uri.toString().substring(uri.toString().lastIndexOf("/")+1 ) + "Android");
            jsonObject.put("encoding", "7bit");
            jsonObject.put("description", "Upload From android device");
            jsonObject.put("mimetype", "image/png");
            jsonObject.put("originalname", uri.toString().substring(uri.toString().lastIndexOf("/")+1));
            jsonObject.put("duration", null);
            jsonObject.put("data", bmp.toString());
            jsonObject.put("tag", "latence");
            jsonObject.put("size", String.valueOf(bmp.getByteCount()));
            StringEntity entity = new StringEntity(jsonObject.toString());
            return entity;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        Log.d("coucou", "here");
        if (requestCode == PICK_IMAGE_REQUEST && resultCode == RESULT_OK && data != null && data.getData() != null) {

            Uri uri = data.getData();

            try {
                Bitmap bitmap = MediaStore.Images.Media.getBitmap(getContentResolver(), uri);
                StringEntity entity = getEntity(bitmap, uri);
                if (entity == null) {
                    Toast toast = Toast.makeText(context, "Cannot convert file", Toast.LENGTH_SHORT);
                    toast.show();
                }
                Requester.post(this.getApplicationContext(), mUserInfo.getToken(), "file", entity, "application/json", new JsonHttpResponseHandler() {
                    @Override
                    public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                            Toast toast = Toast.makeText(context, "Succefully uploaded", Toast.LENGTH_SHORT);
                            toast.show();
                    }

                    @Override
                    public void onFailure(int i, Header[] header, String str, Throwable throwable) {
                        Toast toast = Toast.makeText(context, "Error: Cannot create playlist", Toast.LENGTH_SHORT);
                        toast.show();
                    }
                });
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private void createView() {

        if (_media == null || _media.size() == 0) {
            // display img
        } else {
            mRecyclerView.setHasFixedSize(true);

            // use a linear layout manager
            mLayoutManager = new LinearLayoutManager(this);
            mRecyclerView.setLayoutManager(mLayoutManager);

            // specify an adapter (see also next example)
            mAdapter = new MediaAdapter(this, _media, mUserInfo);
            mRecyclerView.setAdapter(mAdapter);
        }
    }

    private List<Media> parseMedia(JSONArray response) throws JSONException {

        int i = 0;

        while (i != response.length()) {

            Media media = new Media(response.getJSONObject(i).get("name").toString(), response.getJSONObject(i).get("mimetype").toString());
            media.setDesc(response.getJSONObject(i).get("description").toString());
            media.setOriginalName(response.getJSONObject(i).get("originalname").toString());
            media.setID(response.getJSONObject(i).get("id").toString());
            media.setSize(response.getJSONObject(i).get("size").toString());
            _media.add(media);
            i++;
        }
       return _media;
    }

    private void getMedia() {


       Requester.get("file", mUserInfo.getToken(), new JsonHttpResponseHandler() {
                @Override
                public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                    Log.d("Media", response.toString());
                    try {
                        _media = parseMedia(response.getJSONArray("files"));
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                    createView();
                }

                    @Override
            public void onFailure(int i, Header[] header, String str, Throwable throwable) {
                Toast toast = Toast.makeText(context, "Error: Cannot get medias list", Toast.LENGTH_SHORT);
                toast.show();
            }


                @Override
                public void onFailure(int statusCode, Header[] headers, Throwable throwable, JSONObject errorResponse) {
                    super.onFailure(statusCode, headers, throwable, errorResponse);
                    Log.d("LoginF", errorResponse.toString());
                }

            });
        }

}
