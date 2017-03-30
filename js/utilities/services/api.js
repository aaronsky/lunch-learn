
export class Getter {
    static create(baseUrl, route, apiKey) {
        return {
            get: async () => {
                const url = baseUrl + route + '?api_key=' + apiKey;
                const response = await fetch(url);
                const responseText = await response.text();
                return JSON.parse(responseText);
            }
        };
    }
}