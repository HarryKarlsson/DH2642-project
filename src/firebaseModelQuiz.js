

import { getDatabase, ref, set, onValue, get } from "firebase/database";
import { app } from "./firebaseConfig";
import userModel from "/src/userModel";
import quizModel from "/src/quizModel";  // Add this import

const db = getDatabase(app);


export async function saveStateToFirebase(state) {
  if (!userModel.data.isSignedIn || !userModel.data.userEmail) return;
  const replacedEmail = userModel.data.userEmail.replaceAll(".", ",");
  await set(ref(db, `users/${replacedEmail}/quizState`), state);
  console.log("userState updated in Firebase for user:", userModel.data.userEmail);
}
export async function firBaseUpdateData(quizeModel) {

  const replacedEmail = userModel.data.userEmail.replaceAll(".", ",");
  set(ref(db, "users/" + replacedEmail + "/quizState"), quizeModel.data);
  console.log("Quiz state updated in Firebase for user:", userModel.data.userEmail);
}

// firebaseModelQuiz.js
export async function connectToFirebaseQuiz(quizModel, watch) {
  // Use userModel for auth checks instead
  if (!userModel.data.isSignedIn || !userModel.data.userEmail) return;
  
  const replacedEmail = userModel.data.userEmail.replaceAll(".", ",");
  
  // Setup watch to track specific properties
  const checkACB = () => {
    return [
      quizModel.data.region,
      quizModel.data.quizCountries,
      quizModel.data.currentQuizIndex,
      quizModel.data.questionType,
      quizModel.data.currentQuestion,
      quizModel.data.quizCompleted,
      quizModel.data.userAnswer,
      quizModel.data.isCorrect,
      quizModel.data.showResult,
      quizModel.data.hint,
      quizModel.data.isEnded
    ];
  };

  const sideEffectACB = async (changedValues, oldValues) => {
    console.log("Quiz state changed, saving to Firebase");
    await firBaseUpdateData(quizModel);
  };

  watch(checkACB, sideEffectACB);

  // Watch for remote changes
  const userRef = ref(db, `users/${replacedEmail}/quizState`);
  onValue(userRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      // Carefully update each property
      Object.keys(data).forEach(key => {
        if (key in quizModel.data) {
          quizModel.data[key] = data[key];
        }
      });
      console.log("Updated quiz state from Firebase:", data);
    }
  });
}


export async function loadStateFromFirebase() {
  if (!userModel.data.isSignedIn || !userModel.data.userEmail) return null;
  
  try {
      const replacedEmail = userModel.data.userEmail.replaceAll(".", ",");
      const snapshot = await get(ref(db, `users/${replacedEmail}/quizState`));
      
      if (snapshot.exists()) {
          const savedState = snapshot.val();
          
          // Don't assign directly to quizModel.data
          // Instead, update each property individually to maintain reactivity
          Object.keys(savedState).forEach(key => {
              if (key in quizModel.data) {
                  quizModel.data[key] = savedState[key];
              }
          });
          
          console.log("Quiz state loaded from Firebase:", savedState);
          return {
              // Return the specific properties the restore function expects
              path: "#/quiz/page",
              region: savedState.region,
              quizCountries: savedState.quizCountries,
              currentQuizIndex: savedState.currentQuizIndex,
              questionType: savedState.questionType,
              currentQuestion: savedState.currentQuestion,
              quizCompleted: savedState.quizCompleted,
              hint: savedState.hint,
              quizScore: savedState.quizScore,
              isCorrect: savedState.isCorrect,
              showResult: savedState.showResult,
              userAnswer: savedState.userAnswer,
              isEnded: savedState.isEnded
          };
      }
      return null;
  } catch (error) {
      console.error("Error loading quiz state from Firebase:", error);
      return null;
  }
}

