import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { AtomDisk } from 'lunchlearn/js/components/atoms';
import { MoleculePeg } from 'lunchlearn/js/components/molecules';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});

const INITIAL_DISK_LIST = [
    <AtomDisk size={1} key="disk-1" />,
    <AtomDisk size={2} key="disk-2" />,
    <AtomDisk size={3} key="disk-3" />,
    <AtomDisk size={4} key="disk-4" />,
    <AtomDisk size={5} key="disk-5" />
];
function getInitialState() {
    return {
        a: [...INITIAL_DISK_LIST],
        b: [],
        c: []
    };
}

export default class OrganismHanoi extends Component {
    constructor(props) {
        super(props);
        this.state = getInitialState();
        this.aPeg = null;
        this.bPeg = null;
        this.cPeg = null;
    }

    setStateAsync(newState) {
        return new Promise(resolve => this.setState(newState, () => resolve()));
    }

    async startHanoi() {
        console.log(this.aPeg, this.bPeg, this.cPeg);
        await this.resetHanoi();
        await this.hanoi(this.state.a.length, 'a', 'c', 'b');
        console.log(this.state);
    }

    async hanoi(diskNum, fromPeg, toPeg, bufferPeg) {
        if (diskNum === 0) {
            return;
        }
        await this.hanoi(diskNum - 1, fromPeg, bufferPeg, toPeg);
        console.log('Move disk', diskNum, 'from peg', fromPeg, 'to peg', toPeg);
        await this.moveDisk(fromPeg, toPeg);
        await this.hanoi(diskNum - 1, bufferPeg, toPeg, fromPeg);
    }

    async moveDisk(fromPeg, toPeg) {
        const fromList = [...this.state[fromPeg]];
        const toList = [...this.state[toPeg]];
        const disk = fromList.pop();
        toList.push(disk);
        await this.setStateAsync({
            [fromPeg]: fromList,
            [toPeg]: toList
        });
    }

    resetHanoi() {
        return this.setStateAsync(getInitialState());
    }

    render() {
        return (
            <View style={styles.container}>
                <MoleculePeg id="A" ref={(ref) => { this.aPeg = ref; }}>
                    {this.state.a}
                </MoleculePeg>
                <MoleculePeg id="B" ref={(ref) => { this.bPeg = ref; }}>
                    {this.state.b}
                </MoleculePeg>
                <MoleculePeg id="C" ref={(ref) => { this.cPeg = ref; }}>
                    {this.state.c}
                </MoleculePeg>
            </View>
        );
    }
}
