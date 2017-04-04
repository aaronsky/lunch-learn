import { NativeEventEmitter, NativeModules } from 'react-native';

export default class EventEmitter {
    static init() {
        this.emitter = new NativeEventEmitter(this.getModule());
    }

    static getModule() {
        const module = NativeModules.EventEmitter;
        return module;
    }
    
    static getEvent(event) {
        if (EventEmitter.isValidEvent(event)) {
            return this.getModule()[event];
        }
        return null;
    }

    static isValidEvent(event) {
        return Object.keys(this.getModule()).indexOf(event) !== -1;
    }

    static addListener(event, handler) {
        return this.emitter.addListener(event, handler);
    }

    static removeSubscription(subscription) {
        this.emitter.removeSubscription(subscription);
    }
}
EventEmitter.init();