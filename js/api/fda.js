
import { Getter } from './api';

const FDA_API_KEY = '4iEGOS04ExqpP1AhG87imzVtXjD3Ozc6CWAWYNum';
const FDA_BASE_URL = 'https://api.fda.gov';

export default class FDAService {
    static get drugs() {
        return {
            enforcements: Getter.create(FDA_BASE_URL, 'drug/enforcement', FDA_API_KEY),
            events: Getter.create(FDA_BASE_URL, 'drug/event.json', FDA_API_KEY)
        };
    }

    static get devices() {
        return {
            events: Getter.create(FDA_BASE_URL, 'device/event.json', FDA_API_KEY),
            classifications: Getter.create(FDA_BASE_URL, 'device/classification.json', FDA_API_KEY),
            '510k': Getter.create(FDA_BASE_URL, 'device/510k.json', FDA_API_KEY),
            pma: Getter.create(FDA_BASE_URL, 'device/pma.json', FDA_API_KEY),
            registrationlistings: Getter.create(FDA_BASE_URL, 'device/registrationlisting.json', FDA_API_KEY),
            recalls: Getter.create(FDA_BASE_URL, 'device/recall.json', FDA_API_KEY),
            enforcement: Getter.create(FDA_BASE_URL, 'device/enforcement.json', FDA_API_KEY),
            udi: Getter.create(FDA_BASE_URL, 'device/udi.json', FDA_API_KEY)
        };
    }

    static get foods() {
        return {
            enforcements: Getter.create(FDA_BASE_URL, 'food/enforcement.json', FDA_API_KEY),
            events: Getter.create(FDA_BASE_URL, 'food/event.json', FDA_API_KEY)
        };
    }
}