import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { AtomIcon } from 'lunchlearn/js/components/atoms';

export default class AtomPlayerButton extends Component {
    static defaultProps = {
        onPress: () => {}
    }
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.props.onPress()}>
                <AtomIcon name="play" style={[styles.base, this.props.style]} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    base: {
        width: 20,
        height: 20,
        backgroundColor: '#00f'
    }
})