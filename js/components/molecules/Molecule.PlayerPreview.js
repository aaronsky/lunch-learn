import React, { Component } from 'react';
import { Animated, InteractionManager, StyleSheet, TouchableOpacity, View } from 'react-native';

import { AtomIcon, AtomText } from 'lunchlearn/js/components/atoms';
import { AudioPlayer, EventEmitter } from 'lunchlearn/js/nativemodules';

export default class MoleculePlayerPreview extends Component {
    constructor(props) {
        super(props);
        this.songTimeSubscription = null;
        this.songEndSubscription = null;
        this.state = {
            time: '--:--',
            song: {
                title: '',
                artist: '',
                totalTime: '--:--'
            }
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            const timeChangeEventName = EventEmitter.getEvent('timechange');
            this.songTimeSubscription = EventEmitter.addListener(timeChangeEventName, this.onSongTimeChange.bind(this));
            const songEndEventName = EventEmitter.getEvent('ended');
            this.songEndSubscription = EventEmitter.addListener(songEndEventName, this.onSongEnd.bind(this));
        });
    }

    componentWillUnmount() {
        EventEmitter.removeSubscription(this.songTimeSubscription);
        this.songTimeSubscription = null;
        EventEmitter.removeSubscription(this.songEndSubscription);
        this.songEndSubscription = null;
    }

    onPress() {

    }

    onSongTimeChange(newTime) {
        const time = newTime.time;
        this.setState({
            time
        });
    }

    onSongEnd() {
        this.props.app.actions.setPlaying(false, null, this.props.app);
    }

    render() {
        const { song } = this.state;
        
        return (
            <TouchableOpacity onPress={() => this.onPress()}>
                <View style={styles.container}>
                    <AtomText style={styles.text}>{this.state.time}</AtomText>
                    <View style={styles.infoContainer}>
                        <AtomText style={styles.text}>{song.title}</AtomText>
                        <AtomText style={styles.text}>{song.artist}</AtomText>
                    </View>
                    <AtomText style={styles.text}>{song.totalTime}</AtomText>
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
        flexDirection: 'column'
    },
    text: {

    }
});