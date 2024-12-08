// homeView.jsx
import "../css/home.css"
import { FetchCountryData, FetchCountryDataByName } from '../countrySource';

const HomeView = {
    data() {
        return {
            countryData: null,
            loading: true,
            searchQuery: ''
        }
    },
    async created() {
        const data =  () => {
            FetchCountryData()
                .then((data) => {
                    this.countryData = data;
                    this.loading = false;
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
        data();

    },
    render() {
        const renderCountryCard = (country, index) => (
            <div key={index} className="country-box">
                <div className="flag-section">
                    <img
                        src={country.flag.medium}
                        alt={`${country.name} flag`}
                        className="country-flag"
                    />
                </div>
                <div className="country-details">
                    <p><strong>Country:</strong> {country.name}</p>
                    <p><strong>Capital:</strong> {country.capital}</p>
                    <p><strong>Currency:</strong> {
                        Object.values(country.currencies || {}).map(currency => currency.name).join(', ')
                    }</p>
                </div>
            </div>
        );

        return (
            <div className="app-container">
                <div className="main-title-section">
                    <h1 className="main-title">Practice makes perfect <span className="globe">🌍</span></h1>
                    <div className="control-buttons">
                        <button className="btn-default">Default</button>
                        <button className="btn-az">A-Z</button>
                        <button className="btn-quit">Quit</button>
                    </div>
                </div>
                <div className="search-section">
                    <input 
                        type="text" 
                        placeholder="Search eg. by region, country, capital..." 
                        className="search-input"
                        v-model={this.searchQuery}
                    />
                    <button className={`search-button ${!this.searchQuery ? 'disabled' : ''}`} 
                    disabled={!this.searchQuery} >Search</button>
                </div>

                {this.loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="countries-list">
                        {this.countryData && Object.values(this.countryData).map(renderCountryCard)}
                    </div>
                )}
            </div>
        );
    }
}


export default HomeView;