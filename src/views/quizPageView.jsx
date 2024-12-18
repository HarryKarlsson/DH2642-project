import "../css/quiz.css";

export function QuizPageView(props) {
    // Function to update the user's answer
    function textChange(event) {
        const userAnswer = event.target.value;
        props.onTextUpdate(userAnswer); // Pass the answer to the model
    }

    // Handle "Not Sure" button click
    function handleNotSure() {
        console.log("User clicked 'Not Sure'. Moving to the next question.");
        props.onNotSure(); // Call the presenter callback to handle the next question
    }

    // Handle "Hint" button click
    function handleHint() {
        props.onHint(); // Call the presenter callback for a hint
    }

    // Handle the "Submit" button click
    function handleSubmit() {
        props.onSubmit(); // Call the presenter callback to submit the answer
    }

    // Load the current question
    const currentCountry = props.currentCountry;
    if (!currentCountry) {
        return (
            <main>
                <h2 className="title">Loading Quiz... <span className="globe">🌍</span></h2>
                <p>Please wait while the quiz is being set up.</p>
            </main>
        );
    }

    return (
        <main>
            <h2 className="title">Quiz Question <span className="globe">🌍</span></h2>
            <p>Which country has this flag?</p> {/* Render the question */}
            <img 
                src={currentCountry.flag.large} 
                alt={`Flag of ${currentCountry.name}`} 
                className="quiz-flag" 
            />
            <div className="answer-input">
                <label htmlFor="User answer">Type your answer:</label>
                <input
                    type="text"
                    id="User answer"
                    value={props.text}
                    onChange={textChange}
                />
            </div>
            <div className="buttons">
                <button className="not-sure-btn" onClick={handleNotSure}>Not sure</button>
                <button className="hint-btn" onClick={handleHint}>Hint?</button>
                <button className="submit-btn" onClick={handleSubmit}>Submit</button>
            </div>
        </main>
    );
}
