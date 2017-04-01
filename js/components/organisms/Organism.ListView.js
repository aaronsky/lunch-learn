import React, { Component } from 'react';
import { ActivityIndicator, ListView, StyleSheet, View } from 'react-native';

import { MoleculePlayerListItem } from 'lunchlearn/js/components/molecules';

export default class OrganismListView extends Component {
    static defaultProps = {
        data: [],
        onEndReached: () => {}
    }

    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: this.rowHasChanged.bind(this)
        });
        this.state = {
            dataSource: dataSource.cloneWithRows(this.props.data)
        };
    }

    componentWillReceiveProps(newProps) {
        if (newProps.data && newProps.data.length) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(newProps.data)
            })
        }
    }

    renderRow(data, index) {
        const props = {
            key: index,
            index,
            data
        };
        return (
            <MoleculePlayerListItem {...props} />
        );
    }

    rowHasChanged(row, newRow) {
        return row !== newRow;
    }

    maybeRenderFooter() {
        if (this.props.loading) {
            return (
                <View style={styles.loading}>
                <ActivityIndicator />
                </View>
            );
        }
        return null;
    }

    onEndReached() {
        if (this.props.onEndReached && typeof this.props.onEndReached === 'function') {
            this.props.onEndReached.call();
        }
    }

    render() {
        const props = {
            dataSource: this.state.dataSource,
            renderRow: this.renderRow.bind(this),
            enableEmptySections: true,
            renderFooter: this.maybeRenderFooter.bind(this),
            onEndReached: this.onEndReached.bind(this),
            onEndReachedThreshold: 10,
            scrollEventThrottle: 150
        };
        return (
            <ListView {...props} />
        );
    }
}

let styles = StyleSheet.create({
    loading: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25
    }
});