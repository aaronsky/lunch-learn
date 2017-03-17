
import { Getter } from './api';

const FDA_API_KEY = '4iEGOS04ExqpP1AhG87imzVtXjD3Ozc6CWAWYNum';
const FDA_BASE_URL = 'https://api.fda.gov';

export default class FDAService {
    static get drugs() {
        Getter.setApiKey(FDA_API_KEY);
        Getter.setBaseUrl(FDA_BASE_URL);
        return {
            enforcements: Getter.create('drug/enforcement'),
            events: Getter.create('drug/event.json')
        };
    }

    static get devices() {
        Getter.setApiKey(FDA_API_KEY);
        Getter.setBaseUrl(FDA_BASE_URL);
        return {
            events: Getter.create('device/event.json'),
            classifications: Getter.create('device/classification.json'),
            '510k': Getter.create('device/510k.json'),
            pma: Getter.create('device/pma.json'),
            registrationlistings: Getter.create('device/registrationlisting.json'),
            recalls: Getter.create('device/recall.json'),
            enforcement: Getter.create('device/enforcement.json'),
            udi: Getter.create('device/udi.json')
        };
    }

    static get foods() {
        Getter.setApiKey(FDA_API_KEY);
        Getter.setBaseUrl(FDA_BASE_URL);
        return {
            enforcements: Getter.create('food/enforcement.json'),
            events: Getter.create('food/event.json')
        };
    }
}