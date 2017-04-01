import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { AtomIcon } from 'lunchlearn/js/components/atoms';

export default class AtomPlayerButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false
        };
    }

    onPress() {
        this.setState({
            isPlaying: !this.state.isPlaying
        });
    }

    render() {
        return (
            <TouchableOpacity onPress={this.onPress.bind(this)}>
                <AtomIcon
                    name={this.state.isPlaying ? 'pause' : 'play'}
                    style={[styles.base, this.state.isPlaying ? styles.playing : null, this.props.style]} />
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