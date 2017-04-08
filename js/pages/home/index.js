import React, { Component } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';

import { OrganismHanoi } from 'lunchlearn/js/components/organisms';

export default class PageHome extends Component {
    constructor(props) {
        super(props);

        this.hanoi = null;
        this.onPress = this.onPress.bind(this);
    }

    onPress() {
        console.log('press');
        this.hanoi.startHanoi();
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.onPress}>
                <View>
                    <OrganismHanoi ref={(ref) => { this.hanoi = ref; }} />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
