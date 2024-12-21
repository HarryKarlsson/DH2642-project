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
        score,
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
                    <p className="scores">Your final score is: {score} / 9</p>
                    <button className="playagain" onClick={resetQuiz}>Play Again</button>
                    <button className="exit" onClick={handleExit}>Exit</button>
                </div>
            ) : (
                <div className="rendering">
                    <h4 className="scores">Score: {score}</h4>

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
                            {!showResult && (<div>
                                <button className="exit" onClick={handleExit}>Exit</button>
                                <button className="submit" onClick={checkAnswer}>Submit</button>
                                <button className="hint" onClick={handleHint}>Hints</button>
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

