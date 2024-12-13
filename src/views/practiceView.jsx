// practiceView.js
import countryModel from '/src/countryModel';
import "../css/home.css";
import {getPaginatedCountries,getTotalPages,handleNextPage,handlePrevPage,
        handleSearchQuery,handleSearch,sortCountriesAZ,resetData} from '/src/pageController';

// UI Components
const CountryCard = ({country, index }) => (
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
                Object.values(country.currencies).map(currency => currency.name).join(', ')
            }</p>
        </div>
    </div>
);

const PaginationControls = ({ currentPage, totalPages, onPrev, onNext }) => (
    <div className="pagination-controls">
        <button 
            onClick={onPrev}
            disabled={currentPage === 0}
            className="pagination-btn"
        >
            ← Previous
        </button>
        <span className="page-info">
            Page {currentPage + 1} of {totalPages}
        </span>
        <button 
            onClick={onNext}
            disabled={currentPage === totalPages - 1}
            className="pagination-btn"
        >
            Next →
        </button>
    </div>
);

// Main component
const PracticeView = {
    data() {
        return { ...countryModel.data };
    },

    async created() {
        await resetData(this);
    },

    render() {

        const paginatedCountries = getPaginatedCountries(
            this.countryData, 
            this.currentPage, 
            this.itemsPerPage
        );
        const totalPages = getTotalPages(this.countryData, this.itemsPerPage);

        return (
            <div className="app-container">
                <div className="main-title-section">
                    <h1 className="main-title">Practice makes perfect <span className="globe">🌍</span></h1>
                    <div className="control-buttons">
                        <button 
                            className="btn-default"
                            onClick={() => resetData(this)}
                        >
                            Default
                        </button>
                        <button 
                            className="btn-az"
                            onClick={() => sortCountriesAZ(this)}
                        >
                            A-Z
                        </button>
                    </div>
                </div>
                <div className="search-section">

                    <div className="search-container">
                        <select value={this.searchType} onChange={(e) => this.searchType = e.target.value} className="search-type-dropdown">
                            <option value="name">Name</option>
                            <option value="capital">Capital</option>
                            <option value="region">Region</option>
                            <option value="language">Language</option>
                        </select>
                    </div>
                    <input
                        type="text"
                        placeholder={`Search by ${this.searchType}...`}
                        className="search-input"
                        value={this.searchQuery}
                        onInput={(e) => handleSearchQuery(e, this)}
                    />
                    <button 
                        className={`search-button ${!this.searchQuery ? 'disabled' : ''}`}
                        disabled={!this.searchQuery}
                        onClick={() => handleSearch(this)}
                    >
                        Search
                    </button>
                </div>

                {this.loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <div className="countries-list">
                            {paginatedCountries.map((country, index) => (
                                <CountryCard 
                                    key={country.name} 
                                    country={country} 
                                    index={index}
                                />
                            ))}
                        </div>
                        <PaginationControls 
                            currentPage={this.currentPage}
                            totalPages={totalPages}
                            onPrev={() => handlePrevPage(this)}
                            onNext={() => handleNextPage(this)}
                        />
                    </>
                )}
            </div>
        );
    }
};

export default PracticeView;