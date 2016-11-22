package com.example.maxime.shopcastv3;

import android.content.Context;
import android.content.Entity;
import android.util.Log;

import com.loopj.android.http.*;

import cz.msebera.android.httpclient.HttpEntity;
import cz.msebera.android.httpclient.client.HttpClient;
import cz.msebera.android.httpclient.entity.StringEntity;

/**
 * Created by Maxime on 22/08/16.
 */


public class Requester {
    private static final String BASE_URL = "http://api.shopcast.fr/";

    private static AsyncHttpClient client = new AsyncHttpClient();

    public static void get(String url, String token, AsyncHttpResponseHandler responseHandler) {
        client.addHeader("Authorization", "Bearer " + token);
        client.addHeader("Content-Type", "application/json");
        client.get( getAbsoluteUrl(url), null, responseHandler);
    }

    public static void post(Context context, String token, String relativeUrl, StringEntity entity, String contentType, AsyncHttpResponseHandler responseHandler) {
        client.addHeader("Authorization", "Bearer " + token);
        client.addHeader("Content-Type", "application/json");
        client.post(context, getAbsoluteUrl(relativeUrl), entity, contentType, responseHandler);
    }


    public static void postLogin(Context context, String relativeUrl, StringEntity entity, String contentType, AsyncHttpResponseHandler responseHandler) {
        client.setEnableRedirects(true);
        client.post(context, getAbsoluteUrl(relativeUrl), entity, contentType, responseHandler);
    }

    public static void update(Context context, String token, String relativeUrl, StringEntity entity, String contentType, AsyncHttpResponseHandler responseHandler) {
        client.setEnableRedirects(true);
        client.addHeader("Authorization", "Bearer " + token);
        client.addHeader("Content-Type", "application/json");
        client.post(context, getAbsoluteUrl(relativeUrl), entity, contentType, responseHandler);
    }

    private static String getAbsoluteUrl(String relativeUrl) {
        Log.d("Login", BASE_URL + relativeUrl);
        return BASE_URL + relativeUrl;
    }

    public static void delete(String url, String token, AsyncHttpResponseHandler responseHandler) {
        client.addHeader("Authorization", "Bearer " + token);
        client.addHeader("Content-Type", "application/json");
        Log.d("TEST", getAbsoluteUrl(url));
        client.delete(getAbsoluteUrl(url), responseHandler);
    }
}