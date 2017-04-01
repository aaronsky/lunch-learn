import React, { Component } from 'react';
import { NativeModules, StyleSheet, TouchableOpacity, View } from 'react-native';

import { AtomIcon } from 'lunchlearn/js/components/atoms';

export default class AtomPlayerButton extends Component {
    constructor(props) {
        super(props);
    }

    onPress() {
        if (this.props.isPlaying) {
            NativeModules.AudioPlayer.pause();
        } else {
            NativeModules.AudioPlayer.play();
        }
        if (this.props.onPress && typeof this.props.onPress === 'function') {
            this.props.onPress(this.props.index);
        }
    }

    render() {
        const isPlaying = (this.props.isPlaying && this.props.playingIndex === this.props.index);
        return (
            <TouchableOpacity onPress={this.onPress.bind(this)}>
                <AtomIcon
                    name={isPlaying ? 'pause' : 'play'}
                    style={[styles.base, isPlaying ? styles.playing : null, this.props.style]} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    base: {
        fontSize: 18,
        color: '#008000'
    },
    playing: {
        color: '#00f'
    }
})