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

export default class OrganismHanoi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            a: [5, 4, 3, 2, 1],
            b: [],
            c: []
        };
        this.createDisks = this.createDisks.bind(this);
    }

    setStateAsync(newState) {
        return new Promise(resolve => this.setState(newState, () => resolve()));
    }

    async startHanoi() {
        await this.resetHanoi();
        console.log('starting in 1 second');
        setTimeout(() => this.hanoi(this.state.a.length, 'a', 'c', 'b'), 1000);
    }

    async hanoi(diskNum, fromPeg, toPeg, bufferPeg) {
        if (diskNum === 0) {
            return;
        }
        this.hanoi(diskNum - 1, fromPeg, bufferPeg, toPeg);
        console.log('Move disk', diskNum, 'from peg', fromPeg, 'to peg', toPeg);
        await this.moveDisk(fromPeg, toPeg);
        this.hanoi(diskNum - 1, bufferPeg, toPeg, fromPeg);
    }

    moveDisk(fromPeg, toPeg) {
        const fromList = [...this.state[fromPeg]];
        const toList = [...this.state[toPeg]];
        toList.push(fromList.pop());
        return this.setStateAsync({
            [fromPeg]: fromList,
            [toPeg]: toList
        });
    }

    resetHanoi() {
        return this.setStateAsync({
            a: [5, 4, 3, 2, 1],
            b: [],
            c: []
        });
    }

    createDisks(disk, index) {
        return (
            <AtomDisk size={disk} key={`disk-${index}`} />
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <MoleculePeg id="A">
                    {this.state.a.reverse().map(this.createDisks)}
                </MoleculePeg>
                <MoleculePeg id="B">
                    {this.state.b.reverse().map(this.createDisks)}
                </MoleculePeg>
                <MoleculePeg id="C">
                    {this.state.c.reverse().map(this.createDisks)}
                </MoleculePeg>
            </View>
        );
    }
}
