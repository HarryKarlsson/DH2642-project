
import userModel from "/src/userModel";

import "../css/quiz.css";


export function QuizPageView(props) {
    const {
        currentQuestion,
        userAnswer,
        setUserAnswer,
        checkAnswer,
        isCorrect,
        showResult,
        nextQuestion,
        quizCompleted,
        resetQuiz,
        handleHint,
        hint,
        yesExit,
        showExitPopup,
        noExit,
        handleExit,
    } = props;



    function handleInputChange(event) {
        setUserAnswer(event.target.value);
    }

    return (
        <div className="quiz-container">
            <h1 className="quiz-title">Country Quiz <span className="globe">🌍</span></h1>
            {showExitPopup && (
            <div className="overlay">
                <div className="popup">
                    <h3>Are you sure you want to exit the quiz?</h3>
                    <button className="yes-exit" onClick={yesExit}>Yes, Exit</button>
                    <button className="no-exit" onClick={noExit}>No, Stay</button>
                </div>
            </div>)}
            {quizCompleted ? (
                <div className="quiz-completed">
                    <h2>Quiz Completed!</h2>

                    <p>Your final score is: {userModel.getQuizScore()} / 9</p>
                    <button onClick={resetQuiz}>Play Again</button>
                </div>
            ) : (
                <div>
                    <p>Score: {userModel.getQuizScore()}</p>


                    {currentQuestion && (
                        <div>
                            <h2>{currentQuestion.question}</h2>
                            {currentQuestion.type === "flag" && currentQuestion.image && (
                                <img
                                    src={currentQuestion.image}
                                    alt="Country flag"
                                    style={{ width: "150px", marginTop: "10px" }}
                                />
                            )}
                            {currentQuestion.type === "capital" && (
                                <p>{currentQuestion.question}</p>
                            )}
                            <input
                                type="text"
                                value={userAnswer}
                                onChange={handleInputChange}
                                placeholder="Enter your answer"
                                disabled={showResult}
                            />

                            {!showResult && (
                                <div> 
                                <button 
                                onClick={() => {
                                    userModel.compareScore(userModel.data.quizScore, userModel.data.userScore);
                                    checkAnswer();
                                }}
                                >Submit</button>
                                <button onClick={handleHint}>Hints</button>
                                <button onClick={handleExit}>Exit</button>
                                </div>

                            )}
                            
                            {hint && <p style={{ color: "blue", marginTop: "10px" }}>{hint}</p>}
                            {showResult && (
                                <div>
                                    <p style={{ color: isCorrect ? "green" : "red" }}>
                                        {isCorrect
                                            ? "Correct! 🎉"
                                            : `Wrong! The correct answer was ${currentQuestion.answer}.`}
                                    </p>
                                    <button onClick={nextQuestion}>Next Question</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

