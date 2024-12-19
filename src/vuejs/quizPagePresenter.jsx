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
            const currentCountry = countryModel.getCurrentQuizCountry();
            if (!currentCountry) {
                console.error("No country available for checking.");
                return;
            }

            state.isCorrect =
                state.userAnswer.trim().toLowerCase() === currentCountry.name.trim().toLowerCase();
            state.showResult = true;

            console.log("User Answer:", state.userAnswer);
            console.log("Correct Answer:", currentCountry.name);
            console.log("Is Correct:", state.isCorrect);
        }

        // Gå till nästa fråga
        function nextQuestion() {
            countryModel.nextQuestion(); // Flytta till nästa fråga i modellen
            state.randomCountry = countryModel.getCurrentQuizCountry(); // Hämta nästa fråga

            if (state.randomCountry) {
                state.showResult = false; // Dölj resultatet
                state.userAnswer = ""; // Nollställ användarens svar
                console.log("Next question loaded:", state.randomCountry);
            } else {
                console.log("No more questions available. Quiz completed!");
            }
        }

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
                    nextQuestion={nextQuestion} // Skicka funktionen för nästa fråga
                />
            );
        };
    },
};
