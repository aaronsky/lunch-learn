import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class AtomText extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Text style={[styles.base, this.props.style]}>
                {this.props.children}
            </Text>
        );
    }
}

const styles = StyleSheet.create({
    base: {
        fontSize: 12
    }
})