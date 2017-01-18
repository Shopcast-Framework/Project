package com.example.maxime.shopcastv3;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.media.Image;
import android.net.Uri;
import android.os.Environment;
import android.provider.MediaStore;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

public class UploadPictures extends AppCompatActivity {
    private UserInfo mUserInfo = new UserInfo();
    private ImageButton mImageButton;
    private ImageButton mUploadButton;
    private ImageView mPreview;
    static final int REQUEST_IMAGE_CAPTURE = 1;
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
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_upload, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.action_picture:
                dispatchTakePictureIntent();
                return true;
            case R.id.action_send:
                dispatchTakePictureIntent();
                return true;
        }
        return super.onOptionsItemSelected(item);
    }



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_upload_pictures);

        Bundle extras = getIntent().getExtras();

        Toolbar toolbar = (Toolbar)findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setTitle("Upload Picture");
        toolbar.setTitleTextColor(0xFFFFFFFF);

        mUserInfo.setToken(extras.get("token").toString());
        mUserInfo.setUserName(extras.get("username").toString());
        mPreview = (ImageView) findViewById(R.id.previewImage);
        // here set the by default

        BottomNavigationView bottomNavigationView = (BottomNavigationView)
                findViewById(R.id.bottomNavigation);

        bottomNavigationView.getMenu().getItem(0).setChecked(false);
        bottomNavigationView.getMenu().getItem(3).setChecked(true);


        bottomNavigationView.setOnNavigationItemSelectedListener(
                new BottomNavigationView.OnNavigationItemSelectedListener() {
                    @Override
                    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                        switch (item.getItemId()) {
                            case R.id.action_playlist:
                                Intent myIntent = new Intent(UploadPictures.this, PlaylistActivity.class);
                                myIntent.putExtra("token", mUserInfo.getToken());
                                myIntent.putExtra("username", mUserInfo.getUsername());
                                UploadPictures.this.startActivity(myIntent);
                                UploadPictures.this.overridePendingTransition(0,0);
                                break;
                            case R.id.action_media:
                                myIntent = new Intent(UploadPictures.this, MediaActivity.class);
                                myIntent.putExtra("token", mUserInfo.getToken());
                                myIntent.putExtra("username", mUserInfo.getUsername());
                                UploadPictures.this.startActivity(myIntent);
                                UploadPictures.this.overridePendingTransition(0,0);
                                break;
                            case R.id.action_upload:
                                break;
                            case R.id.action_dashboard:
                                myIntent = new Intent(UploadPictures.this, DashboardActivity.class);
                                myIntent.putExtra("token", mUserInfo.getToken());
                                myIntent.putExtra("username", mUserInfo.getUsername());
                                UploadPictures.this.startActivity(myIntent);
                                UploadPictures.this.overridePendingTransition(0,0);
                                break;
                        }
                        return true;
                    }
                });

    }


    private boolean detectCamera() {
        if (getApplicationContext().getPackageManager().hasSystemFeature(PackageManager.FEATURE_CAMERA)){
            // this device has a camera
            return true;
        } else {
            // no camera on this device
            return false;
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == 200) {
            if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                if (takePictureIntent.resolveActivity(getPackageManager()) != null) {
                    startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE);
                }
            }
            else {
                Toast toast = Toast.makeText(this.getApplicationContext(), "Error: You don't have permission to take picture.", Toast.LENGTH_SHORT);
                toast.show();
            }
        }
    }


    private void dispatchTakePictureIntent() {
        if (checkSelfPermission(Manifest.permission.CAMERA)
                != PackageManager.PERMISSION_GRANTED) {

            requestPermissions(new String[]{Manifest.permission.CAMERA}, 200);
        } else {
            Intent intent = new Intent("android.media.action.IMAGE_CAPTURE");
            startActivityForResult(intent, REQUEST_IMAGE_CAPTURE);
        }

    }



    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == REQUEST_IMAGE_CAPTURE && resultCode == RESULT_OK) {
            Bundle extras = data.getExtras();
            Bitmap imageBitmap = (Bitmap) extras.get("data");
            mPreview.setImageBitmap(imageBitmap);
        }
    }

}
