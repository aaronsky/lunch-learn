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

    renderRow(data) {
        const formattedData = {
            type: 'cutlery',
            title: data.products.reduce((accumulator, product, index) => {
                if (index === 0) {
                    return product.name_brand;
                }
                return `${accumulator}, ${product.name_brand}`;
            }, '')
        }
        return (
            <MoleculePlayerListItem key={formattedData.title} data={formattedData} />
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