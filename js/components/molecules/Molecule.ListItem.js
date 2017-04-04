import React, { Component } from 'react';
import { Animated, Share, StyleSheet, TouchableOpacity, View } from 'react-native';

import { AtomIcon, AtomText } from 'lunchlearn/js/components/atoms';

export default class MoleculeListItem extends Component {
    static defaultProps = {
        data: {},
        index: -1,
    }

    constructor(props) {
        super(props);
        this.state = {

        };
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

    formattedTextData(data) {
        return {
            id: data.neo_reference_id,
            name: data.name,
            min: (+data.estimated_diameter.meters.estimated_diameter_min.toFixed(2)).toLocaleString(),
            max: (+data.estimated_diameter.meters.estimated_diameter_max.toFixed(2)).toLocaleString(),
            velocity: (+(+data.close_approach_data[0].relative_velocity.miles_per_hour).toFixed(2)).toLocaleString()
        };
    }

    maybeRenderView(data) {
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
                    <AtomText style={styles.subtitle}>Relative velocity is {formattedData.velocity} mi/h</AtomText>
                    <AtomText style={styles.subtitle}>ID: {formattedData.id}</AtomText>
                </View>
            </View>
        );
    }

    render() {
        const { data } = this.props;
        return (
            <TouchableOpacity onPress={() => this.props.onPress(this.props.data)} onLongPress={() => this.onLongPress(this.props.data)}>
                {this.maybeRenderView(data)}
            </TouchableOpacity>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 80
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginHorizontal: 10,
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