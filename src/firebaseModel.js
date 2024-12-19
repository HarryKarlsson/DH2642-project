// firebaseModel.js
import { getDatabase, ref, set, onValue, get } from "firebase/database";
import { app } from "./firebaseApp";

const db = getDatabase(app);

export async function saveToFirebase(model) {
  console.log("Attempting to save model:", model);
 
  if (!model.data.userEmail) {
    console.log("No user email found in model:", model);
    return;
  }
  const replacedEmail = model.data.userEmail.replace(".", ",");
 
  try {
    await set(ref(db, "users/" + replacedEmail), {
      userName: model.data.userName,
      userEmail: model.data.userEmail,
      userScore: model.data.userScore,
      lastUpdated: new Date().toISOString()
    });
    console.log("Successfully saved to Firebase:", {
      path: "users/" + replacedEmail,
      data: {
        userName: model.data.userName,
        userEmail: model.data.userEmail,
        userScore: model.data.userScore
      }
    });
  } catch (error) {
    console.error("Error saving to Firebase:", error);
    throw error;
  }
}

export async function checkIfUserExists(email) {
  if (!email) return false;
 
  const replacedEmail = email.replace(".", ",");
  const userRef = ref(db, "users/" + replacedEmail);
 
  try {
    const snapshot = await get(userRef);
    return snapshot.exists();
  } catch (error) {
    console.error("Error checking user existence:", error);
    return false;
  }
}

// let currentScoreListener = null;

export function connectToFirebase(model, watchFunction) {

  const checkACB = () => {
    return [model.data.userScore];
  };

  const sideEffectACB = async (changedValues) => {
    if (model.data.isSignedIn && model.data.userEmail) {
      console.log("Score changed locally, saving to Firebase");
      await saveToFirebase(model);
    }
  };

  // Set up the watcher for local changes
  watchFunction(checkACB, sideEffectACB);

  // Watch for remote score changes
  if (model.data.isSignedIn && model.data.userEmail) {
    const userRef = ref(db, "users/" + model.data.userEmail.replace(".", ","));

    onValue(userRef, (snapshot) => {
      const remoteScore = snapshot.val().userScore;
      console.log("Remote score changed to:", remoteScore);
      model.setUserScore(remoteScore);
    }
    );
    
    // currentScoreListener = remoteScoreListener;
  }

}

// list of all users in firebase and retrun as list



export async function getAllUsersFromFirebase() {
  const usersRef = ref(db, "users");
  const usersList = [];
  try {
    const snapshot = await get(usersRef);
    snapshot.forEach((childSnapshot) => {
      const user = childSnapshot.val();
      usersList.push(user);
    });
    console.log("Successfully retrieved all users from Firebase:", usersList);
    return usersList;
  } catch (error) {
    console.error("Error retrieving all users from Firebase:", error);
    throw error;
  }
}

// // remove user from firebase
// export async function removeUserFromFirebase(email) {
//   if (!email) return;
//   const replacedEmail = email.replace(".", ",");
//   try {
//     // check if user exists¨
//     const userExists = await checkIfUserExists(email);
//     if (!userExists) {
//       console.log("User does not exist in Firebase:", email);
//       return;
//     }
//     // remove user
//     await set(ref(db, "users/" + replacedEmail), null);
//     console.log("Successfully removed user from Firebase:",
//       "users/" + replacedEmail);
//   }
//   catch (error) {
//     console.error("Error removing user from Firebase:", error);
//     throw error;
//   }
// }
// // firebaseModel.js