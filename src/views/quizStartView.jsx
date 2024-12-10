import "../css/quiz.css";
export function QuizView(){

    const dropdown = (myEvent) => {
        props.onTypeUpdate(myEvent.target.value);
    }
  
    const handleGoBackACB = () => {
      // Button for navigating back to mainpage
      window.location.hash = "#/";
    };
  
    const handleContinueQuizACB = () => {
      // Button for continue the quiz, after selecting region
      window.location.hash = "#/quiz/page";
    };
  
    return ( <div>
      <main>
        <h2 className="title">Choose region <span className="globe">🌍</span></h2>
          <p className="region-qst">Which region do you want to choose? </p>  {/*Frågan - vilken region vill du välja*/}
          <select className="dropdown" onChange={dropdown}>
            <option value="all">All regions</option>
            <option value="random">Random</option>
            <option value="europe">Europe</option>
            <option value="asia">Asia</option>
            <option value="north america">North America</option>
            <option value="south america">South America</option>
            <option value="africa">Africa</option>
            <option value="oceania">Oceania</option>
          </select>
        <div className="buttons">
          <button  className="back-btn" onClick={handleGoBackACB}> Back </button>
          <button  className="continue-btn" onClick={handleContinueQuizACB}> Continue </button>
        </div>
      </main>
    </div>
    );
  };