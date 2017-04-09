import { NativeModules } from 'react-native';

export default class AudioPlayer {
    static getModule() {
        const module = NativeModules.AudioPlayer;
        return module;
    }

    static play(song: string | number) {
        const songs = this.getModule().songs;
        let songName;
        if (typeof song === 'string' && songs.indexOf(song) === -1) {
            return;
        } else if (typeof song === 'number') {
            songName = songs[song % songs.length];
        } else {
            songName = song;
        }
        this.getModule().play(songName);
    }
}
