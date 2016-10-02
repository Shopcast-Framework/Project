package com.example.maxime.shopcastv3;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RemoteActivity extends AppCompatActivity {
    private List<Device> _devices;
    private String _currentDevice;
    private UserInfo _userinfo = new UserInfo();
    private RecyclerView mRecyclerView;
    private RecyclerView.LayoutManager mLayoutManager;
    private DeviceAdapter mAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_remote);


        Bundle extras = getIntent().getExtras();

        _userinfo.setToken(extras.get("token").toString());
        _userinfo.setUserName(extras.get("username").toString());



        _currentDevice = null;

        mRecyclerView = (RecyclerView) findViewById(R.id.my_recycler_view_devices);

        // use this setting to improve performance if you know that changes
        // in content do not change the layout size of the RecyclerView
        mRecyclerView.setHasFixedSize(true);

        // use a linear layout manager
        mLayoutManager = new LinearLayoutManager(this);
        mRecyclerView.setLayoutManager(mLayoutManager);

        // specify an adapter (see also next example)
        mAdapter = new DeviceAdapter(this, _devices = getDeviceList(), _userinfo);
        mRecyclerView.setAdapter(mAdapter);

    }

    public List<Device> getDeviceList() {

        List<Device> devices = new ArrayList<Device>();

        JsonObjectRequest jsonRequest = new JsonObjectRequest(Request.Method.GET, "http://httpbin.org/get", null, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                try {
                    JSONObject jsonResponse  = response.getJSONObject("args");
                    //check error
                    Log.d("Remote", jsonResponse.toString());
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }, new Response.ErrorListener() {

            @Override
            public void onErrorResponse(VolleyError error) {
                error.printStackTrace();
            }
        }) {
            @Override
            public Map<String, String> getHeaders()
            {
                Map<String, String> params = new HashMap<>();
                params.put("BearerToken", _userinfo.getToken());
                return params;
            }
        };
        Volley.newRequestQueue(this).add(jsonRequest);

        // parse response

        devices.add(new Device("lol", "mp4", false, null));
        devices.add(new Device("lol", "mp4", false, null));
        devices.add(new Device("lol", "mp4", false, null));
        devices.add(new Device("lol", "mp4", false, null));


        return devices;
    }



}
