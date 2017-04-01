import React, { Component } from 'react';
import { Navigator, StyleSheet, View } from 'react-native';

import { AtomText } from 'lunchlearn/js/components/atoms';
import * as pages from 'lunchlearn/js/pages';
import connectComponent from 'lunchlearn/js/utilities/connectComponent';

export class Navigation extends Component {
    constructor(props) {
        super(props);
        this.initialRoute = {
            id: pages.PageHome.id,
            title: pages.PageHome.title,
            component: connectComponent(pages.PageHome)
        };
    }

    get navigationBar() {
        const leftButton = (route, navigator, index, navState) => {
            return null;
        };
        const rightButton = (route, navigator, index, navState) => {
            return null;
        };
        const title = (route, navigator, index, navState) => {
            return (
                <AtomText style={styles.navigationTitle}>{route.title || 'WHAT'}</AtomText>
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
        const renderedScene = React.createElement(route.component, {
            ...route.props,
            app: this.props,
            route: {
                name: route.name,
                id: route.id,
                index: route.index
            }
        });
        if (route.component) {
            return (
                <View style={styles.container}>
                    {renderedScene}
                </View>
            );
        }
        return null;
    }

    render() {
        return (
            <Navigator
                initialRoute={this.initialRoute}
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

export const LayoutComponent = Navigation;
export function mapStateToProps(state) {
    return {
        ...state.app
    };
}
