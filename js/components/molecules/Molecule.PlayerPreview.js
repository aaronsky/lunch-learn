import React, { Component } from 'react';
import { Animated, InteractionManager, StyleSheet, TouchableOpacity, View } from 'react-native';

import { AtomIcon, AtomText } from 'lunchlearn/js/components/atoms';
import { AudioPlayer } from 'lunchlearn/js/nativemodules';

export default class MoleculePlayerPreview extends Component {
    constructor(props) {
        super(props);
        this.songTimeSubscription = null;
        this.state = {
            time: '--:--'
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.songTimeSubscription = AudioPlayer.addEventListener('timechange', this.onSongTimeChange.bind(this));
        });
    }

    componentWillUnmount() {
        this.songTimeSubscription = null;
    }

    onPress() {

    }

    onSongTimeChange(newTime) {
        const time = newTime.time;
        this.setState({
            time
        });
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.onPress()}>
                <View style={styles.container}>
                    <View style={styles.infoContainer}>
                        <AtomText style={styles.text}>{this.props.song.title}</AtomText>
                        <AtomText style={styles.text}>{this.props.song.artist}</AtomText>
                    </View>
                    <View style={styles.timeContainer}>
                        <AtomText style={styles.text}>{this.state.time}/{this.props.song.totalTime}</AtomText>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#bababa'
    },
    infoContainer: {

    },
    timeContainer: {

    },
    text: {

    }
});