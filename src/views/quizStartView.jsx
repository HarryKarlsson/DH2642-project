import "../css/quiz.css";

export function QuizView(props) {
    // Hantera dropdown för att välja region
    function dropdown(event) {
      const selectedRegion = event.target.value;
      console.log(`This region is picked: ${selectedRegion}`);
      props.onRegionChange(selectedRegion);
  }

    // Hantera fortsättning av quiz
    function handleContinueQuizACB() {
        // Hämta quizländer för den valda regionen från modellen
    props.countryModel.loadQuizCountries(props.countryModel.data.region).then(() => {
        // Navigera till quiz-sidan efter att quizländer har laddats
        window.location.hash = "#/quiz/page";
    });
    }

    return (
        <div>
            <main>
                <h2 className="title">Choose region <span className="globe">🌍</span></h2>
                <p className="region-qst">Which region do you want to choose? </p>
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
                    <button className="continue-btn" onClick={handleContinueQuizACB}>Continue</button>
                </div>
            </main>
        </div>
    );
}
