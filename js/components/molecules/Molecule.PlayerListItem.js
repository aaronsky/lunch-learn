import React, { Component } from 'react';
import { Animated, Share, StyleSheet, TouchableOpacity, View } from 'react-native';

import { AtomIcon, AtomText, AtomPlayerButton } from 'lunchlearn/js/components/atoms';

const BASE_ROW_HEIGHT = 75;
const EXPANDED_ROW_HEIGHT = 150;

export default class MoleculePlayerListItem extends Component {
    static defaultProps = {
        data: {},
        index: -1,
    }

    constructor(props) {
        super(props);
        this.state = {
            expandedView: false,
            expandedValue: new Animated.Value(BASE_ROW_HEIGHT)
        };
    }

    onPress() {
        const fromValue = this.state.expandedView ? EXPANDED_ROW_HEIGHT : BASE_ROW_HEIGHT;
        const toValue = this.state.expandedView ? BASE_ROW_HEIGHT : EXPANDED_ROW_HEIGHT;
        this.state.expandedValue.setValue(fromValue);
        this.setState({
            expandedView: !this.state.expandedView
        });
        Animated.spring(this.state.expandedValue, {
            toValue,
            friction: 5
        }).start();
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

    renderPlayerButton() {
        const { app, data } = this.props;
        const id = data.neo_reference_id;
        const props = {
            style: styles.playerButton,
            app,
            id
        }
        return (
            <AtomPlayerButton {...props} />
        );
    }

    formattedTextData(data) {
        return {
            id: data.neo_reference_id,
            name: data.name,
            min: (+data.estimated_diameter.meters.estimated_diameter_min.toFixed(2)).toLocaleString(),
            max: (+data.estimated_diameter.meters.estimated_diameter_max.toFixed(2)).toLocaleString(),
            velocity: (+(+data.close_approach_data[0].relative_velocity.miles_per_hour).toFixed(2)).toLocaleString()
        };
    }

    maybeRenderCompactView(data) {
        const formattedData = this.formattedTextData(data);

        return (
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <AtomIcon name='globe' style={[styles.safetyIcon, this.getDangerLevelStyle(data)]} />
                    {this.maybeRenderWarning(data)}
                </View>
                <View style={styles.textContainer}>
                    <AtomText style={styles.title}>{formattedData.name}</AtomText>
                    <AtomText style={styles.subtitle}>{formattedData.min}m ~ {formattedData.max}m in diameter</AtomText>
                </View>
                {this.renderPlayerButton()}
            </View>
        );
    }

    maybeRenderExpandedView(data) {
        const formattedData = this.formattedTextData(data);

        return (
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <AtomIcon name='globe' style={[styles.safetyIcon, this.getDangerLevelStyle(data)]} />
                    {this.maybeRenderWarning(data)}
                </View>
                <View style={styles.textContainer}>
                    <AtomText style={styles.title}>{formattedData.name}</AtomText>
                    <AtomText style={styles.subtitle}>{formattedData.min}m ~ {formattedData.max}m in diameter</AtomText>
                    <AtomText style={styles.subtitle}>{formattedData.velocity} mi/h</AtomText>
                    <AtomText style={styles.subtitle}>ID: {formattedData.id}</AtomText>
                </View>
                {this.renderPlayerButton()}
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