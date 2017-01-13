package com.example.maxime.shopcastv3;

import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.CardView;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.github.mikephil.charting.charts.PieChart;
import com.github.mikephil.charting.data.Entry;
import com.github.mikephil.charting.data.PieData;
import com.github.mikephil.charting.data.PieDataSet;
import com.github.mikephil.charting.data.PieEntry;
import com.github.mikephil.charting.formatter.PercentFormatter;
import com.github.mikephil.charting.utils.ColorTemplate;
import com.loopj.android.http.JsonHttpResponseHandler;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;


import java.lang.reflect.Array;
import java.util.ArrayList;

import cz.msebera.android.httpclient.Header;

public class DashboardActivity extends AppCompatActivity {
    private ImageButton mPlaylistNav;
    private ImageButton mMediaNav;
    private ImageButton mRemoteNav;
    private ImageButton mPictureNav;
    private TextView mMediaNumber;
    private TextView mPlaylistNumber;
    private TextView mMonitorNumber;
    private UserInfo mUserInfo = new UserInfo();
    private CardView mCardView;
    Context context;
    int backButtonCount = 0;

    private ImageView mComingSoon;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_dashboard);


        Bundle extras = getIntent().getExtras();

//        mUserInfo.setToken(extras.get("token").toString());
//        mUserInfo.setUserName(extras.get("username").toString());

        mCardView = (CardView) findViewById(R.id.view);

        mCardView.setRadius(25);
        mCardView.setCardElevation(15);

        // delete this line, for testing
        mUserInfo.setUserName("Maxime Manzano");

        TextView welcomeTitle = (TextView) findViewById(R.id.welcomeText);
        welcomeTitle.setText("Welcome " + mUserInfo.getUsername() + " !");

        context = this.getApplicationContext();

        initBottomNavigationView();
        initChart();
       // setIndicator();




    }

    private void getMediaNumber() {
        Requester.get("file", mUserInfo.getToken(), new JsonHttpResponseHandler() {
            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                Log.d("Media", response.toString());
                try {
                    mMediaNumber.setText(String.valueOf(response.getJSONArray("files").length()));
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

    private void getPlaylistNumber() {
        Requester.get("playlist", mUserInfo.getToken(), new JsonHttpResponseHandler() {
            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                Log.d("Media", response.toString());
                try {
                    mPlaylistNumber.setText(String.valueOf(response.getJSONArray("playlists")));
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

    private void getMonitorNumber() {
        Requester.get("monitor", mUserInfo.getToken(), new JsonHttpResponseHandler() {
            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                Log.d("Media", response.toString());
                try {
                    mMonitorNumber.setText(String.valueOf(response.getJSONArray("monitors")));
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }

            @Override
            public void onFailure(int i, Header[] header, String str, Throwable throwable) {
                Toast toast = Toast.makeText(context, "Error: Cannot get media number", Toast.LENGTH_SHORT);
                toast.show();
            }

            @Override
            public void onFailure(int statusCode, Header[] headers, Throwable throwable, JSONObject errorResponse) {
                super.onFailure(statusCode, headers, throwable, errorResponse);
                Log.d("LoginF", errorResponse.toString());
            }

        });
    }

    private boolean setIndicator() {
        mMediaNumber = (TextView) findViewById(R.id.mediaNumber);
        mPlaylistNumber = (TextView) findViewById(R.id.playlistNumber);
        mMonitorNumber = (TextView) findViewById(R.id.monitorNumber);

        getMediaNumber();
        getPlaylistNumber();
        getMonitorNumber();

        if (mMonitorNumber.getText() != null && mPlaylistNumber.getText() != null &&  mMonitorNumber.getText() != null)
            return true;
        return false;
    }


    public boolean initBottomNavigationView() {
        BottomNavigationView bottomNavigationView = (BottomNavigationView)
                findViewById(R.id.bottomNavigation);


        bottomNavigationView.setOnNavigationItemSelectedListener(
                new BottomNavigationView.OnNavigationItemSelectedListener() {
                    @Override
                    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                        switch (item.getItemId()) {
                            case R.id.action_playlist:
                                Intent myIntent = new Intent(DashboardActivity.this, PlaylistActivity.class);
                                myIntent.putExtra("token", mUserInfo.getToken());
                                myIntent.putExtra("username", mUserInfo.getUsername());
                                DashboardActivity.this.startActivity(myIntent);
                                DashboardActivity.this.overridePendingTransition(0,0);
                                break;
                            case R.id.action_media:
                                myIntent = new Intent(DashboardActivity.this, MediaActivity.class);
                                myIntent.putExtra("token", mUserInfo.getToken());
                                myIntent.putExtra("username", mUserInfo.getUsername());
                                DashboardActivity.this.startActivity(myIntent);
                                DashboardActivity.this.overridePendingTransition(0,0);

                                break;
                            case R.id.action_upload:
                                myIntent = new Intent(DashboardActivity.this, UploadPictures.class);
                                myIntent.putExtra("token", mUserInfo.getToken());
                                myIntent.putExtra("username", mUserInfo.getUsername());
                                DashboardActivity.this.startActivity(myIntent);
                                DashboardActivity.this.overridePendingTransition(0,0);

                                break;
                            case R.id.action_dashboard:
                                break;
                        }
                        return true;
                    }
                });
        return true;
    }

    public boolean initChart() {
        PieChart pieChart = (PieChart) findViewById(R.id.pie_chart);
        PieData pieData = setPieData();
        pieChart.setData(pieData);
        pieChart.highlightValues(null);

        // update pie chart
        pieChart.invalidate();
        pieChart.getLegend().setEnabled(false);
        pieChart.getDescription().setEnabled(false);
        pieChart.setMinimumHeight(300);
        pieChart.setExtraTopOffset(5);
        pieChart.animateXY(2000, 2000);
        return true;
    }


    private ArrayList<PieEntry> setYValues() {
        ArrayList<PieEntry> values = new ArrayList<PieEntry>();

        // set Real data

        values.add(0, new PieEntry(10, "MP3"));
        values.add(1, new PieEntry(30, "MP4"));
        values.add(2, new PieEntry(40, "MKV"));
        values.add(3, new PieEntry(10, "JPEG"));
        values.add(4, new PieEntry(10, "BMP"));

        return values;

    }

    private PieData setPieData() {
        ArrayList<PieEntry> yValues = setYValues();

        PieDataSet dataSet = new PieDataSet(yValues, "Media Type");
        dataSet.setSliceSpace(3);
        dataSet.setSelectionShift(5);

        ArrayList<Integer> colors = new ArrayList<Integer>();

        for (int c : ColorTemplate.VORDIPLOM_COLORS)
            colors.add(c);
        for (int c : ColorTemplate.JOYFUL_COLORS)
            colors.add(c);
        for (int c : ColorTemplate.COLORFUL_COLORS)
            colors.add(c);
        for (int c : ColorTemplate.LIBERTY_COLORS)
            colors.add(c);
        for (int c : ColorTemplate.PASTEL_COLORS)
            colors.add(c);

        colors.add(ColorTemplate.getHoloBlue());
        dataSet.setColors(colors);

        PieData data = new PieData(dataSet);
        data.setValueFormatter(new PercentFormatter());
        data.setValueTextSize(11f);
        data.setValueTextColor(Color.GRAY);

        return (data);
    }
}