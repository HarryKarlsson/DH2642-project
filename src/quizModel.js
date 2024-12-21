import { reactive } from 'vue';
import { FetchCountryDataByRegion } from '/src/countrySource.js';
import userModel from '/src/userModel.js';
  
const quizModel = {
    data: reactive({
        region: '',
        countryNames: [],
        quizCountries: [],
        currentQuizIndex: 0,
        maxQuestions: 10,
        questionType: "flag",
        userAnswer: "",
        isCorrect: false,
        showResult: false,
        quizCompleted: false,
        hint: "",
        showExitPopup: false,
        currentQuestion: null,
        loading: false
    }),

    saveQuizState() {
        const quizState = {
            region: this.data.region,
            quizCountries: this.data.quizCountries,
            currentQuizIndex: this.data.currentQuizIndex,
            questionType: this.data.questionType,
            currentQuestion: this.data.currentQuestion,
            quizCompleted: this.data.quizCompleted,
            path: window.location.hash
        };
        
        userModel.setQuizState(quizState);
    },

    setUserAnswer(answer) {
        this.data.userAnswer = answer;
    },

    async setRegion(region) {
        try {
            this.data.region = region;
            this.data.loading = true;
            console.log(`Setting region to: ${region}`);
            return true;
        } catch (error) {
            console.error(`Error setting region '${region}':`, error);
            this.data.loading = false;
            return false;
        }
    },
  
    async loadQuizCountries(region) {
        try {
            this.data.loading = true;
            console.log(`Loading countries for region: ${region}`);
            
            const countries = await FetchCountryDataByRegion(region);
            if (!Array.isArray(countries)) {
                throw new Error("Countries data is not an array");
            }
    
            const validCountries = countries.filter((country) => country.flag && country.capital);
            console.log(`Found ${validCountries.length} valid countries`);
    
            if (validCountries.length === 0) {
                throw new Error("No valid countries found");
            }
    
            // Randomly select 10 countries
            const randomCountries = validCountries
                .sort(() => Math.random() - 0.5)
                .slice(0, 10);
    
            this.data.quizCountries = randomCountries;
            this.data.currentQuizIndex = 0;
            this.data.loading = false;
            
            // Set initial question
            const initialQuestion = this.getCurrentQuizQuestion();
            this.data.currentQuestion = initialQuestion;
            
            console.log("Initial question set:", initialQuestion);
            return initialQuestion;
        } catch (error) {
            console.error("Error loading quiz countries:", error);
            this.data.loading = false;
            return null;
        }
    },
  
    toggleQuestionType() {
        this.data.questionType = this.data.questionType === "flag" ? "capital" : "flag";
    },
  
    getCurrentQuizQuestion() {
        const currentCountry = this.getCurrentQuizCountry();
        if (!currentCountry) {
            console.error("No current country available for question.");
            return null;
        }
    
        let question;
        if (this.data.questionType === "flag") {
            question = {
                type: "flag",
                question: "Guess the country based on its flag!",
                image: currentCountry.flag,
                answer: currentCountry.name,
            };
        } else {
            question = {
                type: "capital",
                question: `What is the capital of ${currentCountry.name}?`,
                answer: currentCountry.capital,
            };
        }
        
        console.log(`Creating ${this.data.questionType} question for:`, currentCountry.name);
        return question;
    },
  
    getCurrentQuizCountry() {
        if (!this.data.quizCountries || this.data.quizCountries.length === 0) {
            console.error("No quiz countries loaded");
            return null;
        }
        
        if (this.data.currentQuizIndex >= this.data.quizCountries.length) {
            console.log("Reached end of quiz");
            this.data.quizCompleted = true;
            return null;
        }
        
        return this.data.quizCountries[this.data.currentQuizIndex];
    },
  
    checkAnswer(userAnswer) {
        if (this.data.quizCompleted) {
            console.log("Quiz is already completed. No more answers allowed.");
            return false;
        }
  
        const currentQuestion = this.data.currentQuestion;
        if (!currentQuestion) {
            console.error("No question available for checking.");
            return false;
        }
  
        const correctAnswer = currentQuestion.answer.trim().toLowerCase();
        const userResponse = userAnswer.trim().toLowerCase();
  
        this.data.isCorrect = correctAnswer === userResponse;
        this.data.showResult = true;
  
        if (this.data.isCorrect) {
            userModel.incrementQuizScore();
        }
  
        this.data.hint = "";
        return this.data.isCorrect;
    },
  
    nextQuestion() {
        // Check if we've reached the end before incrementing
        if (this.data.currentQuizIndex >= this.data.maxQuestions - 1 || 
            this.data.currentQuizIndex >= this.data.quizCountries.length - 1) {
            console.log("Quiz completed!");
            this.data.quizCompleted = true;
            return;
        }
  
        // Increment index and set next question
        this.data.currentQuizIndex += 1;
        this.toggleQuestionType();
        
        const nextQuestion = this.getCurrentQuizQuestion();
        this.data.currentQuestion = nextQuestion;
        this.data.showResult = false;
        this.data.userAnswer = "";
        
        console.log(`Moving to question ${this.data.currentQuizIndex + 1}`, nextQuestion);
    },
  
    isQuizCompleted() {
        return this.data.currentQuizIndex >= this.data.maxQuestions - 1 || 
               this.data.currentQuizIndex >= this.data.quizCountries.length - 1;
    },
  
    handleHint() {
        if (!this.data.currentQuestion) {
            console.error("No current question to provide a hint.");
            return;
        }
        this.data.hint = `Hint: ${this.data.currentQuestion.answer.charAt(0).toUpperCase()}`;
    },
  
    handleExit() {
        this.data.showExitPopup = true;
    },
  
    yesExit() {
        this.data.showExitPopup = false;
        window.location.hash = "#/welcome";
    },
  
    noExit() {
        this.data.showExitPopup = false;
    },
  
    resetQuiz() {
        this.data.quizCountries = [];
        this.data.currentQuizIndex = 0;
        this.data.userAnswer = "";
        this.data.isCorrect = false;
        this.data.showResult = false;
        this.data.quizCompleted = false;
        this.data.hint = "";
        this.data.showExitPopup = false;
        this.data.currentQuestion = null;
        this.data.questionType = "flag";
        userModel.resetQuizScore();
        
        if (this.data.region) {
            return this.loadQuizCountries(this.data.region);
        }
    }
};
  
export default quizModel;