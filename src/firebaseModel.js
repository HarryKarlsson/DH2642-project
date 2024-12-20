// firebaseModel.js
import { getDatabase, ref, set, onValue, get } from "firebase/database";
import { app } from "./firebaseConfig";
import userModel from "/src/userModel";


const db = getDatabase(app);

export async function saveToFirebase(model) {
  console.log("Attempting to save model:", model);
 
  if (!model.data.userEmail) {
    console.log("No user email found in model:", model);
    return;
  }
  const replacedEmail = model.data.userEmail.replaceAll(".", ",");

  
 
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
 
  const replacedEmail = email.replaceAll(".", ",");
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
    if (changedValues.includes(model.data.userScore)) {
      console.log("Score changed locally, saving to Firebase");
      //await saveToFirebase(model);
      fireBaseUpdatescore(model.data.userEmail, model.data.userScore);
    }
  };

  // Set up the watcher for local changes
  watchFunction(checkACB, sideEffectACB);

  // Watch for remote score changes
  if (model.data.isSignedIn && model.data.userEmail) {
    const userRef = ref(db, "users/" + model.data.userEmail.replaceAll(".", ","));

    onValue(userRef, (snapshot) => {
      const remoteScore = snapshot.val().userScore;
      console.log("Remote score changed to:", remoteScore);
      if (remoteScore < 0){
        remoteScore = 0;
      }
      model.setUserScore(remoteScore);
    }
    );
    
    // currentScoreListener = remoteScoreListener;
  }

}

//update just score
async function fireBaseUpdatescore(email, score) {

if (score < 0) { score = 0; }
  const replacedEmail = email.replaceAll(".", ",");
  set(ref(db, "users/" + replacedEmail + "/userScore"), score);
  console.log("Score updated in Firebase for user:", email + " to " + score);
}



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


// handel highest score default is 3

export async function setUppDefaultHighScore(score) {
  // if the path is exist then return
  const snapshot = await get(ref(db, "highScore"));
  if (snapshot.exists()) {
    console.log("High score already exists in Firebase");
    return;
  }
  const highestScore = score;
  const defaultUser = "defaultUser";
  const defaultEmail = "defaultEmail";
  const path = "highScore";
  try {
    await set(ref(db, path), {
      userName: defaultUser,
      userEmail: defaultEmail,
      userScore: highestScore,
      lastUpdated: new Date().toISOString()
    });
    console.log("Successfully saved to Firebase:", { path, data: { userName: defaultUser, userEmail: defaultEmail, userScore: highestScore } });
  } catch (error) {
    console.error("Error saving to Firebase:", error);
    throw error;
  }
}

// compare the highest score with the user score
export async function getHighestScore() {
  const highestScoreProfile = [];
  const fireBaseHighScore = await get(ref(db, "highScore"));
  const listOfUsers = await getAllUsersFromFirebase();
  // sort the list of users by score
  listOfUsers.sort((a, b) => b.userScore - a.userScore);
  // get the highest score
  const highestScore = listOfUsers[0].userScore;
  const userName = listOfUsers[0].userName;
  // compare the highest score
  if (compareHighestScore(highestScore, userName)) {
     changeTheHighestScore(highestScore, userName);
    highestScoreProfile.push(userName);
    highestScoreProfile.push(highestScore);
  }
  else {
    highestScoreProfile.push(fireBaseHighScore.val().userName);
    highestScoreProfile.push(fireBaseHighScore.val().userScore);
  }
  return highestScoreProfile;
  
}

export async function changeTheHighestScore(newScore, userName) {
  await set(ref(db, "highScore/userScore"), newScore);
  await set(ref(db, "highScore/userName"), userName);
  console.log("Highest score updated in Firebase to:", newScore + " by " + userName);

}

export async function compareHighestScore(userScore, userName) {
  const highestScore = await get(ref(db, "highScore/userScore"));
  if (userScore > highestScore) {
    return true;
  }
  return false;
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