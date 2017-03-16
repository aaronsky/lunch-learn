import React, { Component } from 'react';
import { View } from 'react-native';

import { OrganismListView } from 'lunchlearn/js/components/organisms';

export default class PageHome extends Component {
    render() {
        return (
            <View>
                <OrganismListView />
            </View>
        );
    }
}