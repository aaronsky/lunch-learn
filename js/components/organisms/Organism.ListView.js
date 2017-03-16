import React, { Component } from 'react';
import { ListView } from 'react-native';

import { MoleculePlayerListItem } from 'lunchlearn/js/components/molecules';

export default class OrganismListView extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: this.rowHasChanged.bind(this)
        });
        this.state = {
            dataSource: dataSource.cloneWithRows(['row 1', 'row 2'])
        };
    }

    renderRow(data) {
        const formattedData = {
            type: 'sound',
            title: data,
            url: 'http://google.com'
        }
        return (
            <MoleculePlayerListItem data={formattedData} />
        );
    }

    rowHasChanged(row, newRow) {
        return row !== newRow;
    }

    render() {
        const props = {
            dataSource: this.state.dataSource,
            renderRow: this.renderRow.bind(this)
        };
        return (
            <ListView {...props} />
        );
    }
}