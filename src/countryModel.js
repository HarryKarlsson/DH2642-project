import { FetchCountryData, FetchCountryDataByName } from '/src/countrySource.js';
/* HAr kladdat en massor här inne så innan vi mergar till dev eller main måste vi kolla det*/
//Finns säkert mycket kod man kan ta bort eller förenkla 
const countryModel = {
    data: {
        countryData: null,
        loading: true,
        searchQuery: '',
        currentPage: 0,
        itemsPerPage: 5,
        currentCountryId: null,
        randomCountry: null,
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
        this.data.currentCountryId = id || null;
    },

    async fetchRandomCountry() {
        try {
            this.data.loading = true;
            const allCountries = await FetchCountryData();
            const countryArray = Object.values(allCountries);
    
            if (countryArray.length === 0) {
                throw new Error("Country data is empty");
            }
    
            const randomIndex = Math.floor(Math.random() * countryArray.length);
            const randomCountry = countryArray[randomIndex];
    
            const countryName = randomCountry?.name || "Unknown Country";
            const countryFlag = randomCountry?.flag?.medium || randomCountry?.flag?.small || "No Flag Available";
    
            this.data.randomCountry = { name: countryName, flag: countryFlag };
            this.data.loading = false;
        } catch (error) {
            console.error("Error fetching random country:", error.message);
            this.data.loading = false;
        }
    }
,    

    async searchCountries(query) {
        if (!query) return;
        try {
            this.data.loading = true;
            const data = await FetchCountryDataByName(query);
            this.setCountryData(data);
            return data;
        } catch (error) {
            console.error('Error searching countries:', error);
            this.data.loading = false;
        }
    },

    async loadInitialData() {
        try {
            const data = await FetchCountryData();
            this.setCountryData(data);
        } catch (error) {
            console.error('Error loading initial data:', error);
        }
    },
};

export default countryModel;
