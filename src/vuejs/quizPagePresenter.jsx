


import { onMounted } from "vue";
import { QuizPageView } from "/src/views/quizPageView";
import quizModel from "/src/quizModel";
import userModel from "/src/userModel";

export default {
    setup: function () {
        function startQuiz() {
            userModel.resetQuizScore();
            if (!quizModel.data.region) {
                console.error("No region selected for the quiz.");
                return;
            }
            quizModel.loadQuizCountries(quizModel.data.region);
        }

        onMounted(() => {
            startQuiz();
        });

        return function () {
            return <QuizPageView />;
        };
    },
};