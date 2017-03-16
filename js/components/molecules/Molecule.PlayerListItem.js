import React, { Component } from 'react';
import { TouchableHighlight, View } from 'react-native';

import { AtomIcon, AtomText, AtomPlayerButton } from 'lunchlearn/js/components/atoms';

export default class MoleculePlayerListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { data } = this.props;

        return (
            <TouchableHighlight>
                <View>
                    <AtomIcon name={data.type} />
                    <AtomText>{data.title}</AtomText>
                    <AtomPlayerButton url={data.url} />
                </View>
            </TouchableHighlight>
        );
    }
}