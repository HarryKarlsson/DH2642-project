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
        quizModel.handleSubmitPopup();
    }

    const currentProgress = quizModel.data.currentQuizIndex;

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
                    
                    {quizModel.data.showSubmitPopup && quizModel.data.showResult && (
                        <div className="overlay">
                            <div className="popup">
                                <h2>
                                    {quizModel.data.isCorrect ? "Correct! 🎉" : "Wrong! 😢"}
                                </h2>
                                {!quizModel.data.isCorrect && (
                                    <p>
                                        The correct answer was: <strong>{quizModel.data.currentQuestion.answer}</strong>

                                    </p>
                                )}
                                <button className="next-btn" onClick={() => quizModel.closeSubmitPopup()}>Next Question</button>
                            </div>
                        </div>
                    )}
                    
                    {quizModel.data.quizCompleted ? (
                        <div className="quiz-completed">
                            <h2>Quiz Completed!</h2>
                            <p>Your final score is: {userModel.getQuizScore()} / 10</p>
                            <button onClick={() => quizModel.resetQuiz()}>Play Again</button>
                        </div>
                    ) : (
                        <div>
                            <p className="scores">Score: {userModel.getQuizScore()}</p>
                            {quizModel.data.hint && (
                                        <p className="hint">
                                            {quizModel.data.hint}
                                        </p>
                                    )}

                            {quizModel.data.currentQuestion && (
                                <div className="rendering">
                                    <h2>{quizModel.data.currentQuestion.question}</h2>
                                    {quizModel.data.currentQuestion.type === "flag" && 
                                     quizModel.data.currentQuestion.image && (
                                        <img
                                            src={quizModel.data.currentQuestion.image}
                                            alt="Country flag"
                                            style={{ width: "150px", marginTop: "10px" }}
                                        />
                                    )}
                                    
                                   
                                    
                                    <input 
                                        type="text"
                                        value={quizModel.data.userAnswer}
                                        onChange={handleInputChange}
                                        placeholder="Enter your answer"
                                        disabled={quizModel.data.showResult}
                                    />

                                    {!quizModel.data.showResult && (
                                        <div className="button-group"> 
                                            <button className="submit-btn" onClick={handleSubmit}>Submit</button>
                                            <button className="hint-btn" onClick={() => quizModel.handleHint()}>Hints</button>
                                            <button className = "exit-btn" onClick={() => quizModel.handleExit()}>Exit</button>
                                        </div>
                                    )}
                                    
                                   
                                </div>
                            )}
                        </div>
                    )}

                    <div className="progress-bar-container">
                        <progress
                            className="progress-bar"
                            value={currentProgress}
                            max={quizModel.data.maxQuestions}
                        />
                        <p>{currentProgress } / {quizModel.data.maxQuestions} completed</p>
                    </div>
                </>
            )}
        </div>
    );
}