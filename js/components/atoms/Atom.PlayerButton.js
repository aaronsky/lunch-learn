import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { AtomIcon } from './index';

export default class AtomPlayerButton extends Component {
    constructor(props) {
        super(props);
    }

    onPress() {
        this.props.app.actions.setPlaying(!this.props.app.isPlaying, this.props.id);
    }

    render() {
        const { isPlaying } = this.props.app;
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