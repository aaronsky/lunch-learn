import { NativeModules } from 'react-native';

export default class AudioPlayer {
    static getModule() {
        const module = NativeModules.AudioPlayer;
        return module;
    }

    static play(song) {
        if (typeof song === 'string') {
        
        } else if (typeof song === 'number') {

        }
        song = 'F.R.U.G.';
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