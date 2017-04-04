import { NativeModules } from 'react-native';

export default class EventEmitter {
    static getModule() {
        const module = NativeModules.EventEmitter;
        return module;
    }
    
    static isValidEvent(event) {
        return Object.keys(this.getModule()).indexOf(event) !== -1;
    }

    static addListener(event, handler) {
        this.getModule().addListener(event, handler);
    }
}