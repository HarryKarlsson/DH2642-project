import "../css/welcome.css"
import userModel from "/src/userModel";
import countryModel from "/src/countryModel";
function WelcomeView(){

    const highScoreData = (userModel.data.userScore / countryModel.data.maxQuestions) * 100;

    function practiceButtonACB() {
        console.log("Practice button was clicked");
        window.location.hash = "#/practice"; 
    }

    function quizButtonACB() {
        console.log("Welcome button was clicked"); 
        window.location.hash = "#/quiz"; 
    }


    return(
        <div>
            <h1 className="main-title">
                Welcome, {userModel.data.userName}! <span className="globe">🌍</span>

            </h1>
            <p>Your highscore is: {highScoreData}</p>
            <div className="button-container">
            <button onClick={practiceButtonACB} className="practise-btn">
                Practice
            </button>
            <button onClick={quizButtonACB} className="quiz-btn">
                Quiz
            </button>
            </div>

            
        </div>

    );
}

export default WelcomeView