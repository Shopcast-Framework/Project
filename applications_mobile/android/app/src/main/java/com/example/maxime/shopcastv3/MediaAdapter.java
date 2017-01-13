package com.example.maxime.shopcastv3;

import android.content.Context;
import android.support.transition.TransitionManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.loopj.android.http.JsonHttpResponseHandler;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

import cz.msebera.android.httpclient.Header;

/**
 * Created by Maxime on 24/08/16.
 */

public class MediaAdapter extends RecyclerView.Adapter<MediaAdapter.MediaViewHolder> {
    private List<Media> _media;
    private Context mContext;
    private UserInfo _userinfo;
    private List<Boolean> isExpand;

    public MediaAdapter(Context context, List<Media> medialist, UserInfo userinfo) {
        _media =  medialist;
        mContext = context;
        _userinfo = userinfo;

        isExpand = new ArrayList<>(_media.size());
        for(int i = 0; i < _media.size(); i++){
            isExpand.add(false);
        }
    }

    @Override
    public int getItemCount() { return _media.size();}

    @Override
    public void onBindViewHolder(MediaViewHolder mediaViewHolder, int i) {
        Media media = _media.get(i);

        if(isExpand.get(i)) {
            TransitionManager.beginDelayedTransition(mediaViewHolder.expandableLayout);
            mediaViewHolder.expandableLayout.setVisibility(View.VISIBLE);
        } else {
            TransitionManager.beginDelayedTransition(mediaViewHolder.expandableLayout);
            mediaViewHolder.expandableLayout.setVisibility(View.GONE);
        }

        mediaViewHolder._mediaName.setText(media.getOriginalName());
        Log.d("desc", media.getDesc());
        mediaViewHolder._desc.setText(media.getDesc());
    }

    @Override
    public MediaViewHolder onCreateViewHolder(ViewGroup viewGroup, int i) {
        View itemView = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.media_view, viewGroup, false);
        final MediaViewHolder mediaViewHolder = new MediaViewHolder(itemView);
        final Button expandButton = (Button) itemView.findViewById(R.id.expan_btn_file);


         expandButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int position = mediaViewHolder.getAdapterPosition();
                if (v.getId() == expandButton.getId()) {
                    if(isExpand.get(position)) {
                        TransitionManager.beginDelayedTransition(mediaViewHolder.expandableLayout);
                        mediaViewHolder.expandableLayout.setVisibility(View.GONE);
                    } else {
                        TransitionManager.beginDelayedTransition(mediaViewHolder.expandableLayout);
                        mediaViewHolder.expandableLayout.setVisibility(View.VISIBLE);

                    }
                    isExpand.set(position, !isExpand.get(position));
                }
            }

        });


        itemView.findViewById(R.id.delete_btn_file).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Requester.delete("file/" + _media.get(mediaViewHolder.getAdapterPosition()).getID(), _userinfo.getToken(), new JsonHttpResponseHandler() {
                    @Override
                    public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                        Log.d("DELETE", response.toString());
                        if (statusCode == 200) {
                            _media.remove(mediaViewHolder.getAdapterPosition());
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

        return mediaViewHolder;
    }

    public static class MediaViewHolder extends RecyclerView.ViewHolder {
        protected TextView _mediaName;
        protected TextView _desc;
        ViewGroup expandableLayout;



        public MediaViewHolder(View v) {
            super(v);

            _desc = (TextView) v.findViewById(R.id.description);
            _mediaName = (TextView) v.findViewById(R.id.title);
            expandableLayout = (ViewGroup) itemView.findViewById(R.id.expandable_part_layout);;




        }
    }
}
