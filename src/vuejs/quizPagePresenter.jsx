import { onMounted } from "vue";
import { QuizPageView } from "/src/views/quizPageView";
import quizModel from "/src/quizModel";
import userModel from "/src/userModel";
import { loadStateFromFirebase } from '/src/firebaseModel';

export default {
    setup: function () {
        async function restoreQuizState() {
            try {
                const savedState = await loadStateFromFirebase();
                if (savedState && savedState.path === "#/quiz/page") {
                    console.log("Restoring saved quiz state:", savedState);
                    
                    // Restore quiz model state
                    quizModel.data.region = savedState.region;
                    quizModel.data.quizCountries = savedState.quizCountries;
                    quizModel.data.currentQuizIndex = savedState.currentQuizIndex;
                    quizModel.data.questionType = savedState.questionType;
                    quizModel.data.currentQuestion = savedState.currentQuestion;
                    quizModel.data.quizCompleted = savedState.quizCompleted;
                    quizModel.data.hint = savedState.hint;
                    
                    // Restore quiz score
                    if (savedState.quizScore !== undefined) {
                        userModel.setQuizScore(savedState.quizScore);
                    }
                    
                    return true;
                }
                return false;
            } catch (error) {
                console.error("Error restoring quiz state:", error);
                return false;
            }
        }

        async function startQuiz() {
            if (!quizModel.data.region) {
                console.error("No region selected for the quiz.");
                window.location.hash = "#/welcome"; // Redirect if no region
                return;
            }

            
            await quizModel.loadQuizCountries(quizModel.data.region);
            quizModel.saveQuizState(); // Save initial state
        }

        onMounted(async () => {
            const restored = await restoreQuizState();
            if (!restored) {
                await startQuiz();
            }
        });

        // Save state before unload
        window.addEventListener('beforeunload', () => {
            quizModel.saveQuizState();
        });

        return function () {
            return <QuizPageView />;
        };
    },
};