import React, { Component } from 'react';
import { InteractionManager, View } from 'react-native';

import { FDAService } from 'lunchlearn/js/utilities/services';
import { OrganismListView } from 'lunchlearn/js/components/organisms';

export default class PageHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(this.runAfterInteractions.bind(this));
    }

    componentWillUnmount() {

    }

    async runAfterInteractions() {
        const { results } = await FDAService.foods.events.get({ limit: 40 });
        this.setState({ data: results });
    }

    render() {
        return (
            <View>
                <OrganismListView data={this.state.data} />
            </View>
        );
    }
}