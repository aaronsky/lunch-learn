import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class AtomIcon extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const props = {
            name: this.props.name,
            size: 12,
            color: '#00f',
            style: [styles.base, this.props.style]
        };
        return (
            <Icon {...props} />
        );
    }
}

const styles = StyleSheet.create({
    base: {
        fontSize: 12
    }
})