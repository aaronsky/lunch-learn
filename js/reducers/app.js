import * as types from 'lunchlearn/js/actions/types';
import { AudioPlayer } from 'lunchlearn/js/nativemodules';

const initialState = {
    isPlaying: false,
    playingId: -1,
    isLoading: false,
};

function isPlaying(state, action) {
    return {
        ...state,
        isPlaying: action.isPlaying,
        playingId: action.playingId
    };
}

function isLoading(state, action) {
    return {
        ...state,
        isLoading: action.isLoading
    };
}

export default function app(state = initialState, action = {}) {
    switch (action.type) {
        case types.IS_PLAYING:
            return isPlaying(state, action);
        case types.IS_LOADING:
            return isLoading(state, action);
        default:
            return state;
    };
}