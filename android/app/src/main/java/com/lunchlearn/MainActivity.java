package com.lunchlearn;

import android.media.MediaPlayer;
import android.os.Bundle;
import android.os.PersistableBundle;
import android.support.annotation.Nullable;

import com.company.SoundPoolPlayer;
import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class MainActivity extends ReactActivity {

    private ReactContext reactContext;

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState, @Nullable PersistableBundle persistentState) {
        super.onCreate(savedInstanceState, persistentState);
    }

    public void setReactContext(ReactContext reactContext) {
        this.reactContext = reactContext;
    }

    @Override
    protected String getMainComponentName() {
        return "LunchLearn";
    }

    public void playSong(String songName) {
        int songResId;
        if (songName.equalsIgnoreCase("ding")) {
            songResId = R.raw.ding;
        } else if (songName.equalsIgnoreCase("tada")) {
            songResId = R.raw.tada;
        } else {
            return;
        }
        final SoundPoolPlayer player = SoundPoolPlayer.create(this.getApplicationContext(), songResId);
        player.setOnCompletionListener(new MediaPlayer.OnCompletionListener() {
            @Override
            public void onCompletion(MediaPlayer mp) {
                sendEvent(MainActivity.this.reactContext, "ended", null);
            }
        });
    }

    private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    }
}
