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
                <p>{props.question}</p>  {/* The question, passed from props */}
                <div className="answer-input">
                    <label htmlFor="User answer">Type answer:</label>
                    <input
                        type="text"
                        id="User answer"
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
            {/*TODO implement the progress bar in the bottom to let the user know quiz status */}
            </main>
    )
}