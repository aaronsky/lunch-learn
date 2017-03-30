import React, { Component } from 'react';
import { ListView } from 'react-native';

import { MoleculePlayerListItem } from 'lunchlearn/js/components/molecules';

export default class OrganismListView extends Component {
    static defaultProps = {
        data: []
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
            data: {
                kind: this.props.kind,
                title: JSON.stringify(data),
                subtitle: ''
            }
        };
        return (
            <MoleculePlayerListItem {...props} />
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