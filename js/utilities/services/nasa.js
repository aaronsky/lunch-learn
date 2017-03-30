import { Getter } from './api';

const NASA_API_KEY = '8lbVUWkh7XrTV423iAQzOBot53bbBYFuWT9htYYv';
const NASA_BASE_URL = 'https://api.nasa.gov/';

export default class NASAService {
    static get neo() {
        return {
            feed: Getter.create(NASA_BASE_URL, 'neo/rest/v1/feed', NASA_API_KEY),
            lookup: Getter.create(NASA_BASE_URL, 'neo/rest/v1/neo/', NASA_API_KEY),
            browse: Getter.create(NASA_BASE_URL, 'neo/rest/v1/neo/browse', NASA_API_KEY)
        }
    }
}