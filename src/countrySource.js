import { API_URL, API_KEY } from './apiConfig';

export function fetchCountryData(params = {}) {
    const queryParams = new URLSearchParams(params);
    const url = `${API_URL}?${queryParams.toString()}`;
    const options = {
        method: 'GET',
        headers: {
            'X-Country-API-Key': API_KEY
        }
    };

    return fetch(url, options)
        .then(response => response.json())
        .then(data => data.results)
        .catch(error => console.error('Error fetching country data:', error));
}


    