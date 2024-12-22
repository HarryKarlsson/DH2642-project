


import { QuizView } from "../views/quizStartView.jsx";
import quizModel from "../quizModel";

function QuizPresenter() {
    let currentRegion = null;

    function onRegionChangeACB(selectedRegion) {
        currentRegion = selectedRegion;
        console.log(`Region changed to: ${currentRegion}`);
    }

    async function handleContinueQuizACB() {

        // reset data first if no data
        quizModel.resetQuiz();
        
        if (!currentRegion) {
            alert("Please select a region before continuing.");
            return;
        }
        

        try {
            // Set the region in quizModel
            await quizModel.setRegion(currentRegion);
            
            // Initialize quiz data for this region
            await quizModel.loadQuizCountries(currentRegion);

            if (!quizModel.data.quizCountries || quizModel.data.quizCountries.length === 0) {
                alert("No countries available for the selected region.");
                return;
            }

            // Set initial question
            quizModel.data.currentQuestion = quizModel.getCurrentQuizQuestion();
            
            if (!quizModel.data.currentQuestion) {
                alert("Failed to generate the first question.");
                return;
            }

            // Navigate to quiz page
            window.location.hash = "#/quiz/page";

        } catch (error) {
            console.error("Failed to continue quiz:", error);
            alert("Failed to start the quiz. Please try again.");
        }
    }

    return (
        <QuizView
            onRegionChange={onRegionChangeACB}
            onContinueQuiz={handleContinueQuizACB}
        />
    );
}

export default QuizPresenter;
