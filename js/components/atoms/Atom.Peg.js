import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
    base: {
        width: 20,
        height: 200,
        backgroundColor: '#000000',
    },
});

export default class AtomPeg extends Component {
    static propTypes = {
        style: View.propTypes.style
    };

    static defaultProps = {
        style: null
    };

    render() {
        return (
            <View style={[styles.base, this.props.style]} />
        );
    }
}
