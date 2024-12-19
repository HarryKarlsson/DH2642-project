import { reactive, onMounted } from "vue";
import { QuizPageView } from "../views/quizPageView";
import countryModel from "../countryModel";

export default {
    setup: function () {
        const state = reactive({
            randomCountry: null,
            userAnswer: "",
            isCorrect: false,
            showResult: false,
            score: 0,
            quizCompleted: false, // Nytt fält för att markera att quizet är slut
        });
        

        // Funktion för att starta quizet
        async function startQuiz() {
            try {
                // Se till att det finns en region vald
                if (!countryModel.data.region) {
                    console.error("No region selected for the quiz.");
                    return;
                }

                // Ladda quizdata
                await countryModel.loadQuizCountries(countryModel.data.region);
                state.randomCountry = countryModel.getCurrentQuizCountry();

                if (!state.randomCountry) {
                    console.error("Failed to load quiz countries.");
                } else {
                    console.log("Quiz started with the first question:", state.randomCountry);
                }
            } catch (error) {
                console.error("Error starting quiz:", error);
            }
        }

        // Sätt användarens svar
        function setUserAnswer(answer) {
            state.userAnswer = answer;
        }

        // Kontrollera om svaret är rätt
        function checkAnswer() {
            if (state.quizCompleted) {
                console.log("Quiz is already completed. No more answers allowed.");
                return;
            }
        
            const currentCountry = countryModel.getCurrentQuizCountry();
            if (!currentCountry) {
                console.error("No country available for checking.");
                return;
            }
        
            state.isCorrect =
                state.userAnswer.trim().toLowerCase() === currentCountry.name.trim().toLowerCase();
            state.showResult = true;
        
            if (state.isCorrect) {
                state.score += 1; // Öka poängen om svaret är rätt
            }
        
            console.log("User Answer:", state.userAnswer);
            console.log("Correct Answer:", currentCountry.name);
            console.log("Is Correct:", state.isCorrect);
            console.log("Current Score:", state.score);
        }
        
        function nextQuestion() {
            if (countryModel.isQuizCompleted()) {
                console.log("Quiz completed!");
                state.quizCompleted = true; // Markera quizet som avslutat
                state.randomCountry = null; // Rensa frågan
                return;
            }
        
            countryModel.nextQuestion(); // Flytta till nästa fråga i modellen
            state.randomCountry = countryModel.getCurrentQuizCountry(); // Hämta nästa fråga
            state.showResult = false; // Dölj resultatet
            state.userAnswer = ""; // Nollställ användarens svar
        }
        
        function resetQuiz() {
            state.randomCountry = null; // Rensa aktuell fråga
            state.userAnswer = ""; // Nollställ användarens svar
            state.isCorrect = false; // Återställ rätt/fel-status
            state.showResult = false; // Dölj resultatet
            state.score = 0; // Återställ poängen
            state.quizCompleted = false; // Markera quizet som inte avslutat
        
            // Starta om quizet
            startQuiz();
        }
        
        
        

        // Gå till nästa fråga

        

        // Körs när komponenten mountas
        onMounted(() => {
            startQuiz(); // Starta quizet när sidan laddas
        });

        return function () {
            return (
                <QuizPageView
                    randomCountry={state.randomCountry}
                    userAnswer={state.userAnswer}
                    setUserAnswer={setUserAnswer}
                    checkAnswer={checkAnswer}
                    isCorrect={state.isCorrect}
                    showResult={state.showResult}
                    nextQuestion={nextQuestion}
                    score={state.score}
                    quizCompleted={state.quizCompleted}
                    resetQuiz={resetQuiz} // Skicka funktionen till vyn
                />
            );
        };
        
    },
};
