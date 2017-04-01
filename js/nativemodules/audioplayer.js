import { NativeModules } from 'react-native';

export default class AudioPlayer {
    static getModule() {
        const module = NativeModules.AudioPlayer;
        return module;
    }

    static play(song) {
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
}