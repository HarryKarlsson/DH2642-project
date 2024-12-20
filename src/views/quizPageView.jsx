import userModel from "/src/userModel";

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
    } = props;

    function handleInputChange(event) {
        setUserAnswer(event.target.value);
    }

    return (
        <div>
            <h1>Country Quiz</h1>
            {quizCompleted ? (
                <div>
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
                                <button 
                                onClick={() => {
                                    userModel.compareScore(userModel.data.quizScore, userModel.data.userScore);
                                    checkAnswer();
                                }}
                                >Submit</button>
                            )}
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
