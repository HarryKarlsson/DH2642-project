// firebaseModel.js
import { getDatabase, ref, set, onValue, get } from "firebase/database";
import { app } from "./firebaseConfig";
import userModel from "/src/userModel";


const db = getDatabase(app);



export async function updateStateToFirebase(state) {
  if (!userModel.data.isSignedIn || !userModel.data.userEmail) return;

  const replacedEmail = userModel.data.userEmail.replaceAll(".", ",");
  try {
    await set(ref(db, `users/${replacedEmail}/userState`), state);
    console.log("Quiz state saved to Firebase:", state);
  } catch (error) {
    console.error("Error saving quiz state to Firebase:", error);
    throw error;
  }

}

export async function loadStateFromFirebase() {
  if (!userModel.data.isSignedIn || !userModel.data.userEmail) return null;

  try {
      const replacedEmail = userModel.data.userEmail.replaceAll(".", ",");
      const snapshot = await get(ref(db, `users/${replacedEmail}/userState`));
      
      if (snapshot.exists()) {
          const savedState = snapshot.val();
          userModel.data.userState = savedState;
          userModel.data.quizScore = savedState.quizScore ;
          console.log("Quiz state loaded from Firebase");
          return savedState;
      }
      return null;
  } catch (error) {
      console.error("Error loading quiz state from Firebase:", error);
      return null;
  }
}

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
      userState: model.data.userState,
      lastUpdated: new Date().toISOString()
    });
    console.log("Successfully saved to Firebase:", {
      path: "users/" + replacedEmail,
      data: {
        userName: model.data.userName,
        userEmail: model.data.userEmail,
        userScore: model.data.userScore,
        userState: model.data.userState
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
    return [model.data.userScore, model.data.userState];
  };

  const sideEffectACB = async (changedValues) => {
    if (changedValues.includes(model.data.userScore) || changedValues.includes(model.data.userState)) {
      console.log("Score changed locally, saving to Firebase");
      //await saveToFirebase(model);
      fireBaseUpdatescore(model.data.userEmail, model.data.userScore, model.data.userState);
    }
  };

  // Set up the watcher for local changes
  watchFunction(checkACB, sideEffectACB);

  // Watch for remote score changes
  if (model.data.isSignedIn && model.data.userEmail) {
    const userRef = ref(db, "users/" + model.data.userEmail.replaceAll(".", ","));

    onValue(userRef, (snapshot) => {
      const remoteScore = snapshot.val().userScore;
      // add null check
      if (remoteScore === null) {
        return;
      }
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
async function fireBaseUpdatescore(email, score, state) {

// if (score < 0) { score = 0; }
  const replacedEmail = email.replaceAll(".", ",");
  set(ref(db, "users/" + replacedEmail + "/userScore"), score);
  set(ref(db, "users/" + replacedEmail + "/userState"), state);
  console.log("Score updated in Firebase for user:", email + " to " + score + " and state: " + state);
}


export async function getDefaultScore() {
  const defaultList = [];
  const defaultScore = await get(ref(db, "highScore"));
  // push all parameters to the list
  defaultList.push(defaultScore.val().userName);
  defaultList.push(defaultScore.val().userScore);
  console.log("Default score is:", defaultList);
  return defaultList;
}

export async function getAllUsersFromFirebase() {
  const usersRef = await get(ref(db, "users"));
  const usersList = [];
  
  try {
    // Combine user data with their high scores
    usersRef.forEach((childSnapshot) => {
      const childData = childSnapshot.val();
      usersList.push({
        userName: childData.userName,
        userEmail: childData.userEmail,
        userScore: childData.userScore,
      });
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
  // delet the existing high score
  const highScoreRef = ref(db, "highScore");
  await set(ref(db, "highScore"), null);

  // if the path is exist then return
  //const snapshot = await get(ref(db, "highScore"));
  // if (snapshot.exists()) {
  //   console.log("High score already exists in Firebase");
  //   return;
  // }
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
  try {
    // Get users and default high score
    const listOfUsers = await getAllUsersFromFirebase();
    const defaultScore = await getDefaultScore();
    let highestScoreProfile = [];

    // Check if we have any users
    if (listOfUsers && listOfUsers.length > 0) {
      // Sort users by score in descending order
      listOfUsers.sort((a, b) => b.userScore - a.userScore);
      const highestUser = listOfUsers[0];
      
      // Compare highest user score with default score
      if (highestUser.userScore > defaultScore[1]) {
        // User has higher score than default/current high score
        await changeTheHighestScore(highestUser.userScore, highestUser.userName);
        highestScoreProfile = [highestUser.userName, highestUser.userScore];
        console.log(`New highest score: ${highestUser.userScore} by ${highestUser.userName}`);
      } else {
        // Default/current score is still higher
        highestScoreProfile = defaultScore;
        console.log(`Current highest score remains: ${defaultScore[1]} by ${defaultScore[0]}`);
      }
    } else {
      // No users, return default score
      highestScoreProfile = defaultScore;
      console.log(`Using default high score: ${defaultScore[1]} by ${defaultScore[0]}`);
    }

    console.log("Highest score profile:", highestScoreProfile);
    return highestScoreProfile;
  } catch (error) {
    console.error("Error getting highest score:", error);
    throw error;
  }
}

async function changeTheHighestScore(newScore, userName) {
  await set(ref(db, "highScore/userScore"), newScore);
  await set(ref(db, "highScore/userName"), userName);
  console.log("Highest score updated in Firebase to:", newScore + " by " + userName);

}
export async function resetScores() {
  // reset users scores to 0
  const usersRef = await get(ref(db, "users"));
  usersRef.forEach((childSnapshot) => {
    const childData = childSnapshot.val();
    set(ref(db, "users/" + childData.userEmail.replaceAll(".", ",") + "/userScore"), 0);
  });


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