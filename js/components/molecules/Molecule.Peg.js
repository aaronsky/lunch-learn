import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AtomPeg } from 'lunchlearn/js/components/atoms';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    label: {
        fontSize: 16,
        margin: 10
    },
    disks: {
        position: 'absolute',
        bottom: 0,
        alignItems: 'center'
    }
});

export default class MoleculePeg extends Component {
    static propTypes = {
        id: React.PropTypes.string.isRequired,
        children: React.PropTypes.oneOfType([
            React.PropTypes.arrayOf(React.PropTypes.node),
            React.PropTypes.node
        ])
    };

    static defaultProps = {
        children: null
    };

    componentWillReceiveProps(newProps) {

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>
                    {this.props.id}
                </Text>
                <AtomPeg />
                <View style={styles.disks}>
                    {this.props.children}
                </View>
            </View>
        );
    }
}
