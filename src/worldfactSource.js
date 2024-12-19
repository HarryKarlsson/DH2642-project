import { API_URL_factbook, API_KEY_factbook } from './apiConfig'


export function testfetch(){
const url = "https://api.dev.me/world-factbook/countries"
const options = { method: 'GET',
    headers: API_KEY_factbook
}
return fetch(url, options)

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