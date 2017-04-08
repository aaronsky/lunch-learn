import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

export default class AtomDisk extends Component {
    static propTypes = {
        size: React.PropTypes.number,
        style: View.propTypes.style,
    };

    static defaultProps = {
        size: 1,
        style: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            baseStyle: this.buildStyle(this.props.size)
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            baseStyle: this.buildStyle(newProps.size)
        });
    }

    buildStyle(size) {
        return StyleSheet.create({
            base: {
                width: (size ** 3) + 30,
                height: 20,
                backgroundColor: `#${((size * 16) + 16).toString(16)}${((size * 32) + 64).toString(16)}${((size * 24) + 32).toString(16)}`
            }
        });
    }

    render() {
        return (
            <View style={[this.state.baseStyle.base, this.props.style]} />
        );
    }
}
