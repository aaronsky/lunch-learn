import React, { Component } from 'react';
import { InteractionManager, View } from 'react-native';

import { NASAService } from 'lunchlearn/js/utilities/services';
import { OrganismListView } from 'lunchlearn/js/components/organisms';

export default class PageHome extends Component {
    static get id() {
        return 'home';
    }

    static get title() {
        return 'Home';
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            prevUri: null,
            nextUri: null
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(this.loadData.bind(this));
    }

    componentWillUnmount() {

    }

    async loadData(uri) {
        this.setState({
            loading: true
        });
        try {
            let response;
            if (uri) {
                response = await NASAService.arbitrary(uri);
            } else {
                response = await NASAService.neo.feed.get();
            }
            if (response) {
                const prevUri = response.links.prev;
                const nextUri = response.links.next;
                const neoResponse = response.near_earth_objects;
                const data = Object.keys(neoResponse).reduce((acc, date) => { return acc.concat(neoResponse[date]) }, []);
                this.setState({ data, prevUri, nextUri });
            }
        } catch (err) {
            console.error(err);
        }
        this.setState({
            loading: false
        });
    }

    onEndReached() {
        const { nextUri } = this.state;
        if (nextUri) {
            this.loadData(nextUri);
        }
    }

    render() {
        return (
            <View>
                <OrganismListView
                    kind='nasa'
                    data={this.state.data}
                    onEndReached={this.onEndReached.bind(this)}
                    loading={this.state.loading} />
            </View>
        );
    }
}