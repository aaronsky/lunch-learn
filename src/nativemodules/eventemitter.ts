import { EmitterSubscription, NativeAppEventEmitter, NativeEventEmitter, NativeModules, Platform } from 'react-native';

let emitter: NativeEventEmitter;

const iOS = Platform.OS === 'ios';
const Android = Platform.OS === 'android';

export default class EventEmitter {
    static init() {
        if (iOS) {
            emitter = new NativeEventEmitter(this.getModule());
        }
    }

    static getModule() {
        const module = NativeModules.EventEmitter;
        return module;
    }

    static getEvent(event: string) {
        if (Android) {
            // Cross your fingers and hope for the best
            return event;
        } else if (EventEmitter.isValidEvent(event)) {
            return this.getModule()[event];
        }
        return null;
    }

    static isValidEvent(event: string) {
        return Object.keys(this.getModule()).indexOf(event) !== -1;
    }

    static addListener(event: string, handler: (...args: any[]) => any) {
        if (Android) {
            return NativeAppEventEmitter.addListener(event, handler);
        } else {
            return emitter.addListener(event, handler);
        }
    }

    static removeSubscription(subscription: EmitterSubscription) {
        if (Android) {
            NativeAppEventEmitter.removeSubscription(subscription);
        } else {
            emitter.removeSubscription(subscription);
        }
    }
}
EventEmitter.init();
