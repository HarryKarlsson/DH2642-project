import "../css/quiz.css";

export function QuizView(){

    const dropdown = (myEvent) => {
        props.onTypeUpdate(myEvent.target.value);
    }
    //const [selectedRegion, setSelectedRegion] = useState("all");
  
    const handleGoBack = () => {
      // Button for navigating back to mainpage
      props.onClickGoBack();
    };
  
    const handleContinueQuiz = () => {
      // Button for continue the quiz, after selecting region
      props.onclickContinue();
    };
  
    return ( <div>
      <main>
        <h2 className="title">Choose region </h2>
        <div className="dropdown-section">
          <p>Which region do you want to choose? </p>  {/*Frågan - vilken region vill du välja*/}
          <select className="dropdown">
            <option value="all">All regions</option>
            <option value="random">Random</option>
            <option value="europe">Europe</option>
            <option value="asia">Asia</option>
            <option value="north america">North America</option>
            <option value="south america">South America</option>
            <option value="africa">Africa</option>
            <option value="oceania">Oceania</option>
          </select>
        </div>
        <div className="buttons">
          <button  className="back-btn"> Back </button>
          <button  className="continue-btn"> Continue </button>
        </div>
      </main>
    </div>
    );
  };