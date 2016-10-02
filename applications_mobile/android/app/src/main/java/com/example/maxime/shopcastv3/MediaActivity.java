package com.example.maxime.shopcastv3;

import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.provider.MediaStore;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.view.animation.AccelerateInterpolator;
import android.widget.Button;
import android.widget.ImageView;

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

public class MediaActivity extends AppCompatActivity {
    private UserInfo _userinfo = new UserInfo();
    private RecyclerView mRecyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;
    private Button mUploadButton;
    private int PICK_IMAGE_REQUEST = 1;
    private List<Media> _media = new ArrayList<Media>();


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_media);

        Bundle extras = getIntent().getExtras();

        _userinfo.setToken(extras.get("token").toString());
        _userinfo.setUserName(extras.get("username").toString());

        mRecyclerView = (RecyclerView) findViewById(R.id.my_recycler_view_media);

        // use this setting to improve performance if you know that changes
        // in content do not change the layout size of the RecyclerView

        getMedia();

        mUploadButton = (Button) findViewById(R.id.upload_file_btn);
        mUploadButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                uploadFile();
            }
        });

    }

    private void uploadFile() {
        Intent intent = new Intent();
        // Show only images, no videos or anything else
        intent.setType("image/*");
        intent.setAction(Intent.ACTION_GET_CONTENT);
        // Always show the chooser (if there are multiple options available)
        startActivityForResult(Intent.createChooser(intent, "Select Picture"), PICK_IMAGE_REQUEST);

    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == PICK_IMAGE_REQUEST && resultCode == RESULT_OK && data != null && data.getData() != null) {

            Uri uri = data.getData();

            try {
                Bitmap bitmap = MediaStore.Images.Media.getBitmap(getContentResolver(), uri);
                // send picture to the server here

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
            mAdapter = new MediaAdapter(this, _media, _userinfo);
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

            Requester.get("file", _userinfo.getToken(), new JsonHttpResponseHandler() {
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
                public void onFailure(int statusCode, Header[] headers, Throwable throwable, JSONObject errorResponse) {
                    super.onFailure(statusCode, headers, throwable, errorResponse);
                    Log.d("LoginF", errorResponse.toString());
                }

            });
        }

}
