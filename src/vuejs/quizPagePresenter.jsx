import { reactive } from "vue";
import { QuizPageView } from "../views/quizPageView";
import countryModel from "../countryModel";

export default {
    setup: function() {
        const state = reactive({
            randomCountry: countryModel.data.randomCountry || null,
            userAnswer: "",
            isCorrect: false,
            showResult: false,
        });

        function setUserAnswer(answer) {
            state.userAnswer = answer;
        }

        function checkAnswer() {
            if (!state.randomCountry) {
                console.error("No country available for checking.");
                return;
            }

            state.isCorrect =
                state.userAnswer.trim().toLowerCase() === state.randomCountry.name.trim().toLowerCase();
            state.showResult = true;

            console.log("User Answer:", state.userAnswer);
            console.log("Correct Answer:", state.randomCountry.name);
            console.log("Is Correct:", state.isCorrect);
        }

        return function() {
            return (
                <QuizPageView
                    randomCountry={state.randomCountry}
                    userAnswer={state.userAnswer}
                    setUserAnswer={setUserAnswer}
                    checkAnswer={checkAnswer}
                    isCorrect={state.isCorrect}
                    showResult={state.showResult}
                />
            );
        };
    },
};
