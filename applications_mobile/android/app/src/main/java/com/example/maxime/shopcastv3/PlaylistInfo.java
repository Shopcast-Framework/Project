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

    public String getUserId() { return _userId; }

    public String getId() { return _id; }

    // add media in the constructor
    public PlaylistInfo(String name) { _name = name;  }

    public String getName() { return _name; }

    public List<Media> getMedia() { return _medias; }

    public void setID(String id) {

        _id = id;
        /* Requester.get("file", mUserInfo.getToken(), new JsonHttpResponseHandler() {
                @Override
                public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                    Log.d("Media", response.toString());
                    try {
                        _media = parseMedia(response.getJSONArray("files"));
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                    createView();
                }

                @Override
                public void onFailure(int statusCode, Header[] headers, Throwable throwable, JSONObject errorResponse) {
                    super.onFailure(statusCode, headers, throwable, errorResponse);
                    Log.d("LoginF", errorResponse.toString());
                }

            });*/
    }

    public void setName(String name) { _name = name;}

    public void setUserId(String userID) { _userId = userID; }

    public void setMedia(List<Media> medias) { _medias = medias;}



}
