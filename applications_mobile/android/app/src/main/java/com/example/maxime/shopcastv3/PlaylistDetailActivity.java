package com.example.maxime.shopcastv3;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.widget.TextView;

import org.w3c.dom.Text;

import java.util.List;

public class PlaylistDetailActivity extends AppCompatActivity {
    private TextView mplaylistName;
    private TextView mdescription;
    private TextView msize;
    private PlaylistInfo _playlist;
    private RecyclerView mRecyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_playlist_detail);

        _playlist = (PlaylistInfo) getIntent().getSerializableExtra("Myclass");

        mplaylistName = (TextView) findViewById(R.id.playlist_name);
        mdescription = (TextView) findViewById(R.id.description);
        msize = (TextView) findViewById(R.id.media_size);

        mplaylistName.setText(_playlist.getName());
        // handle descritption
        mdescription.setText("No description");

        msize.setText(Integer.toString(_playlist.getMedia().size()));

        if (_playlist.getMedia().size() == 0 || _playlist.getMedia() == null) {
            // do something
        } else {


            mRecyclerView = (RecyclerView) findViewById(R.id.my_recycler_view);

            // use this setting to improve performance if you know that changes
            // in content do not change the layout size of the RecyclerView
            mRecyclerView.setHasFixedSize(true);

            // use a linear layout manager
            mLayoutManager = new LinearLayoutManager(this);
            mRecyclerView.setLayoutManager(mLayoutManager);

            // specify an adapter (see also next example)
            mAdapter = new PlaylistDetailAdapter(this, _playlist.getMedia());
            mRecyclerView.setAdapter(mAdapter);
        }
    }


}
