import React, { Component } from 'react';
import { TouchableWithoutFeedback, StyleSheet, View } from 'react-native';

import { OrganismHanoi } from 'lunchlearn/js/components/organisms';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    floor: {
        height: 158,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#000000'
    }
});

export default class PageHome extends Component {
    constructor(props) {
        super(props);

        this.hanoi = null;
        this.onPress = this.onPress.bind(this);
    }

    onPress() {
        this.hanoi.startHanoi();
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.onPress}>
                <View style={styles.container}>
                    <OrganismHanoi ref={(ref) => { this.hanoi = ref; }} />
                    <View style={styles.floor} />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
