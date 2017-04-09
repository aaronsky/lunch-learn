import * as React from 'react';
import { Component } from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
    style?: object;
}

interface State {
    baseStyle: Style
}

interface Style {
    base: {
        width: number;
        height: number;
        backgroundColor: string;
    }
}

const styles = StyleSheet.create({
    base: {
        width: 10,
        height: 125,
        backgroundColor: '#000000',
    },
});

export default class AtomPeg extends Component<Props, State> {
    render() {
        return (
            <View style={[styles.base, this.props.style]} />
        );
    }
}
