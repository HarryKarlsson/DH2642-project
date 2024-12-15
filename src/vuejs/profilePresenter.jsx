import { getDatabase, ref, set, get } from "firebase/database";
import ProfileView from '../views/profileView';


//Fixa console.log sen så att dem blir på engelska 
function ProfilePresenter() {
    async function handleButtonClick() {
        const randomNumber = Math.floor(Math.random() * 10) + 1;
        const db = getDatabase();
        const modelRef = ref(db, "model/randomNumber");

        const snapshot = await get(modelRef);
        const currentNumber = snapshot.exists() ? snapshot.val() : null;

        if (currentNumber === null || randomNumber > currentNumber) {
            await set(modelRef, randomNumber);
            console.log("Nummer sparat till Firebase:", randomNumber);
        } else {
            console.log("Nummer sparades inte, eftersom det var mindre än eller lika med det befintliga:", currentNumber);
        }
    }

    return <ProfileView handleButtonClick={handleButtonClick} />;
}

export default ProfilePresenter;
