import * as React from 'react';
import { Component } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { AtomDisk } from '../atoms';
import { MoleculePeg } from '../molecules';
import { AudioPlayer } from '../../nativemodules';

interface State {
    [peg: string]: JSX.Element[];
    a?: JSX.Element[];
    b?: JSX.Element[];
    c?: JSX.Element[];
}

interface Style {
    container: ViewStyle
}

const styles: Style = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around'
    } as ViewStyle
});

const INITIAL_DISK_LIST = [
    <AtomDisk size={1} key="disk-1" />,
    <AtomDisk size={2} key="disk-2" />,
    <AtomDisk size={3} key="disk-3" />,
    <AtomDisk size={4} key="disk-4" />,
    <AtomDisk size={5} key="disk-5" />
];
function getInitialState(): State {
    return {
        a: [...INITIAL_DISK_LIST],
        b: [],
        c: []
    };
}

export default class OrganismHanoi extends Component<{}, State> {
    aPeg: MoleculePeg;
    bPeg: MoleculePeg;
    cPeg: MoleculePeg;

    constructor(props: any) {
        super(props);
        this.state = getInitialState();
        this.aPeg = null;
        this.bPeg = null;
        this.cPeg = null;
    }

    setStateAsync(newState: State) {
        return new Promise(resolve => this.setState(newState, () => resolve()));
    }

    async startHanoi() {
        await this.resetHanoi();
        await this.hanoi(this.state.a.length, 'a', 'c', 'b');
        AudioPlayer.play('tada');
    }

    async hanoi(diskNum: number, fromPeg: string, toPeg: string, bufferPeg: string) {
        if (diskNum === 0) {
            return;
        }
        await this.hanoi(diskNum - 1, fromPeg, bufferPeg, toPeg);
        await this.moveDisk(fromPeg, toPeg);
        await this.hanoi(diskNum - 1, bufferPeg, toPeg, fromPeg);
    }

    async moveDisk(fromPeg: string, toPeg: string) {
        const fromList = [...this.state[fromPeg]];
        const toList = [...this.state[toPeg]];
        const disk = fromList.pop();
        toList.push(disk);
        await this.setStateAsync({
            [fromPeg]: fromList,
            [toPeg]: toList
        });
        return new Promise(resolve => setTimeout(() => {
            AudioPlayer.play('ding');
            resolve();
        }, 1000));
    }

    resetHanoi() {
        return this.setStateAsync(getInitialState());
    }

    render() {
        return (
            <View style={styles.container}>
                <MoleculePeg id="A" ref={(ref: MoleculePeg) => { this.aPeg = ref; }}>
                    {this.state.a}
                </MoleculePeg>
                <MoleculePeg id="B" ref={(ref: MoleculePeg) => { this.bPeg = ref; }}>
                    {this.state.b}
                </MoleculePeg>
                <MoleculePeg id="C" ref={(ref: MoleculePeg) => { this.cPeg = ref; }}>
                    {this.state.c}
                </MoleculePeg>
            </View>
        );
    }
}
