package com.example.maxime.shopcastv3;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.util.List;

/**
 * Created by Maxime on 24/08/16.
 */
public class PlaylistDetailAdapter extends RecyclerView.Adapter<PlaylistDetailAdapter.PlaylistDetailViewHolder> {
    private List<String> _media;
    private Context mContext;

    public PlaylistDetailAdapter(Context context, List<String> medialist) {
        _media =  medialist;
        mContext = context;
    }

    @Override
    public int getItemCount() { return _media.size();}

    @Override
    public void onBindViewHolder(PlaylistDetailViewHolder playlistDetailViewHolder, int i) {
        String media = _media.get(i);

        playlistDetailViewHolder._mediaName.setText(media);
    }

    @Override
    public PlaylistDetailViewHolder onCreateViewHolder(ViewGroup viewGroup, int i) {
        View itemView = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.detail_playlist, viewGroup, false);
        final PlaylistDetailViewHolder playlistDetailViewHolder = new PlaylistDetailViewHolder(itemView);
        return playlistDetailViewHolder;
    }

    public static class PlaylistDetailViewHolder extends RecyclerView.ViewHolder {
        protected TextView _mediaName;


        public PlaylistDetailViewHolder(View v) {
            super(v);
            _mediaName = (TextView) v.findViewById(R.id.title_media);

        }
    }
}
