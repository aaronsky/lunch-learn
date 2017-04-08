import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AtomPeg } from 'lunchlearn/js/components/atoms';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    disks: {
        position: 'absolute',
        bottom: 0,
        alignItems: 'center'
    }
});

export default class MoleculePeg extends Component {
    static propTypes = {
        id: React.PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        return (
            <View style={styles.container}>
                <Text>{this.props.id}</Text>
                <AtomPeg />
                <View style={styles.disks}>
                {this.props.children}
                </View>
            </View>
        );
    }
}
