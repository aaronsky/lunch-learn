import * as React from 'react';
import { Component } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { AtomDisk } from '../atoms';
import { MoleculePeg } from '../molecules';
import { AudioPlayer, EventEmitter } from '../../nativemodules';

interface Disks {
    [peg: string]: JSX.Element[];
    a?: JSX.Element[];
    b?: JSX.Element[];
    c?: JSX.Element[];
}

interface State {
    disks?: Disks;
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
function createDisks(): Disks {
    return {
        a: [...INITIAL_DISK_LIST],
        b: [],
        c: []
    };
}

export default class OrganismHanoi extends Component<{}, State> {
    aPeg: MoleculePeg = null;
    bPeg: MoleculePeg = null;
    cPeg: MoleculePeg = null;

    constructor(props: any) {
        super(props);
        this.state = {
            disks: createDisks()
        };
    }

    setStateAsync(newState: State): Promise<void> {
        return new Promise<void>(resolve => this.setState(newState, () => resolve()));
    }

    async startHanoi(): Promise<void> {
        await this.resetHanoi();
        await this.hanoi(this.state.disks.a.length, 'a', 'c', 'b');
        AudioPlayer.play('tada');
    }

    async hanoi(diskNum: number, fromPeg: string, toPeg: string, bufferPeg: string): Promise<void> {
        if (diskNum === 0) {
            return;
        }
        await this.hanoi(diskNum - 1, fromPeg, bufferPeg, toPeg);
        await this.moveDisk(fromPeg, toPeg);
        await this.hanoi(diskNum - 1, bufferPeg, toPeg, fromPeg);
    }

    async moveDisk(fromPeg: string, toPeg: string): Promise<void> {
        const fromList = [...this.state.disks[fromPeg]];
        const toList = [...this.state.disks[toPeg]];
        const disk = fromList.pop();
        toList.push(disk);
        await this.setStateAsync({
            disks: {
                ...this.state.disks,
                [fromPeg]: fromList,
                [toPeg]: toList
            }
        });
        return new Promise<void>(resolve => {
            let songEndSubscription = EventEmitter.addListener(EventEmitter.getEvent('ended'), () => {
                EventEmitter.removeSubscription(songEndSubscription);
                songEndSubscription = null;
                resolve();
            });
            AudioPlayer.play('ding');
        });
    }

    resetHanoi() {
        return this.setStateAsync({
            disks: createDisks()
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <MoleculePeg id="A" ref={(ref: MoleculePeg) => { this.aPeg = ref; }}>
                    {this.state.disks.a}
                </MoleculePeg>
                <MoleculePeg id="B" ref={(ref: MoleculePeg) => { this.bPeg = ref; }}>
                    {this.state.disks.b}
                </MoleculePeg>
                <MoleculePeg id="C" ref={(ref: MoleculePeg) => { this.cPeg = ref; }}>
                    {this.state.disks.c}
                </MoleculePeg>
            </View>
        );
    }
}
