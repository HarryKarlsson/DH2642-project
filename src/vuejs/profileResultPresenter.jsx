import ProfileResultView from '../views/profileResultViewm';
import { ref } from "vue";
import { connectToFirebase } from "../firebaseModel";

export default function ProfileResultPresenter() { 
    const model = {
        randomNumber: null, 
        ready: false, 
    };

    const randomNumber = ref(null); 
    const errorMessage = ref(""); 

    function updateView() {
        if (model.ready) {
            console.log("Modellen har uppdaterats från Firebase:", model);
            randomNumber.value = model.randomNumber; 
        } else {
            errorMessage.value = "Modellen är inte redo.";
        }
    }

    connectToFirebase(model, updateView);

    return (
        <ProfileResultView
            randomNumber={randomNumber.value}
            errorMessage={errorMessage.value}
        />
    );
}
