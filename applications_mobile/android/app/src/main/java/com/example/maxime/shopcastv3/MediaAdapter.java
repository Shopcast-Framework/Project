package com.example.maxime.shopcastv3;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.loopj.android.http.JsonHttpResponseHandler;

import org.json.JSONObject;

import java.util.List;

import cz.msebera.android.httpclient.Header;

/**
 * Created by Maxime on 24/08/16.
 */

public class MediaAdapter extends RecyclerView.Adapter<MediaAdapter.MediaViewHolder> {
    private List<Media> _media;
    private Context mContext;
    private UserInfo _userinfo;

    public MediaAdapter(Context context, List<Media> medialist, UserInfo userinfo) {
        _media =  medialist;
        mContext = context;
        _userinfo = userinfo;
    }

    @Override
    public int getItemCount() { return _media.size();}

    @Override
    public void onBindViewHolder(MediaViewHolder mediaViewHolder, int i) {
        Media media = _media.get(i);

        mediaViewHolder._mediaName.setText(media.getName());
        mediaViewHolder._typeMedia.setText(media.getType());
    }

    @Override
    public MediaViewHolder onCreateViewHolder(ViewGroup viewGroup, int i) {
        View itemView = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.media_view, viewGroup, false);
        final MediaViewHolder mediaViewHolder = new MediaViewHolder(itemView);

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
        protected TextView _typeMedia;


        public MediaViewHolder(View v) {
            super(v);
            _mediaName = (TextView) v.findViewById(R.id.title);
            _typeMedia = (TextView) v.findViewById(R.id.type_file);

        }
    }
}
