import React, { Component } from 'react';
import { NativeModules, StyleSheet, TouchableOpacity, View } from 'react-native';

import { AtomIcon, AtomText, AtomPlayerButton } from 'lunchlearn/js/components/atoms';

export default class MoleculePlayerListItem extends Component {
    constructor(props) {
        super(props);
    }

    onPress() {
        console.log('press the row');
    }

    render() {
        const { data } = this.props;

        return (
            <TouchableOpacity onPress={() => this.onPress()}>
                <View style={styles.container}>
                    <AtomIcon name={data.type} style={styles.icon} />
                    <AtomText style={styles.text}>{data.title}</AtomText>
                    <AtomPlayerButton onPress={() => this.onPress()} style={styles.playerButton} />
                </View>
            </TouchableOpacity>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 100,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ddd'
    },
    icon: {
        margin: 25
    },
    text: {
        
    },
    playerButton: {
        alignSelf: 'flex-end',
        margin: 25
    }
})