import * as React from 'react';
import { Component } from 'react';
import { FlexStyle, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

import { AtomDisk, AtomPeg } from '../atoms';

interface Props {
    id: string;
    children?: AtomDisk | AtomDisk[];
}

interface Style {
    container: ViewStyle;
    label: TextStyle;
    disks: ViewStyle;
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    } as ViewStyle,
    label: {
        fontSize: 16,
        margin: 10
    } as TextStyle,
    disks: {
        position: 'absolute',
        bottom: 0,
        alignItems: 'center'
    } as ViewStyle
});

export default class MoleculePeg extends Component<Props, {}> {
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
