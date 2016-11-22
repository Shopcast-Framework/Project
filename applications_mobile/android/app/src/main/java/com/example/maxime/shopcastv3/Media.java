package com.example.maxime.shopcastv3;

import java.util.List;

/**
 * Created by Maxime on 24/08/16.
 */
public class Media {
    private String _name;
    private String _type;
    private String _desc;
    private String _originalName;
    private String _size;
    private List<String> _playlists;
    private String _id;





    public Media (String name, String type) { _type = type; _name = name;}

    public String getID() { return _id; }

    public void setID(String id) { _id = id;}

    public String getName() { return _name;}

    public String getType() { return _type;}

    public void setOriginalName(String name) {
        _originalName = name;
    }

    public void setDesc(String desc) {
        _desc = desc;
    }

    public void setSize(String size) {
        _size = size;
    }

    public String getOriginalName() { return _originalName;}

    public String getSize() { return _size;}

    public String getDesc() { return _desc;}


}
