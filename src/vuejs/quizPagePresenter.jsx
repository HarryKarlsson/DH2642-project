
import { reactive, onMounted } from "vue";
import { QuizPageView } from "../views/quizPageView";
import countryModel from "../countryModel";

export default {
    setup: function() {
       
        const state = reactive({
            randomCountry: null, 
            loading: false,      
            userAnswer: "",      
            isCorrect: false,
            showResult: false   
        });


        // Funktion för att generera ett nytt slumpmässigt land
        function generateRandomCountry() {
            state.loading = true; 

            countryModel.fetchRandomCountry().then(function() {
                state.randomCountry = countryModel.data.randomCountry;
                console.log("Generated country:", state.randomCountry);
//Här ska man säkert spara sen tills poäng eller liknande
                state.loading = false;   
                state.userAnswer = "";   
                state.showResult = false; 
            }).catch(function(error) {
                console.error("Failed to fetch country:", error);
                state.loading = false;
            });
        }

        
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
//För mig att se men ta bort sen kanske??
            console.log("User Answer:", state.userAnswer);
            console.log("Correct Answer:", state.randomCountry.name);
            console.log("Is Correct:", state.isCorrect);
        }

     //Den ska ju köras när man klickar på knappen men jag vill bara testa 
        onMounted(function() {
            generateRandomCountry();
        });

    
        return function() {
            return (
                <QuizPageView
                    randomCountry={state.randomCountry}
                    generateRandomCountry={generateRandomCountry}
                    userAnswer={state.userAnswer}
                    setUserAnswer={setUserAnswer}
                    checkAnswer={checkAnswer}
                    loading={state.loading}
                    isCorrect={state.isCorrect}
                    showResult={state.showResult}
                />
            );
        };
    }
};
