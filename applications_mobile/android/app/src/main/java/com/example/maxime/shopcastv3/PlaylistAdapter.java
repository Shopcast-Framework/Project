package com.example.maxime.shopcastv3;

import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.support.transition.TransitionManager;
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

import java.util.ArrayList;
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
    private Button deleteBtn;
    private List<Boolean> isExpand;


    public PlaylistAdapter(Context context, List<PlaylistInfo> myDataset, UserInfo userInfo) {
        mDataset = myDataset;
        mContext = context;
        mUserInfo = new UserInfo(userInfo);

        isExpand = new ArrayList<>(mDataset.size());
        for(int i = 0; i < mDataset.size(); i++){
            isExpand.add(false);
        }
    }

    @Override
    public int getItemCount() {
        return mDataset.size();
    }

    @Override
    public void onBindViewHolder(PlaylistViewHolder playlistViewHolder, int i) {
        PlaylistInfo pi = mDataset.get(i);

        if(isExpand.get(i)) {
            TransitionManager.beginDelayedTransition(playlistViewHolder.expandableLayout);
            playlistViewHolder.expandableLayout.setVisibility(View.VISIBLE);
        } else {
            TransitionManager.beginDelayedTransition(playlistViewHolder.expandableLayout);
            playlistViewHolder.expandableLayout.setVisibility(View.GONE);
        }

        playlistViewHolder._playlistName.setText(pi.getName());
        Log.d("Playlist", pi.getName());
    }

    @Override
    public PlaylistViewHolder onCreateViewHolder(ViewGroup viewGroup, int i)
    {
        View itemView = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.playlist_view, viewGroup, false);
        final PlaylistViewHolder playlistViewHolder = new PlaylistViewHolder(itemView);

        final Button expandButton = (Button) itemView.findViewById(R.id.moreBtn);
        expandButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int position = playlistViewHolder.getAdapterPosition();
                if (v.getId() == expandButton.getId()) {
                    if(isExpand.get(position)) {
                        TransitionManager.beginDelayedTransition(playlistViewHolder.expandableLayout);
                        playlistViewHolder.expandableLayout.setVisibility(View.GONE);
                    } else {
                        TransitionManager.beginDelayedTransition(playlistViewHolder.expandableLayout);
                        playlistViewHolder.expandableLayout.setVisibility(View.VISIBLE);

                    }
                    isExpand.set(position, !isExpand.get(position));
                }
            }

        });

        final Button modify = (Button) itemView.findViewById(R.id.modifyBtn);
        modify.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(mContext, PlaylistDetailActivity.class);
                intent.putExtra("token", mUserInfo.getToken());
                intent.putExtra("username", mUserInfo.getUsername());
                intent.putExtra("Myclass", mDataset.get(playlistViewHolder.getAdapterPosition()));
                intent.putExtra("isModify", true);
                mContext.startActivity(intent);
            }
        });

        deleteBtn = (Button) itemView.findViewById(R.id.delete_btn);

        deleteBtn.setOnClickListener(new View.OnClickListener() {
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
        protected TextView _desc;
        ViewGroup expandableLayout;



        public PlaylistViewHolder(View v) {
            super(v);
            _desc = (TextView) v.findViewById(R.id.description);
            _playlistName = (TextView) v.findViewById(R.id.title);
            expandableLayout = (ViewGroup) itemView.findViewById(R.id.expandable_part_layout);;


        }
    }

}


