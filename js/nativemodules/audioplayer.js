import { NativeModules } from 'react-native';
import { EventEmitter } from './index.js';

export default class AudioPlayer {
    static getModule() {
        const module = NativeModules.AudioPlayer;
        return module;
    }

    static play(song) {
        const songs = this.getModule().songs;
        if (typeof song === 'string' && songs.indexOf(song) === -1) {
            return;
        } else if (typeof song === 'number') {
            song = songs[song % songs.length];
        }
        this.getModule().play(song);
    }

    static playRandom() {
        const songs = this.getModule().songs;
        const song = songs[Math.floor(Math.random() * songs.length)];
        AudioPlayer.play(song)
    }

    static pause() {
        this.getModule().pause();
    }

    static stop() {
        this.getModule().stop();
    }

    /** async */
    static getCurrentSong() {
        return this.getModule().getCurrentSong();
    }

    static addEventListener(event, handler) {
        if (EventEmitter.isValidEvent(event)) {
            return EventEmitter.addListener(event, handler);
        }
        return null;
    }
}