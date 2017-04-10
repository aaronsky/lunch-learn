package com.lunchlearn.nativemodules;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.lunchlearn.MainActivity;

/**
 * Created by asky on 4/9/17.
 */

public class AudioPlayer extends ReactContextBaseJavaModule {
    private MainActivity mainActivity;
    private ReactContext reactContext;

    public AudioPlayer(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "AudioPlayer";
    }

    @ReactMethod
    public void play(String songName) {
        this.mainActivity = (MainActivity)getCurrentActivity();
        if (this.mainActivity != null) {
            this.mainActivity.setReactContext(this.reactContext);
            this.mainActivity.playSong(songName);
        }
    }
}
