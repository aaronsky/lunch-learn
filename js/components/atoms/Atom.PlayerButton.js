import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

export default class AtomPlayerButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[styles.base, this.props.style]}></View>
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