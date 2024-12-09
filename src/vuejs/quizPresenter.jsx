import { QuizView } from "../views/quizStartView";
import { QuizPageView } from "../views/quizPageView";

function QuizPresenter(props) {
    // const currentPage = props.model.currentPage; // Current page state from the model

    function handleRegionSelectionACB(region){
        props.model.setSelectedRegion(region);
    }

    function handleGoBackACB(){
        props.model.setCurrentPage("home");     //Navigate back to homePage - (Practice or quiz)
    }

    function handleContinueACB(){
        props.model.setCurrentPage("quiz");
    }

    function handleTextUpdateACB(newText){      //ACB function
        props.model.setAnswerText(newText);
    }

    function handleSubmitACB(textChange) {
        props.model.submitAnswer(textChange)};

    
    if (currentPage === "start") {
        return (
            <QuizView
                onTypeUpdate={handleRegionSelectionACB}     //handle region selection
                onClickGoBack={handleGoBackACB}             //when clicked go back button this will navigate to homePage
                onclickContinue={handleContinueACB}         //go to quizPage
            />
        );
    }

    if (currentPage === "quiz") {
        return (
            <QuizPageView
                question="In what country is the capital Kuala Lumpur?" //<---- change!
                text={props.model.answerText} // Current answer text from the model
                onTextUpdate={handleTextUpdateACB}
                onNotSure={handleNotSure}
                onHint={handleHint}
                onSubmit={handleSubmitACB}
            />
        );
    }
}

export default QuizPresenter;