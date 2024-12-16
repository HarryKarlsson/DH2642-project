// countryModel.js
import { FetchCountryData, FetchCountryDataByName } from '/src/countrySource.js';

const countryModel = {
    data: {
        countryData: null,
        loading: true,
        searchQuery: '',
        currentPage: 0,
        itemsPerPage: 5,
        currentCountryId: null,
        searchType: 'name',
        searchError : ""
    },

    setSearchType(type) {
        this.data.searchType = type;
    },


    
    setCountryData(data) {
        this.data.countryData = data;
        this.data.loading = false;
    },

    setSearchQuery(query) {
        this.data.searchQuery = query;
    },

    setCurrentPage(page) {
        this.data.currentPage = page;
    },

    setCurrentCountryId(id) {
        if (id === this.data.currentCountryId) return;
        if(!id) this.data.currentCountryId = null;
        this.data.currentCountryId = id;
    },

    setErrorMessage(message) {
        this.data.searchError = message;
    },

    
    
    // Search and sorting methods
    async searchCountries(query) {
        if (!query) return;
        try {
            this.data.loading = true;
            const data = await FetchCountryDataByName(query);
            console.log("Search results:", data); // Debug log
            this.setCountryData(data);
            return data; // Return data for the view to use
        } catch (error) {
            console.error('Error searching countries:', error);
            this.data.loading = false;
        }
    },

    
    // Data loading
    async loadInitialData() {
        try {
            const data = await FetchCountryData();
            this.setCountryData(data);
        } catch (error) {
            console.error('Error loading initial data:', error);
        }
    }
};

export default countryModel;