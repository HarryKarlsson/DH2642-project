// Quiz page - where the quiz has started

export function QuizPageView(props){
    const textChange = (event) => {
        props.onTextUpdate(event.target.value);
    };

    const handleNotSure = () => {
        props.onNotSure();
    }

    const handleHint = () => {
        props.onHint();
    };

    const handleSubmit = () => {
        props.onSumbit(props.text);
    };

    return (<main>
                <p>In what country is the capital Kuala Lumpur?</p> {/* Example question, need to connect to api */}
                <p>{props.question}</p>  {/* The question, passed from props */}
                <div className="answer-input">
                    <label htmlFor="answer">Type answer:</label>
                    <input
                        type="text"
                        id="answer"
                        value={props.text}
                        onChange={textChange}
                        placeholder="Your answer: "
                    />
                </div>
                <div className="buttons">
                    <button className="not-sure-btn" onClick={handleNotSure}>Not sure</button>
                    <button className="hint-btn" onClick={handleHint}>Hint?</button>
                    <button className="submit-btn" onClick={handleSubmit}>Submit</button>
                </div>
            {/*implement the progress bar in the bottom to let the user know quiz status */}
            </main>
    )
}