import { onMounted } from "vue";
import { QuizPageView } from "/src/views/quizPageView";
import quizModel from "/src/quizModel";
import userModel from "/src/userModel";
import { loadStateFromFirebase } from '/src/firebaseModelQuiz';

export default {
    setup: function () {
       

        async function startQuiz() {
            
            if (!quizModel.data.region) {
                console.error("No region selected for the quiz.");
                window.location.hash = "#/welcome"; // Redirect if no region
                return;
            }

            // Check if we have existing quiz countries (from saved state)
            if (!quizModel.data.quizCountries || quizModel.data.quizCountries.length === 0 ) {
                await quizModel.loadQuizCountries(quizModel.data.region);
            }
            
        }

        onMounted(async () => {
          
            
                await startQuiz();
            
        });

       

        return function () {
            return <QuizPageView />;
        };
    },
};