import React, { Component } from 'react';
import { InteractionManager, View } from 'react-native';

import { NASAService } from 'lunchlearn/js/api';
import { OrganismListView } from 'lunchlearn/js/components/organisms';

class PageHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        this.props.app.actions.setLoading(true);
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
                const data = Object.keys(neoResponse).reduce((acc, date) => acc.concat(neoResponse[date]), this.state.data);
                this.setState({ data, prevUri, nextUri });
            }
        } catch (err) {
            console.error(err);
        }
        this.props.app.actions.setLoading(false);
    }

    onEndReached() {
        const { nextUri } = this.state;
        if (nextUri && !this.props.app.isLoading) {
            this.loadData(nextUri);
        }
    }

    render() {
        return (
            <View>
                <OrganismListView
                    kind='nasa'
                    app={this.props.app}
                    data={this.state.data}
                    onEndReached={this.onEndReached.bind(this)} />
            </View>
        );
    }
}

export const id = 'home';
export const title = 'Home';
export const LayoutComponent = PageHome;
export function mapStateToProps(state) {
	return {};
}