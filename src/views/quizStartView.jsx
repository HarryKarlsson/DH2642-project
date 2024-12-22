import "../css/quiz.css";
import "../css/practice.css"

export function QuizView(props) {
    function dropdown(event) {
        const selectedRegion = event.target.value;
        console.log(`This region is picked: ${selectedRegion}`);
        props.onRegionChange(selectedRegion);
    }

    return (
        <div>
            <main>
                <h1 className="main-title">Choose region <span className="globe">🌍</span></h1>
                    <p className="region-qst">Which region do you want to choose?</p>
                    <select className="dropdown" onChange={dropdown}>
                        <option value="" disabled selected>
                            Select a region
                        </option>
                        <option value="europe">Europe</option>
                        <option value="asia">Asia</option>
                        <option value="africa">Africa</option>
                        <option value="americas">Americas</option>
                    </select>
                    <div>
                        <button className="continue-btn" onClick={props.onContinueQuiz}>
                            Start quiz
                        </button>
                    </div> 
            </main>
        </div>
    );
}
