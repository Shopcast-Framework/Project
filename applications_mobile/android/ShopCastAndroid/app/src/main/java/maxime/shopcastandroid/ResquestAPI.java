package maxime.shopcastandroid;

import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * Created by Maxime on 3/10/2016.
 */
public class ResquestAPI {
    private URL url;
    private HttpURLConnection urlConnection;
    private BufferedReader bufferedReader;
    private StringBuilder stringBuilder;
    private String line;


    public String loginPost(String section, String username, String password) {
        try {
            url = new URL("http://10.0.3.2:3001/api/" + section);

            urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setDoInput(true);
            urlConnection.setDoOutput(true);
            urlConnection.setRequestProperty("Content-Type", "application/json");
           // urlConnection.setRequestProperty("Accept", "application/json");
            urlConnection.setRequestMethod("POST");


            // creation des paramètres
            JSONObject login = new JSONObject();

            login.put("strategy", "local");
            login.put("username", username);
            login.put("password", password);


            // ajout des paramètres
            OutputStreamWriter wr = new OutputStreamWriter(urlConnection.getOutputStream());


            wr.write(login.toString());
            wr.flush();
            try {
                stringBuilder = new StringBuilder();
                int result = urlConnection.getResponseCode();
                if (result == HttpURLConnection.HTTP_OK) {
                    BufferedReader br = new BufferedReader(
                            new InputStreamReader(urlConnection.getInputStream(), "utf-8"));
                    String line = null;

                    while ((line = br.readLine()) != null) {
                        stringBuilder.append(line + "\n");
                    }

                return (this.getStringFromJson(this.getStringFromJson(stringBuilder.toString(), "user"), "token"));
                } else {
                   return ("not okay");
                }
            } finally {
                urlConnection.disconnect();
            }
        } catch (Exception e) {
            return (e.toString());
        }
    }

    public String playlistPost(String section) {
        return ("playlistPost");
    }

    public String uploadFile(String token) {
        try {
            url = new URL("http://10.0.3.2:3001/api/file");

            urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setDoInput(true);
            urlConnection.setDoOutput(true);
            urlConnection.setRequestProperty("Content-Type", "application/json");
            // urlConnection.setRequestProperty("Accept", "application/json");
            urlConnection.setRequestMethod("POST");


            // creation des paramètres
            JSONObject login = new JSONObject();

            login.put("token", token);
;


            // ajout des paramètres
            OutputStreamWriter wr = new OutputStreamWriter(urlConnection.getOutputStream());


            wr.write(login.toString());
            wr.flush();
            try {
                stringBuilder = new StringBuilder();
                int result = urlConnection.getResponseCode();
                if (result == HttpURLConnection.HTTP_OK) {
                    BufferedReader br = new BufferedReader(
                            new InputStreamReader(urlConnection.getInputStream(), "utf-8"));
                    String line = null;

                    while ((line = br.readLine()) != null) {
                        stringBuilder.append(line + "\n");
                    }

                    return (this.getStringFromJson(this.getStringFromJson(stringBuilder.toString(), "user"), "token"));
                } else {
                    return ("not okay");
                }
            } finally {
                urlConnection.disconnect();
            }
        } catch (Exception e) {
            return (e.toString());
        }
    }

    public String filePost(String section) {
        return ("to do");
    }

    public String getStringFromJson(String data, String key) {
        try {
            JSONObject object = (JSONObject) new JSONTokener(data).nextValue();
            String requestID = object.getString(key);
            return requestID;
        } catch (JSONException e) {
            return ("Error");
        }
    }

    public JSONArray getImageFromJson(String data, String key) {
        try {
            JSONObject object = (JSONObject) new JSONTokener(data).nextValue();
            JSONArray photo = object.getJSONArray(key);
            return (photo);
        } catch (JSONException e) {
            return null;
        }
    }

    public int getNumberFromJson(String data, String key) {
        try {
            JSONObject object = (JSONObject) new JSONTokener(data).nextValue();
            int number = object.getInt(key);
            return number;
        } catch (JSONException e) {
         return -1;
        }
    }
}
