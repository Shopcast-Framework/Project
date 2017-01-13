package com.example.maxime.shopcastv3;

import android.content.Context;
import android.support.transition.TransitionManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CheckBox;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Maxime on 24/08/16.
 */
public class PlaylistDetailAdapter extends RecyclerView.Adapter<PlaylistDetailAdapter.PlaylistDetailViewHolder> {
    private List<Media> _media;
    private Context mContext;
    private List<Boolean> isSelected;


    public PlaylistDetailAdapter(Context context, List<Media> medialist) {
        _media =  medialist;
        mContext = context;

        isSelected = new ArrayList<>(_media.size());
        for(int i = 0; i < _media.size(); i++){
            isSelected.add(false);
        }
    }

    @Override
    public int getItemCount() { return _media.size();}

    @Override
    public void onBindViewHolder(PlaylistDetailViewHolder playlistDetailViewHolder, int i) {
        Media media = _media.get(i);

        if (isSelected.get(i)) {
            playlistDetailViewHolder.isSelected.setEnabled(true);
        } else {
            playlistDetailViewHolder.isSelected.setEnabled(false);
        }
    }

    @Override
    public PlaylistDetailViewHolder onCreateViewHolder(ViewGroup viewGroup, int i) {
        View itemView = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.detail_playlist, viewGroup, false);
        final PlaylistDetailViewHolder playlistDetailViewHolder = new PlaylistDetailViewHolder(itemView);

        playlistDetailViewHolder.isSelected.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (v.getId() == playlistDetailViewHolder.isSelected.getId()) {
                    if (playlistDetailViewHolder.isSelected.isEnabled()) {
                        isSelected.set(playlistDetailViewHolder.getAdapterPosition(), false);
                    } else {
                        isSelected.set(playlistDetailViewHolder.getAdapterPosition(), true);
                    }
                }
            }

        });
        return playlistDetailViewHolder;
    }

    public List<Boolean> getSelectedList() { return isSelected; }

    public static class PlaylistDetailViewHolder extends RecyclerView.ViewHolder {
        protected TextView _mediaName;
        CheckBox isSelected;

        public PlaylistDetailViewHolder(View v) {
            super(v);
            isSelected = (CheckBox) v.findViewById(R.id.checkBox);
            _mediaName = (TextView) v.findViewById(R.id.title_media);

        }
    }
}
