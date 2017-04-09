import * as React from 'react';
import { Component } from 'react';
import { FlexStyle, TouchableWithoutFeedback, StyleSheet, View, ViewStyle } from 'react-native';

import { OrganismHanoi } from '../../components/organisms';

interface Style {
    container: ViewStyle,
    floor: ViewStyle
}

const styles: Style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end'
    } as ViewStyle,
    floor: {
        height: 158,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#000000'
    } as ViewStyle
});

export default class PageHome extends Component<{}, {}> {
    hanoi: OrganismHanoi;
    
    constructor(props: any) {
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
