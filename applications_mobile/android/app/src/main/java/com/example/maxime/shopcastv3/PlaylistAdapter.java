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
import android.widget.ImageButton;
import android.widget.TextView;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.loopj.android.http.JsonHttpResponseHandler;

import org.json.JSONObject;
import org.w3c.dom.Text;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import cz.msebera.android.httpclient.Header;

/**
 * Created by Maxime on 24/08/16.
 */
public class PlaylistAdapter extends RecyclerView.Adapter<PlaylistAdapter.PlaylistViewHolder> {
    private List<PlaylistInfo> mDataset;
    private Context mContext;
    private UserInfo mUserInfo;
    private ImageButton mImageButton;


    public PlaylistAdapter(Context context, List<PlaylistInfo> myDataset, UserInfo userInfo) {
        mDataset = myDataset;
        mContext = context;
        mUserInfo = new UserInfo(userInfo);
    }

    @Override
    public int getItemCount() {
        return mDataset.size();
    }

    @Override
    public void onBindViewHolder(PlaylistViewHolder playlistViewHolder, int i) {
        PlaylistInfo pi = mDataset.get(i);

        playlistViewHolder._playlistName.setText(pi.getName());
        Log.d("Playlist", pi.getName());
    }

    @Override
    public PlaylistViewHolder onCreateViewHolder(ViewGroup viewGroup, int i)
    {
        View itemView = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.playlist_view, viewGroup, false);
        final PlaylistViewHolder playlistViewHolder = new PlaylistViewHolder(itemView);


        itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(mContext, PlaylistDetailActivity.class);

                intent.putExtra("Myclass", mDataset.get(playlistViewHolder.getAdapterPosition()));

                mContext.startActivity(intent);
            }
        });

        mImageButton = (ImageButton) itemView.findViewById(R.id.delete_btn);

        mImageButton.setImageResource(R.drawable.no_avaible);
        itemView.findViewById(R.id.delete_btn).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Requester.delete("playlist/" + mDataset.get(playlistViewHolder.getAdapterPosition()).getId(), mUserInfo.getToken(), new JsonHttpResponseHandler() {
                    @Override
                    public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                        Log.d("DELETE", response.toString());
                        if (statusCode == 200) {
                            mDataset.remove(playlistViewHolder.getAdapterPosition());
                            notifyDataSetChanged();
                        }
                    }

                    @Override
                    public void onFailure(int statusCode, Header[] headers, Throwable throwable, JSONObject errorResponse) {
                            Log.d("FAILURE", Integer.toString(statusCode));
                    }
                });
            }
        });
        return playlistViewHolder;
    }


    public static class PlaylistViewHolder extends RecyclerView.ViewHolder {
        protected TextView _playlistName;


        public PlaylistViewHolder(View v) {
            super(v);
            _playlistName = (TextView) v.findViewById(R.id.title);

        }
    }

}


