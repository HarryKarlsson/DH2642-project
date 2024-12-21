import userModel from "/src/userModel";
import "../css/quiz.css";
import quizModel from "/src/quizModel";

export function QuizPageView() {
    function handleInputChange(event) {
        quizModel.setUserAnswer(event.target.value);
    }

    function handleSubmit() {
        userModel.compareScore(userModel.data.quizScore, userModel.data.userScore);
        quizModel.checkAnswer(quizModel.data.userAnswer);
    }

    return (
        <div className="quiz-container">
            {quizModel.data.loading ? (
                <div>Loading quiz...</div>
            ) : (
                <>
                    <h1 className="quiz-title">Country Quiz <span className="globe">🌍</span></h1>
                    
                    {quizModel.data.showExitPopup && (
                        <div className="overlay">
                            <div className="popup">
                                <h3>Are you sure you want to exit the quiz?</h3>
                                <button className="yes-exit" onClick={() => quizModel.yesExit()}>Yes, Exit</button>
                                <button className="no-exit" onClick={() => quizModel.noExit()}>No, Stay</button>
                            </div>
                        </div>
                    )}
                    
                    {quizModel.data.quizCompleted ? (
                        <div className="quiz-completed">
                            <h2>Quiz Completed!</h2>
                            <p>Your final score is: {userModel.getQuizScore()} / 9</p>
                            <button onClick={() => quizModel.resetQuiz()}>Play Again</button>
                        </div>
                    ) : (
                        <div>
                            <p>Score: {userModel.getQuizScore()}</p>

                            {quizModel.data.currentQuestion && (
                                <div>
                                    <h2>{quizModel.data.currentQuestion.question}</h2>
                                    {quizModel.data.currentQuestion.type === "flag" && 
                                     quizModel.data.currentQuestion.image && (
                                        <img
                                            src={quizModel.data.currentQuestion.image}
                                            alt="Country flag"
                                            style={{ width: "150px", marginTop: "10px" }}
                                        />
                                    )}
                                    
                                    {quizModel.data.currentQuestion.type === "capital" && (
                                        <p>{quizModel.data.currentQuestion.question}</p>
                                    )}
                                    
                                    <input
                                        type="text"
                                        value={quizModel.data.userAnswer}
                                        onChange={handleInputChange}
                                        placeholder="Enter your answer"
                                        disabled={quizModel.data.showResult}
                                    />

                                    {!quizModel.data.showResult && (
                                        <div> 
                                            <button onClick={handleSubmit}>Submit</button>
                                            <button onClick={() => quizModel.handleHint()}>Hints</button>
                                            <button onClick={() => quizModel.handleExit()}>Exit</button>
                                        </div>
                                    )}
                                    
                                    {quizModel.data.hint && (
                                        <p style={{ color: "blue", marginTop: "10px" }}>
                                            {quizModel.data.hint}
                                        </p>
                                    )}
                                    
                                    {quizModel.data.showResult && (
                                        <div>
                                            <p style={{ color: quizModel.data.isCorrect ? "green" : "red" }}>
                                                {quizModel.data.isCorrect
                                                    ? "Correct! 🎉"
                                                    : `Wrong! The correct answer was ${quizModel.data.currentQuestion.answer}.`}
                                            </p>
                                            <button onClick={() => quizModel.nextQuestion()}>Next Question</button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}