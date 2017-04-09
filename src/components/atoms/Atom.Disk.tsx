import * as React from 'react';
import { Component } from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
    size: number;
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

function buildStyle(size: number): Style {
    const width = (size ** 3) + 30;
    const height = 20;
    const red = (size * 16) + 16;
    const green = (size * 32) + 64;
    const blue = (size * 24) + 32;
    const backgroundColor = `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
    return StyleSheet.create({
        base: { width, height, backgroundColor }
    });
}

export default class AtomDisk extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            baseStyle: buildStyle(this.props.size)
        };
    }

    componentWillReceiveProps(newProps: Props) {
        this.setState({
            baseStyle: buildStyle(newProps.size)
        });
    }

    render() {
        return (
            <View style={[this.state.baseStyle.base, this.props.style]} />
        );
    }
}
