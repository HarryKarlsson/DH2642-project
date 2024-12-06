import "../css/welcome.css"

function WelcomeView(){
    return(
        <div>
            <h1 className="main-title">
                Welcome! <span className="globe">🌍</span>
            </h1>
            <div className="button-container">
            <button className="practise-btn">
                Practice
            </button>
            <button className="quiz-btn">
                Quiz
            </button>
            </div>
        </div>

    );
}

export default WelcomeView