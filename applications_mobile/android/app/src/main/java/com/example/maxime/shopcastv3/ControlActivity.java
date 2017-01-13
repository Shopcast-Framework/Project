package com.example.maxime.shopcastv3;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.ImageView;

public class ControlActivity extends AppCompatActivity {
    private Device _device;
    private ImageView mImageView;
    private UserInfo _userinfo = new UserInfo();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_control);

        Bundle extras = getIntent().getExtras();

        _device = (Device) getIntent().getSerializableExtra("Myclass");
//        _userinfo.setToken(extras.get("token").toString());
//        _userinfo.setUserName(extras.get("username").toString());

        mImageView = (ImageView) findViewById(R.id.comingSoon);
        mImageView.setImageResource(R.drawable.no_avaible);

        // set button stop / play

    }
}
