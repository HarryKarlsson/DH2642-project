import { QuizView } from "../views/quizStartView.jsx";
import countryModel from "../countryModel";

function QuizPresenter(props) {
    let currentRegion = null;

    function onRegionChangeACB(selectedRegion) {
        currentRegion = selectedRegion;
        console.log(`Region changed to: ${currentRegion}`);
    }
    
    function nextQuestion() {
        countryModel.nextQuestion(); // Uppdatera frågan i modellen
        state.randomCountry = countryModel.getCurrentQuizCountry(); // Uppdatera vyn med den nya frågan
        state.showResult = false; // Dölj resultatet
        state.userAnswer = ""; // Nollställ användarens svar
    }
    

  function handleContinueQuizACB() {
    if (!currentRegion) {
        alert("Please select a region before continuing.");
        return;
    }

    countryModel
        .setRegion(currentRegion)
        .then(() => {
            console.log("Region set and countries loaded:", countryModel.data.countryNames);
            if (!countryModel.data.countryData || countryModel.data.countryData.length === 0) {
                alert("No countries available for the selected region.");
                return;
            }

            // Navigera till quizsidan
            window.location.hash = "#/quiz/page";

            // Generera första landet för quizet
            generateRandomCountry();
        })
        .catch((error) => {
            console.error("Failed to continue quiz:", error);
        });
}

    

function generateRandomCountry() {
    if (!countryModel.data.countryData || countryModel.data.countryData.length === 0) {
        console.error("No countries loaded for this region.");
        alert("No countries are available. Please select a valid region.");
        return;
    }

    const randomIndex = Math.floor(Math.random() * countryModel.data.countryData.length);
    const randomCountry = countryModel.data.countryData[randomIndex];

    if (!randomCountry || !randomCountry.flag) {
        console.error("Invalid country data or no flag available:", randomCountry);
        alert("Failed to generate a country. Try again.");
        return;
    }

    countryModel.data.randomCountry = {
        name: randomCountry.name,
        flag: randomCountry.flag,
    };

    console.log("Generated random country:", countryModel.data.randomCountry);
}


    

    return (
        <QuizView
            onRegionChange={onRegionChangeACB}
            onContinueQuiz={handleContinueQuizACB}
        />
    );
    
}

export default QuizPresenter;
