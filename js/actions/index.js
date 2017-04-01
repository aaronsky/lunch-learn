import { StatusBar } from 'react-native';

import * as types from './types';
import { AudioPlayer } from 'lunchlearn/js/nativemodules';

export function setPlaying(isPlaying, playingId) {
    isPlaying = !!isPlaying;
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