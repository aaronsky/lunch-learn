import { StatusBar } from 'react-native';

import * as types from './types';
import { AudioPlayer } from 'lunchlearn/js/nativemodules';

export function setPlaying(isPlaying, playingId, state = {}) {
    isPlaying = !!isPlaying;
    playingId = playingId || -1;
    
    if (isPlaying) {
        if (state.isPlaying) {
            if (playingId === state.playingId) {
                AudioPlayer.pause();
            } else {
                AudioPlayer.stop();
                AudioPlayer.play(playingId);
            }
        } else {
            AudioPlayer.play(playingId);
        }
    } else {
        if (state.isPlaying) {
            AudioPlayer.pause();
        }
    }
    return {
        type: types.IS_PLAYING,
        isPlaying,
        playingId
    };
}

export function setLoading(isLoading) {
    isLoading = !!isLoading;
    StatusBar.setNetworkActivityIndicatorVisible(isLoading);
    return {
        type: types.IS_LOADING,
        isLoading
    };
}