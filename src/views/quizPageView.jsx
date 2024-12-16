import "../css/quiz.css";
export function QuizPageView(props) {
    const {
        randomCountry,         
        generateRandomCountry, 
        userAnswer,            
        setUserAnswer,       
        checkAnswer,          
        loading,          
        isCorrect,         
        showResult            
    } = props;

    // Funktion för att hantera textinmatning
    function handleInputChange(event) {
        setUserAnswer(event.target.value);
    }

    // Funktion för att hantera Enter (fungerar inte ännu )
    function handleKeyDown(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    }

    return (
        <div>
            {/* Titel */}
            <h1>Random Country Quiz/Next</h1>

            {/* Knapp för att generera ett slumpmässigt land */}
            <button 
                onClick={generateRandomCountry} 
                disabled={loading}
            >
                {loading ? "Loading..." : "Generate Random Country"}
            </button>

            {/* Visa flaggan och inputfältet om ett land har genererats */}
            {randomCountry && (
                <div style={{ marginTop: "20px" }}>
                    {/* Visa flaggan */}
                    {randomCountry.flag ? (
                        <img
                            src={randomCountry.flag}
                            alt="Country flag"
                            style={{ width: "150px", marginTop: "10px" }}
                        />
                    ) : (
                        <p>Flag not available</p>
                    )}

                    {/* Inputfält för att skriva in svar */}
                    <div style={{ marginTop: "20px" }}>
                        <input
                            type="text"
                            value={userAnswer} 
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown} 
                            placeholder="Enter country name"
                        />
                        <button onClick={checkAnswer}>Submit</button>
                    </div>
                </div>
            )}

            {/* Visa resultatet efter att användaren har svarat */}
            {showResult && (
                <p style={{ marginTop: "10px", color: isCorrect ? "green" : "red" }}>
                    {isCorrect
                        ? "Correct! 🎉"
                        : `Wrong! The correct answer was ${randomCountry.name}.`}
                </p>
            )}

            {/* Visa meddelande om inget land har valts ännu */}
            {!randomCountry && !loading && (
                <p>No country selected yet. Click the button above!</p>
            )}
        </div>
    );
}
