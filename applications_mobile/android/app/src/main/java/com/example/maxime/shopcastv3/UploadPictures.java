package com.example.maxime.shopcastv3;

import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.media.Image;
import android.provider.MediaStore;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ImageButton;
import android.widget.ImageView;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class UploadPictures extends AppCompatActivity {
    private UserInfo _userinfo = new UserInfo();
    private ImageButton mImageButton;
    private ImageButton mUploadButton;
    private ImageView mPreview;
    static final int REQUEST_IMAGE_CAPTURE = 1;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_upload_pictures);

        Bundle extras = getIntent().getExtras();

        _userinfo.setToken(extras.get("token").toString());
        _userinfo.setUserName(extras.get("username").toString());
        mPreview = (ImageView) findViewById(R.id.previewImage);
        // here set the by default
        mImageButton = (ImageButton) findViewById(R.id.buttonTakePicture);

        mImageButton.setImageResource(R.drawable.ic_menu_camera);

        mImageButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // check if there is camera
                if (detectCamera() == false) {
                    // error message
                }
                // take picture
                dispatchTakePictureIntent();
                //uploadPicture();
            }
        });

        mUploadButton = (ImageButton) findViewById(R.id.uploadButton);
        mUploadButton.setImageResource(R.drawable.upload_icon);

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


    private void dispatchTakePictureIntent() {
        Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        if (takePictureIntent.resolveActivity(getPackageManager()) != null) {
            startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE);
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
