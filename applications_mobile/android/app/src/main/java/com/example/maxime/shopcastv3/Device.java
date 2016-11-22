package com.example.maxime.shopcastv3;

import java.io.Serializable;

/**
 * Created by Maxime on 08/09/16.
 */
public class Device implements Serializable {
    private String _name;
    private String _type;
    private boolean _active;
    private String _playing;

    public String getName() {
        return _name;
    }

    public String getType() {
        return _type;
    }

    public boolean isActive() {
        return _active;
    }

    public String whatIsPlaying() {
        if(_active == true) {
            return _playing;
        }
        return null;
    }

    public Device(String name, String type, boolean active, String playing) {
        _name = name;
        _type = type;
        _active = active;
        if (playing != null) {
            _playing = playing;
        }
    }

}
