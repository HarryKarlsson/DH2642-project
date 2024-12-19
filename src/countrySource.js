// countrySource.js
import { API_KEY, API_URL } from './apiConfig.js';
export function FetchCountryData() {
    const url = `${API_URL}/all`;
    return fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${API_KEY}`
        }
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log('Data received:', data);
        return data
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

export function FetchCountryDataByName(name) {
    name = name.toLowerCase();
    const url = `${API_URL}/name/${name}`;
    return fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${API_KEY}`
        }
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log('Data received:', data);
        return data
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

export function FetchCountryDataBycapital(capital) {
    
    capital = capital.toLowerCase();

    const url = `${API_URL}/capital/${capital}`;
    return fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${API_KEY}`
        }
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log('Data received:', data);
        return data
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

export function FetchCountryDataBylaguage(language) {
    // ignore capital letters make it lowercase
    language = language.toLowerCase();
    const url = `${API_URL}/language/${language}`;
    return fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${API_KEY}`
        }
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log('Data received:', data);
        return data
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}   

export function FetchCountryDataByRegion(region) {
    // ignore capital letters make it lowercase
    region = region.toLowerCase();
    const url = `${API_URL}/region/${region}`;
    return fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${API_KEY}`
        }
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log('Data received:', data);
        return data
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}   