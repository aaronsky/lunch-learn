
let baseUrl = '';
let tempKey = '';

export class Getter {
    static setBaseUrl(url) {
        baseUrl = url;
    }

    static setApiKey(apiKey) {
        tempKey = apiKey;
    }
    
    static create(route) {
        const shouldAddSlash = (baseUrl.slice(-1) !== '/' && route[0] !== '/');
        const url = `${baseUrl}${shouldAddSlash && '/'}${route}`;
        const headers = {};
        return {
            get: (body = {}) => {
                if (tempKey) {
                    body.api_key = tempKey;
                }
                return fetch(url, 'get', headers, body).then(response => response.text()).then(response => JSON.parse(response));
            }
        };
    }
}