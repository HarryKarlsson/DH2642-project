function QuizPagePresenter(props) {
    // Callback to handle user's text input
    function handleTextUpdate(text) {
        props.countryModel.setUserAnswer(text); // Update the user's answer in the model
    }

    // Callback to handle "Not Sure" button
    function handleNotSure() {
        props.countryModel.nextQuestion(); // Move to the next question
    }

    // Callback to handle "Hint" button
    function handleHint() {
        const currentCountry = props.countryModel.getCurrentQuizCountry();
        if (currentCountry) {
            alert(`Hint: The country's name starts with "${currentCountry.name.charAt(0)}"`);
        }
    }

    // Callback to handle "Submit" button
    function handleSubmit() {
        const isCorrect = props.countryModel.checkAnswer(props.countryModel.data.userAnswer);
        if (isCorrect) {
            alert("Correct!");
            props.countryModel.nextQuestion(); // Move to the next question
        } else {
            alert("Incorrect! Try again.");
        }
    }

    // Get current question data
    const currentCountry = props.countryModel.getCurrentQuizCountry();
    const userAnswer = props.countryModel.data.userAnswer;

    return (
        <QuizPageView
            quizCountries={props.countryModel.data.quizCountries}
            currentCountry={currentCountry}
            text={userAnswer}
            onTextUpdate={handleTextUpdate}
            onNotSure={handleNotSure}
            onHint={handleHint}
            onSubmit={handleSubmit}
        />
    );
}

export default QuizPagePresenter;