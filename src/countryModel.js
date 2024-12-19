
import { FetchCountryData, FetchCountryDataByName, FetchCountryDataByRegion } from '/src/countrySource.js';


const countryModel = {
    data: {
        countryData: null,
        loading: true,
        searchQuery: '',
        currentPage: 0,
        itemsPerPage: 5,
        currentCountryId: null,
        region: '',
        countryNames: [],
        quizCountries: [], 
        currentQuizIndex: 0, 
        userAnswer: '', 
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

        if (!id) this.data.currentCountryId = null;
        this.data.currentCountryId = id;
    },


    setRegion(region) {
        this.data.region = region;
    },

    setCountryName(names) {
        this.data.countryNames = names;
    },

    setQuizCountries(countries) {
        this.data.quizCountries = countries;
    },

    setCurrentQuizIndex(index) {
        this.data.currentQuizIndex = index;
    },

    setUserAnswer(answer) {
        this.data.userAnswer = answer;
    },

    // Quiz-specific methods
    async loadQuizCountries(region) {
        try {
            this.data.loading = true;
            const countries = await FetchCountryDataByRegion(region); // Fetch all country data
            const randomCountries = Object.values(countries)
                .sort(() => Math.random() - 0.5) // Shuffle countries
                .slice(0, 10); // Pick the first 10 for the quiz
            this.setQuizCountries(randomCountries); // Update the model with quiz countries
            this.data.currentQuizIndex = 0; // Reset to the first question
            this.data.loading = false;
        } catch (error) {
            console.error('Error loading quiz countries:', error);
            this.data.loading = false;
        }
    },

    getCurrentQuizCountry() {
        if (!this.data.quizCountries || this.data.quizCountries.length === 0) {
            return null;
        }
        return this.data.quizCountries[this.data.currentQuizIndex];
    },

    checkAnswer(answer) {
        const currentCountry = this.getCurrentQuizCountry();
        if (!currentCountry) return false;
        return currentCountry.name.toLowerCase() === answer.trim().toLowerCase();
    },

    nextQuestion() {
        if (this.data.currentQuizIndex < this.data.quizCountries.length - 1) {
            this.data.currentQuizIndex += 1;
        } else {
            console.log("Quiz completed!");
        }
    },

    resetQuiz() {
        this.data.quizCountries = [];
        this.data.currentQuizIndex = 0;
        this.data.userAnswer = '';
    },

    setErrorMessage(message) {
        this.data.searchError = message;
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


    // Data loading


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
