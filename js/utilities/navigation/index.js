import React, { Component } from 'react';
import { Navigator, StyleSheet, View } from 'react-native';

import { AtomText } from 'lunchlearn/js/components/atoms';
import PageHome from 'lunchlearn/js/pages/home';

export default class Navigation extends Component {
    get navigationBar() {
        const leftButton = (route, navigator, index, navState) => {
            return null;
        };
        const rightButton = (route, navigator, index, navState) => {
            return null;
        };
        const title = (route, navigator, index, navState) => {
            return (
                <AtomText style={styles.navigationTitle}>{route.title}</AtomText>
            );
        };
        const props = {
            routeMapper: {
                LeftButton: leftButton,
                RightButton: rightButton,
                Title: title
            },
            style: styles.navigationBar
        };
        return (
            <Navigator.NavigationBar {...props} />
        );
    }

    renderScene(route, navigator) {
        if (route.id === 'home') {
            return (
                <View style={styles.container}>
                    <PageHome />
                </View>
            );
        }
        return null;
    }

    render() {
        return (
            <Navigator
                initialRoute={this.props.initialRoute}
                renderScene={this.renderScene.bind(this)}
                navigationBar={this.navigationBar}
            />
        );
    }
}

let styles = StyleSheet.create({
    navigationBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#c0c0c0'
    },
    navigationTitle: {
        marginTop: 10,
        color: 'white',
        fontSize: 16
    },
    container: {
        flex: 1,
        paddingTop: 64
    }
});