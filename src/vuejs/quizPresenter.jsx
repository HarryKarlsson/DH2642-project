import { QuizView } from "../views/quizStartView.jsx";;

function QuizPresenter(props) {

    function onRegionChangeACB(selectedRegion){
        props.countryModel.setRegion(selectedRegion);
        
    };


        return (
            <QuizView onRegionChange={onRegionChangeACB}
                />
        );
    }
export default QuizPresenter;