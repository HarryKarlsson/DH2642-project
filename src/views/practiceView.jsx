// practiceView.jsx
import countryModel from '/src/countryModel';
import "../css/practice.css";
import {getPaginatedCountries,getTotalPages,handleNextPage,handlePrevPage,
        handleSearchQuery,handleSearch,sortCountriesAZ,resetData} from '/src/pageController';

import { getCountryDetails } from '/src/utilities';

// import dialog components
import {
    DialogRoot,
    DialogTrigger,
    DialogPortal,
    DialogOverlay,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogClose
} from 'radix-vue';

const CountryCard = ({country, index}) => (
    
    !country || !country.flag || !country.name ) ? null : (

    
    <div key={index} className="country-box">
        
        <DialogRoot>
                
            <div className="flag-section">
                
                <img
                    src={country.flag.medium || country.flag}
                    alt={`${country.name} flag`}
                    className="country-flag"
                />
            
                <div className="country-details">
                <p><strong>Country:</strong> {country.name}</p>
                <p><strong>Capital:</strong> {country.capital}</p>
                </div>
    
                <DialogTrigger>
                        <button className="btn-details">View Details</button>
                </DialogTrigger>
            
            </div>
           
            <DialogPortal>
                <DialogOverlay className="dialog-overlay" />
                <DialogContent className="dialog-content">
                    <div className="dialog-header">
                        <img 
                            src={country.flag.large || country.flag} 
                            alt={`${country.name} flag`} 
                            className="dialog-flag"
                        />
                        <div className="dialog-title-section">
                            <DialogTitle className="dialog-title">{country.name}</DialogTitle>
                            <DialogDescription className="dialog-description">
                                Official Name: {country.official_name}
                            </DialogDescription>
                        </div>
                    </div>
                    
                    <div className="dialog-body">
                        <div className="details-grid">
                            {getCountryDetails(country).map(({ label, value }) => (
                                <div key={label} className="detail-item">
                                    <strong>{label}:</strong>
                                    <span>{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="dialog-footer">
                        <DialogClose>
                            <button className="btn-close">Close</button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </DialogPortal>
        </DialogRoot>
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
                                disabled={!this.countryData || Object.values(this.countryData).length <= 1}
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

                    {this.searchError && (
                    <div className="search-error-message">
                        {this.searchError}
                        
                    </div>
                    )}
                </div>

               

                {this.loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <div className="countries-list">
                            { paginatedCountries && paginatedCountries.length > 0 ? (
                            paginatedCountries.map((country, index) => (
                                <CountryCard 
                                    key={country.name} 
                                    country={country} 
                                    index={index}
                                />
                            ))
                        ) : (
                            !this.loading && !this.searchError && (
                                <div className="no-results">
                                    Your search for "{this.searchQuery}" may not match "{this.searchType}" or the result was not found! Try again!
                                    </div>
                            )
                        )}
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