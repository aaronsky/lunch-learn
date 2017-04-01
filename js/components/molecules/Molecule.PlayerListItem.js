import React, { Component } from 'react';
import { Animated, NativeModules, Share, StyleSheet, TouchableOpacity, View } from 'react-native';

import { AtomIcon, AtomText, AtomPlayerButton } from 'lunchlearn/js/components/atoms';

const BASE_ROW_HEIGHT = 75;
const EXPANDED_ROW_HEIGHT = 150;

export default class MoleculePlayerListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedView: false,
            expandedValue: new Animated.Value(BASE_ROW_HEIGHT)
        };
    }

    onPress() {
        const toValue = this.state.expandedView ? BASE_ROW_HEIGHT : EXPANDED_ROW_HEIGHT;
        this.state.expandedValue.setValue(this.state.expandedView ? EXPANDED_ROW_HEIGHT : BASE_ROW_HEIGHT);
        this.setState({
            expandedView: !this.state.expandedView
        });
        Animated.spring(this.state.expandedValue, {
            toValue,
            friction: 5
        }).start((event) => {

        });
    }

    onLongPress(data) {
        Share.share({
            message: data.name,
            url: data.nasa_jpl_url
        });
    }

    getDangerLevelStyle(data) {
        return null;
    }

    maybeRenderWarning(data) {
        if (data.is_potentially_hazardous_asteroid) {
            return (
                <AtomIcon name='exclamation-triangle' style={styles.warningIcon} />
            );
        }
        return null;
    }

    maybeRenderCompactView(data) {
        const name = data.name;
        const { meters } = data.estimated_diameter;
        const min = +meters.estimated_diameter_min.toFixed(2);
        const max = +meters.estimated_diameter_max.toFixed(2);

        return (
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <AtomIcon name='globe' style={[styles.safetyIcon, this.getDangerLevelStyle(data)]} />
                    {this.maybeRenderWarning(data)}
                </View>
                <View style={styles.textContainer}>
                    <AtomText style={styles.title}>{data.name}</AtomText>
                    <AtomText style={styles.subtitle}>{min}m ~ {max}m</AtomText>
                </View>
                <AtomPlayerButton style={styles.playerButton} />
            </View>
        );
    }

    maybeRenderExpandedView(data) {
        const name = data.name;
        const { meters } = data.estimated_diameter;
        const min = +meters.estimated_diameter_min.toFixed(2);
        const max = +meters.estimated_diameter_max.toFixed(2);

        return (
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <AtomIcon name='globe' style={[styles.safetyIcon, this.getDangerLevelStyle(data)]} />
                    {this.maybeRenderWarning(data)}
                </View>
                <View style={styles.textContainer}>
                    <AtomText style={styles.title}>{data.name}</AtomText>
                    <AtomText style={styles.subtitle}>{min}m ~ {max}m</AtomText>
                </View>
                <AtomPlayerButton style={styles.playerButton} />
            </View>
        );
    }

    render() {
        const { data } = this.props;
        return (
            <TouchableOpacity onPress={() => this.onPress()} onLongPress={() => this.onLongPress(this.props.data)}>
                <Animated.View style={{ height: this.state.expandedValue }}>
                    {this.state.expandedView ? this.maybeRenderExpandedView(data) : this.maybeRenderCompactView(data)}
                </Animated.View>
            </TouchableOpacity>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: BASE_ROW_HEIGHT,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ddd'
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    safetyIcon: {
        margin: 15,
        fontSize: 24
    },
    warningIcon: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        color: '#800000',
        backgroundColor: 'transparent'
    },
    textContainer: {
        flexDirection: 'column',
    },
    title: {
        fontSize: 14,
    },
    subtitle: {
        fontSize: 12,
        fontStyle: 'italic',
        color: '#444'
    },
    playerButton: {
        alignSelf: 'flex-end',
        marginRight: 25
    }
});