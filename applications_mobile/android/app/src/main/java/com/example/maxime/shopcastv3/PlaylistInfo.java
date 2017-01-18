package com.example.maxime.shopcastv3;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Maxime on 24/08/16.
 */
public class PlaylistInfo implements Serializable {

    private String _name;
    private List<Media> _medias = new ArrayList<Media>();
    private String _id;
    private String _userId;
    private String _description;


    public String getDescription() { return _description; }

    public void setDescription(String desc) {
        _description = desc;
    }

    public String getUserId() { return _userId; }

    public String getId() { return _id; }

    // add media in the constructor
    public PlaylistInfo(String name) { _name = name;  }

    public String getName() { return _name; }

    public List<Media> getMedia() { return _medias; }

    public void setID(String id) {

        _id = id;

    }

    public void setName(String name) { _name = name;}

    public void setUserId(String userID) { _userId = userID; }

    public void setMedia(List<Media> medias) { _medias = medias;}



}
