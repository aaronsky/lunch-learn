import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

function buildStyle(size) {
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

export default class AtomDisk extends Component {
    static propTypes = {
        size: React.PropTypes.number.isRequired,
        style: View.propTypes.style
    };

    static defaultProps = {
        style: null
    };

    constructor(props) {
        super(props);

        this.state = {
            baseStyle: buildStyle(this.props.size)
        };
    }

    componentWillReceiveProps(newProps) {
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
