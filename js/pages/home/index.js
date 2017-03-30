import React, { Component } from 'react';
import { InteractionManager, View } from 'react-native';

import { NASAService } from 'lunchlearn/js/utilities/services';
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
        try {
            const response = await NASAService.neo.feed.get();
            const neoResponse = (response && response.near_earth_objects) || {};
            const data = Object.keys(neoResponse).reduce((acc, date) => { return acc.concat(neoResponse[date]) }, []);
            this.setState({ data });
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        return (
            <View>
                <OrganismListView kind='nasa' data={this.state.data} />
            </View>
        );
    }
}