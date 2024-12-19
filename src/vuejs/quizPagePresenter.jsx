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
        function startQuiz() {
            if (!countryModel.data.region) {
                console.error("No region selected for the quiz.");
                return;
            }
        
            countryModel.loadQuizCountries(countryModel.data.region).then(() => {
                state.currentQuestion = countryModel.getCurrentQuizQuestion();
                if (!state.currentQuestion) {
                    console.error("Failed to generate the first question.");
                } else {
                    console.log("First question generated:", state.currentQuestion);
                }
            });
        }
        
        
        
        function nextQuestion() {
            if (countryModel.isQuizCompleted()) {
                console.log("Quiz completed!");
                state.quizCompleted = true;
                state.currentQuestion = null;
                return;
            }
        
            countryModel.nextQuestion();
            countryModel.toggleQuestionType(); // Växla mellan frågetyper
            state.currentQuestion = countryModel.getCurrentQuizQuestion();
            state.showResult = false;
            state.userAnswer = "";
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
        
            const correctAnswer = state.currentQuestion.answer.trim().toLowerCase(); // Rätt svar
            const userResponse = state.userAnswer.trim().toLowerCase(); // Användarens svar
        
            state.isCorrect = correctAnswer === userResponse; // Jämför svaren
            state.showResult = true;
        
            if (state.isCorrect) {
                state.score += 1; // Öka poängen om svaret är rätt
            }
        
            console.log("User Answer:", state.userAnswer);
            console.log("Correct Answer:", state.currentQuestion.answer);
            console.log("Is Correct:", state.isCorrect);
            console.log("Current Score:", state.score);
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
                    currentQuestion={state.currentQuestion} // Skicka frågan till vyn
                    userAnswer={state.userAnswer}
                    setUserAnswer={setUserAnswer}
                    checkAnswer={checkAnswer}
                    isCorrect={state.isCorrect}
                    showResult={state.showResult}
                    nextQuestion={nextQuestion}
                    score={state.score}
                    quizCompleted={state.quizCompleted}
                    resetQuiz={resetQuiz}
                />
            );
        };
        

    },
};
