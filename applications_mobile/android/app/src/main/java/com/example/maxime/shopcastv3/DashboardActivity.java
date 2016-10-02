package com.example.maxime.shopcastv3;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ImageButton;
import android.widget.ImageView;

public class DashboardActivity extends AppCompatActivity {
    private ImageButton mPlaylistNav;
    private ImageButton mMediaNav;
    private ImageButton mRemoteNav;
    private ImageButton mPictureNav;
    private UserInfo mUserInfo = new UserInfo();

    private ImageView mComingSoon;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_dashboard);


        Bundle extras = getIntent().getExtras();

        mComingSoon = (ImageView) findViewById(R.id.comingSoonDashboard);
        mComingSoon.setImageResource(R.drawable.no_avaible);

        mUserInfo.setToken(extras.get("token").toString());
        mUserInfo.setUserName(extras.get("username").toString());

        mPlaylistNav = (ImageButton) findViewById(R.id.playlistNav);
        mMediaNav = (ImageButton) findViewById(R.id.mediaNav);
        mRemoteNav = (ImageButton) findViewById(R.id.remoteNav);
        mPictureNav = (ImageButton) findViewById(R.id.pictureNav);

        setPicture();
        setListener();

    }

    private void setPicture() {
        //playlist
        mPlaylistNav.setImageResource(R.drawable.list_icon);
        //media
        mMediaNav.setImageResource(R.drawable.dashboard_icon);
        //remote
        mRemoteNav.setImageResource(R.drawable.settings_icon);
        //picture
        mPictureNav.setImageResource(R.drawable.upload_icon);
    }

    private void setListener() {
        //playlist
        mPlaylistNav.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent myIntent = new Intent(DashboardActivity.this, PlaylistActivity.class);
                myIntent.putExtra("token", mUserInfo.getToken());
                myIntent.putExtra("username", mUserInfo.getUsername());
                DashboardActivity.this.startActivity(myIntent);
            }
        });
        //media
        mMediaNav.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent myIntent = new Intent(DashboardActivity.this, MediaActivity.class);
                myIntent.putExtra("token", mUserInfo.getToken());
                myIntent.putExtra("username", mUserInfo.getUsername());
                DashboardActivity.this.startActivity(myIntent);
            }
        });
        //remote
        mRemoteNav.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent myIntent = new Intent(DashboardActivity.this, ControlActivity.class);
                myIntent.putExtra("token", mUserInfo.getToken());
                myIntent.putExtra("username", mUserInfo.getUsername());
                DashboardActivity.this.startActivity(myIntent);
            }
        });
        // picture upload
        mPictureNav.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent myIntent = new Intent(DashboardActivity.this, UploadPictures.class);
                myIntent.putExtra("token", mUserInfo.getToken());
                myIntent.putExtra("username", mUserInfo.getUsername());
                DashboardActivity.this.startActivity(myIntent);
            }
        });
    }
}
