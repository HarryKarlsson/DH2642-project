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
    const formattedRegion = region.toLowerCase().replace(/\s+/g, "-");
    const url = `${API_URL}/region/${formattedRegion}`;

    return fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${API_KEY}`
        }
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        // Map data to extract country name and large flag
        const countryArray = Object.values(data).map((country) => ({
            name: country.name,
            flag: country.flag?.large || null, // Extract the 'large' flag URL
        }));

        console.log("Converted country data to array:", countryArray);
        return countryArray;
    })
    .catch((error) => {
        console.error(`Error fetching data for region '${region}':`, error);
        throw error;
    });
}
