import { 
    FetchCountryData, 
    FetchCountryDataByName, 
    FetchCountryDataByRegion 
} from '/src/countrySource.js';

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
        randomCountry: null,
        searchType: 'name',
        searchError: "",
        maxQuestions: 9,
        questionType: "flag",
    },

    toggleQuestionType() {
        this.data.questionType = this.data.questionType === "flag" ? "capital" : "flag";
    },
    // Sätter vald region och hämtar länder för regionen
    async setRegion(region) {
        try {
            this.data.region = region;
            this.data.loading = true;
    
            const countries = await FetchCountryDataByRegion(region);
            if (!Array.isArray(countries)) {
                throw new Error("Countries data is not an array");
            }
    
            // Spara hela countryData för quizet
            this.data.countryData = countries;
            this.data.countryNames = countries.map((country) => country.name); // Namn för andra funktioner
            this.data.loading = false;
    
            console.log(`Countries loaded for region '${region}':`, this.data.countryNames);
        } catch (error) {
            console.error(`Error loading countries for region '${region}':`, error);
            this.data.loading = false;
        }
    }
    ,
    

    async loadQuizCountries(region) {
        try {
            this.data.loading = true;
            const countries = await FetchCountryDataByRegion(region);
    
            const validCountries = countries.filter((country) => country.flag && country.capital);
    
            if (validCountries.length === 0) {
                console.error("No valid countries found. Using placeholder data.");
                validCountries.push({
                    name: "Test Country",
                    flag: "https://via.placeholder.com/150",
                    capital: "Test Capital",
                });
            }
    
            const randomCountries = validCountries
                .sort(() => Math.random() - 0.5)
                .slice(0, 10);
    
            this.setQuizCountries(randomCountries);
            this.data.currentQuizIndex = 0;
            this.data.loading = false;
    
            console.log("Quiz countries loaded:", randomCountries);
        } catch (error) {
            console.error("Error loading quiz countries:", error);
            this.data.loading = false;
        }
    }
    
    
    
    ,
    
    getCurrentQuizQuestion() {
        const currentCountry = this.getCurrentQuizCountry();
        if (!currentCountry) {
            console.error("No current country available for question.");
            return null;
        }
    
        if (this.data.questionType === "flag") {
            console.log("Creating a flag question for:", currentCountry.name);
            return {
                type: "flag",
                question: "Guess the country based on its flag!",
                image: currentCountry.flag,
                answer: currentCountry.name,
            };
        } else if (this.data.questionType === "capital") {
            console.log("Creating a capital question for:", currentCountry.name);
            return {
                type: "capital",
                question: `What is the capital of ${currentCountry.name}?`,
                answer: currentCountry.capital,
            };
        }
    }
    ,
    

     getCurrentQuizCountry() {
        if (
            this.data.quizCountries &&
            this.data.currentQuizIndex >= 0 &&
            this.data.currentQuizIndex < this.data.quizCountries.length
        ) {
            return this.data.quizCountries[this.data.currentQuizIndex];
        }
        return null;
    },

    checkAnswer(answer) {
        const currentCountry = this.getCurrentQuizCountry();
        if (!currentCountry) return false;
        return currentCountry.name.trim().toLowerCase() === answer.trim().toLowerCase();
    },

    nextQuestion() {
        if (this.isQuizCompleted()) {
            console.log("Quiz completed or max questions reached!");
            return;
        }
        this.data.currentQuizIndex += 1; // Flytta till nästa fråga
    }
    ,

    isQuizCompleted() {
        return this.data.currentQuizIndex >= this.data.maxQuestions || 
               this.data.currentQuizIndex >= this.data.quizCountries.length;
    },
    
    resetQuiz() {
        this.data.quizCountries = [];
        this.data.currentQuizIndex = 0;
        this.data.userAnswer = '';
    },

    // Metod för att hämta ett slumpmässigt land för quizet
    async fetchRandomCountry() {
        try {
            this.data.loading = true;
            if (!this.data.region) {
                throw new Error("Region is not set.");
            }

            const countries = await FetchCountryDataByRegion(this.data.region);
            const randomIndex = Math.floor(Math.random() * countries.length);
            const randomCountry = countries[randomIndex];

            if (!randomCountry) {
                throw new Error("No country found for the selected region.");
            }

            this.data.randomCountry = {
                name: randomCountry.name || "Unknown Country",
                flag: randomCountry.flag || "No Flag Available"
            };
            this.data.loading = false;
        } catch (error) {
            console.error("Error fetching random country:", error.message);
            this.data.loading = false;
        }
    },

    // Sökland-funktioner
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

    // Ladda all data vid start
    async loadInitialData() {
        try {
            const data = await FetchCountryData();
            this.setCountryData(data);
        } catch (error) {
            console.error('Error loading initial data:', error);
        }
    },

    

    // Sätt felmeddelande
    setErrorMessage(message) {
        this.data.searchError = message;
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
    }
};

export default countryModel;
