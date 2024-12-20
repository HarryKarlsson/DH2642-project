import { reactive, onMounted } from "vue";
import { QuizPageView } from "../views/quizPageView";
import countryModel from "../countryModel";
import userModel from "/src/userModel";


export default {
    setup: function () {
        const state = reactive({
            randomCountry: null,
            userAnswer: "",
            isCorrect: false,
            showResult: false,
            quizCompleted: false,
            highestScore: 3
        });
        
        function setHighestScore(score){
            this.highestScore = score; 
        }

        
        function startQuiz() {
            userModel.resetQuizScore();
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
            countryModel.toggleQuestionType(); 
            state.currentQuestion = countryModel.getCurrentQuizQuestion();
            state.showResult = false;
            state.userAnswer = "";
        }
        

       
        function setUserAnswer(answer) {
            state.userAnswer = answer;
        }

       
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
        
            const correctAnswer = state.currentQuestion.answer.trim().toLowerCase(); 
            const userResponse = state.userAnswer.trim().toLowerCase(); 
        
            state.isCorrect = correctAnswer === userResponse;
            state.showResult = true;
        
            if (state.isCorrect) {
                userModel.setQuizScore(1); 
            }
        //För oss att kolla på ta bort den
            console.log("User Answer:", state.userAnswer);
            console.log("Correct Answer:", state.currentQuestion.answer);
            console.log("Is Correct:", state.isCorrect);
            console.log("Current quizScore:", state.quizScore);
        }
        
        function resetQuiz() {
            state.randomCountry = null; 
            state.userAnswer = ""; 
            state.isCorrect = false; 
            state.showResult = false; 
            userModel.setQuizScore(0); 
            state.quizCompleted = false; 
    
            startQuiz();
        }

        onMounted(() => {
            startQuiz(); 
        });

        return function () {
            return (
                <QuizPageView
                    currentQuestion={state.currentQuestion}
                    userAnswer={state.userAnswer}
                    setUserAnswer={setUserAnswer}
                    checkAnswer={checkAnswer}
                    isCorrect={state.isCorrect}
                    showResult={state.showResult}
                    nextQuestion={nextQuestion}
                    quizScore={userModel.getQuizScore()}
                    quizCompleted={state.quizCompleted}
                    resetQuiz={resetQuiz}
                />
            );
        };
        

    },
};
