package com.example.maxime.shopcastv3;

import android.content.Context;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.TextView;
import android.widget.Toast;

import com.loopj.android.http.JsonHttpResponseHandler;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Text;

import java.util.ArrayList;
import java.util.List;

import cz.msebera.android.httpclient.Header;

public class PlaylistDetailActivity extends AppCompatActivity {
    private TextView mplaylistName;
    private UserInfo _userinfo;
    private TextView mdescription;
    private TextView msize;
    private PlaylistInfo _playlist;
    private RecyclerView mRecyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;
    private boolean isModify = false;
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
        setContentView(R.layout.activity_playlist_detail);

        //        _userinfo.setToken(extras.get("token").toString());
        //       _userinfo.setUserName(extras.get("username").toString());

        _playlist = (PlaylistInfo) getIntent().getSerializableExtra("Myclass");
        isModify = (boolean) getIntent().getSerializableExtra("isModify");

        context = this.getApplicationContext();

        Toolbar toolbar = (Toolbar)findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setTitle("Select Files");
        toolbar.setTitleTextColor(0xFFFFFFFF);


        Log.d("debug", String.valueOf(isModify));
        if (isModify) {
            setRecyclerView(_playlist.getMedia());
        } else {
            getAllMedia();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.playlist_action_menu, menu);
        return true;
    }

    private boolean applyAction() {
         List<Boolean> isSelected;
        PlaylistDetailAdapter adapter = (PlaylistDetailAdapter) mAdapter;
        isSelected = adapter.getSelectedList();

        if (isModify) {
            deleteSelectedFile(isSelected);
        } else {
            addSelectedFile(isSelected);
        }

        finish();
        return true;
    }

    private void deleteSelectedFile(List<Boolean> list) {
        int i = 0;
        while (i != _playlist.getMedia().size()) {
            if (list.get(i) == true) {
                Requester.delete("file/" + _playlist.getMedia().get(i).getID(), _userinfo.getToken(), new JsonHttpResponseHandler() {
                    @Override
                    public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                        Log.d("DELETE", response.toString());
                        Toast toast = Toast.makeText(context, "Successfully deleted", Toast.LENGTH_SHORT);
                        toast.show();
                    }

                    @Override
                    public void onFailure(int i, Header[] header, String str, Throwable throwable) {
                        Toast toast = Toast.makeText(context, "Error: Cannot delete selected files", Toast.LENGTH_SHORT);
                        toast.show();
                    }

                    @Override
                    public void onFailure(int statusCode, Header[] headers, Throwable throwable, JSONObject errorResponse) {
                        Log.d("FAILURE", Integer.toString(statusCode));
                    }
                });
                _playlist.getMedia().remove(i);
            }
            i++;
        }
    }

    private void addSelectedFile(List<Boolean> list) {
        // here do the add
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.applyAction:
                Log.d("testing", "this is a test");
                applyAction();
                return true;
        }
        return super.onOptionsItemSelected(item);
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

    private void getAllMedia() {
         Requester.get("file", _userinfo.getToken(), new JsonHttpResponseHandler() {
                @Override
                public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                    Log.d("Media", response.toString());
                    try {
                        _media = parseMedia(response.getJSONArray("files"));
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                    setRecyclerView(_media);
                }

                @Override
                public void onFailure(int statusCode, Header[] headers, Throwable throwable, JSONObject errorResponse) {
                    super.onFailure(statusCode, headers, throwable, errorResponse);
                    Log.d("LoginF", errorResponse.toString());
                }

            });
    }


    public void setRecyclerView(List<Media> mediasList) {

        // set media here
        mRecyclerView = (RecyclerView) findViewById(R.id.my_recycler_view);

        // use this setting to improve performance if you know that changes
        // in content do not change the layout size of the RecyclerView
        mRecyclerView.setHasFixedSize(true);

        // use a linear layout manager
        mLayoutManager = new LinearLayoutManager(this);
        mRecyclerView.setLayoutManager(mLayoutManager);

        // specify an adapter (see also next example)
        mAdapter = new PlaylistDetailAdapter(this, mediasList);
        mRecyclerView.setAdapter(mAdapter);

    }


}
