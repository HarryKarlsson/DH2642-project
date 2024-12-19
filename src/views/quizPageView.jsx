export function QuizPageView(props) {
    const { randomCountry, userAnswer, setUserAnswer, checkAnswer, isCorrect, showResult } = props;

    function handleInputChange(event) {
        setUserAnswer(event.target.value);
    }

    return (
        <div>
            <h1>Country Quiz</h1>
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
                    />
                    <button onClick={checkAnswer}>Submit</button>
                </div>
            )}

            {showResult && (
                <p style={{ color: isCorrect ? "green" : "red" }}>
                    {isCorrect
                        ? "Correct! 🎉"
                        : `Wrong! The correct answer was ${randomCountry.name}.`}
                </p>
            )}
        </div>
    );
}
