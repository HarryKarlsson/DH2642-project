import { getDatabase, ref, set } from "firebase/database";
import ProfileView from '../views/profileView';

function ProfilePresenter() {
    async function handleButtonClick() {
        const randomNumber = Math.floor(Math.random() * 10) + 1;

        try {
            const db = getDatabase();
            await set(ref(db, "model/randomNumber"), randomNumber);
            console.log("Nummer sparat till Firebase:", randomNumber);
        } catch (error) {
            console.error("Fel vid sparning till Firebase:", error);
        }
    }

    return <ProfileView handleButtonClick={handleButtonClick} />;
}

export default ProfilePresenter;
