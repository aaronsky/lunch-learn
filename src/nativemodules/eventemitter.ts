import { EmitterSubscription, NativeEventEmitter, NativeModules } from 'react-native';

let emitter: NativeEventEmitter;

export default class EventEmitter {
    static init() {
        emitter = new NativeEventEmitter(this.getModule());
    }

    static getModule() {
        const module = NativeModules.EventEmitter;
        return module;
    }

    static getEvent(event: string) {
        if (EventEmitter.isValidEvent(event)) {
            return this.getModule()[event];
        }
        return null;
    }

    static isValidEvent(event: string) {
        return Object.keys(this.getModule()).indexOf(event) !== -1;
    }

    static addListener(event: string, handler: (...args: any[]) => any) {
        return emitter.addListener(event, handler);
    }

    static removeSubscription(subscription: EmitterSubscription) {
        emitter.removeSubscription(subscription);
    }
}
EventEmitter.init();
