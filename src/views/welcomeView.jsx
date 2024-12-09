import "../css/welcome.css"

function WelcomeView(){

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
                Welcome! <span className="globe">🌍</span>
            </h1>
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