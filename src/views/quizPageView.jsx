export function QuizPageView(props) {
    const {
        randomCountry,
        userAnswer,
        setUserAnswer,
        checkAnswer,
        isCorrect,
        showResult,
        nextQuestion,
        score,
        quizCompleted,
        resetQuiz, // Lägg till resetQuiz som prop
    } = props;

    function handleInputChange(event) {
        setUserAnswer(event.target.value);
    }

    return (
        <div>
            <h1>Country Quiz</h1>
            {quizCompleted ? (
                // Visa endast detta när quizet är klart
                <div>
                    <h2>Quiz Completed!</h2>
                    <p>Your final score is: {score} / 9</p>
                    <button onClick={resetQuiz}>Play Again</button> {/* "Play Again"-knapp */}
                </div>
            ) : (
                // Visa quizet om det inte är klart
                <div>
                    <p>Score: {score}</p> {/* Visa användarens poäng */}

                    {randomCountry && (
                        <div>
                            <h2>Guess the country based on its flag!</h2>
                            {randomCountry.flag ? (
                                <img
                                    src={randomCountry.flag}
                                    alt={`Flag of ${randomCountry.name}`}
                                    style={{ width: "150px", marginTop: "10px" }}
                                />
                            ) : (
                                <p>No flag available</p>
                            )}
                            <input
                                type="text"
                                value={userAnswer}
                                onChange={handleInputChange}
                                placeholder="Enter country name"
                                disabled={showResult} // Inaktivera inputfältet efter svar
                            />
                            {!showResult && (
                                <button onClick={checkAnswer}>Submit</button>
                            )}
                            {showResult && (
                                <div>
                                    <p style={{ color: isCorrect ? "green" : "red" }}>
                                        {isCorrect
                                            ? "Correct! 🎉"
                                            : `Wrong! The correct answer was ${randomCountry.name}.`}
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
