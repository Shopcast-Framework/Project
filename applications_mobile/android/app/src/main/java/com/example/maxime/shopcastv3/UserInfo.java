package com.example.maxime.shopcastv3;

/**
 * Created by Maxime on 23/08/16.
 */
public class UserInfo {
    private String _token;
    private String _username;

    public UserInfo() {}

    public void setToken(String token) {
        _token = token;
    }

    public void setUserName(String username) {
        _username = username;
    }

    public String getToken() {
        return _token;
    }

    public String getUsername() {
        return _username;
    }

    public UserInfo(UserInfo userInfo) {
        _token = userInfo.getToken();
        _username = userInfo.getUsername();
    }
}
