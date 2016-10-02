package com.example.maxime.shopcastv3;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Maxime on 24/08/16.
 */
public class PlaylistInfo implements Serializable {

    private String _name;
    private List<String> _medias = new ArrayList<String>();
    private String _id;
    private String _userId;

    public String getUserId() { return _userId; }

    public String getId() { return _id; }

    // add media in the constructor
    public PlaylistInfo(String name) { _name = name;  }

    public String getName() { return _name; }

    public List<String> getMedia() { return _medias; }

    public void setID(String id) {
        _id = id;
    }

    public void setName(String name) { _name = name;}

    public void setUserId(String userID) { _userId = userID; }

    public void setMedia(List<String> medias) { _medias = medias;}



}
