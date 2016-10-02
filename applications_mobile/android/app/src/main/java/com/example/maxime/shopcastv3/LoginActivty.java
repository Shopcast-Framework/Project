package com.example.maxime.shopcastv3;

import android.content.Context;
import android.content.Intent;
import android.preference.PreferenceActivity;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.util.Pair;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.ProgressBar;

import com.android.volley.NetworkResponse;
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.loopj.android.http.JsonHttpResponseHandler;
import com.loopj.android.http.RequestParams;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedWriter;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.loopj.android.http.AsyncHttpClient;
import com.loopj.android.http.JsonHttpResponseHandler;
import cz.msebera.android.httpclient.Header;
import cz.msebera.android.httpclient.entity.StringEntity;


public class LoginActivty extends AppCompatActivity {

    private ImageView mImageView;
    private EditText _username;
    private EditText _password;
    private UserInfo _userinfo; //used to transport datas
    private ProgressBar _progress;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login_activty);

        _progress = (ProgressBar) findViewById(R.id.progress);
        _progress.setVisibility(View.INVISIBLE);

        _username = (EditText) findViewById(R.id.username);
        _password = (EditText) findViewById(R.id.password);

        _userinfo = new UserInfo();

        mImageView = (ImageView) findViewById(R.id.imgLogo);
        mImageView.setImageResource(R.drawable.logo_test);
        final Button loginButton = (Button) findViewById(R.id.loginbutton);
        loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    progressing(true, loginButton);
                    attemptLogin();
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });

    }

    private void progressing(boolean i, Button loginButton) {

        if (i == true) {
            _progress.setVisibility(View.VISIBLE);
            _username.setVisibility(View.INVISIBLE);
            _password.setVisibility(View.INVISIBLE);
            loginButton.setVisibility(View.INVISIBLE);
        } else {
            _progress.setVisibility(View.INVISIBLE);
            _username.setVisibility(View.VISIBLE);
            _password.setVisibility(View.VISIBLE);
            loginButton.setVisibility(View.VISIBLE);
        }
    }

    private Boolean checkCredentials() {
        // basic check

        if (_username.length() == 0 || _password.length() == 0) {
            _username.setError("username or password should not be empty");
            return false;
        }
        return true;
    }

    private void attemptLogin() throws UnsupportedEncodingException, JSONException {


        if (this.checkCredentials() == false)
            return ;



        // change this when i have time
        JSONObject jsonObject = new JSONObject();

        jsonObject.put("strategy", "local");
        jsonObject.put("username", _username.getText().toString());
        jsonObject.put("password", _password.getText().toString());




        StringEntity entity = new StringEntity(jsonObject.toString());

        Requester.postLogin(this.getApplicationContext(), "session",  entity, "application/json",  new JsonHttpResponseHandler() {
            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                try {
                    _userinfo.setToken(response.getJSONObject("user").get("token").toString());
                    _userinfo.setUserName(_username.getText().toString());
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                loginSucced(response);


            }

            @Override
            public void onFailure(int statusCode, Header[] headers, Throwable throwable, JSONObject errorResponse) {
                super.onFailure(statusCode, headers, throwable, errorResponse);
                Log.d("LoginF", errorResponse.toString());
                loginFailed();
            }

        });

        
    }

    private void loginSucced(JSONObject jsonResponse) {
        Intent myIntent = new Intent(LoginActivty.this, DashboardActivity.class);
        Log.d("LoginAA", _userinfo.getToken());
        myIntent.putExtra("token", _userinfo.getToken());
        myIntent.putExtra("username", _userinfo.getUsername()); //Optional parameters
        LoginActivty.this.startActivity(myIntent);
        progressing(false, (Button) findViewById(R.id.loginbutton));
    }

    private void loginFailed() {
        _username.setError("Wrong password or username. Please retry.");
        progressing(false, (Button) findViewById(R.id.loginbutton));

    }

}
