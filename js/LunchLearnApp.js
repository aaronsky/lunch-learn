import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class LunchLearnApp extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Welcome to React Native!</Text>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
});