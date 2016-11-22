package com.example.maxime.shopcastv3;

import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.support.v7.app.AlertDialog;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.w3c.dom.Text;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Maxime on 24/08/16.
 */
public class DeviceAdapter extends RecyclerView.Adapter<DeviceAdapter.DeviceViewHolder> {
    private List<Device> mDataset;
    private Context mContext;
    private UserInfo mUserInfo;


    public DeviceAdapter(Context context, List<Device> myDataset, UserInfo userInfo) {
        mDataset = myDataset;
        mContext = context;
        mUserInfo = new UserInfo(userInfo);
    }

    @Override
    public int getItemCount() {
        return mDataset.size();
    }

    @Override
    public void onBindViewHolder(DeviceViewHolder deviceViewHolder, int i) {
        Device pi = mDataset.get(i);

        deviceViewHolder._deviceName.setText(pi.getName());
        Log.d("Device", pi.getName());
    }

    @Override
    public DeviceViewHolder onCreateViewHolder(ViewGroup viewGroup, int i)
    {
        View itemView = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.device_view, viewGroup, false);
        final DeviceViewHolder deviceViewHolder = new DeviceViewHolder(itemView);


        itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(mContext, ControlActivity.class);

                // send devices

                intent.putExtra("Myclass", mDataset.get(deviceViewHolder.getAdapterPosition()));
                intent.putExtra("name", mUserInfo.getUsername());
                intent.putExtra("token", mUserInfo.getToken());

                mContext.startActivity(intent);
            }
        });
        return deviceViewHolder;

    }


    public static class DeviceViewHolder extends RecyclerView.ViewHolder {
        protected TextView _deviceName;


        public DeviceViewHolder(View v) {
            super(v);
            _deviceName = (TextView) v.findViewById(R.id.title_device);

        }
    }

}


