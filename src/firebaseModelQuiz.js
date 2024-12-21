import { getDatabase, ref, set, onValue, get } from "firebase/database";
import { app } from "./firebaseConfig";

const db = getDatabase(app);

// Firebase Path for Quiz Data
const QUIZ_PATH = "quizStates/";

// Model to Persistence Conversion
export function modelToPersistenceQuiz(model) {
  return {
    userEmail: model.data.userEmail,
    userScore: model.data.userScore,
    currentQuestion: model.data.currentQuestion,
    userAnswer: model.data.userAnswer,
    isCorrect: model.data.isCorrect,
    quizCompleted: model.data.quizCompleted,
    showResult: model.data.showResult,
    hint: model.data.hint,
  };
}

// Persistence to Model Conversion
export function persistenceToModelQuiz(dataFromPersistence, model) {
  model.data.userEmail = dataFromPersistence?.userEmail || null;
  model.data.userScore = dataFromPersistence?.userScore || 0;
  model.data.currentQuestion = dataFromPersistence?.currentQuestion || null;
  model.data.userAnswer = dataFromPersistence?.userAnswer || "";
  model.data.isCorrect = dataFromPersistence?.isCorrect || false;
  model.data.quizCompleted = dataFromPersistence?.quizCompleted || false;
  model.data.showResult = dataFromPersistence?.showResult || false;
  model.data.hint = dataFromPersistence?.hint || null;
}

// Save Quiz State to Firebase
export async function saveToFirebaseQuiz(model) {
  if (!model.data.userEmail) {
    console.error("Cannot save quiz state: userEmail is missing");
    return;
  }
  const replacedEmail = model.data.userEmail.replaceAll(".", ",");
  const path = QUIZ_PATH + replacedEmail;

  try {
    const dataToSave = modelToPersistenceQuiz(model);
    await set(ref(db, path), dataToSave);
    console.log("Quiz state saved to Firebase:", dataToSave);
  } catch (error) {
    console.error("Error saving quiz state to Firebase:", error);
  }
}

// Load Quiz State from Firebase
export async function readFromFirebaseQuiz(model) {
  if (!model.data.userEmail) {
    console.error("Cannot read quiz state: userEmail is missing");
    return;
  }
  const replacedEmail = model.data.userEmail.replaceAll(".", ",");
  const path = QUIZ_PATH + replacedEmail;

  try {
    const snapshot = await get(ref(db, path));
    if (snapshot.exists()) {
      const quizData = snapshot.val();
      console.log("Quiz state read from Firebase:", quizData);
      persistenceToModelQuiz(quizData, model);
    } else {
      console.log("No quiz state found for this user in Firebase.");
    }
  } catch (error) {
    console.error("Error reading quiz state from Firebase:", error);
  }
}

// Synchronize Model with Firebase
export function connectToFirebaseQuiz(model, watchFunction) {
  // Watch for local changes in model
  const modelProperties = () => [
    model.data.userScore,
    model.data.currentQuestion,
    model.data.userAnswer,
    model.data.isCorrect,
    model.data.quizCompleted,
    model.data.showResult,
    model.data.hint,
  ];

  const saveModelChangesQuiz = () => {
    saveToFirebaseQuiz(model);
  };

  // Watch function for local changes
  watchFunction(modelProperties, saveModelChangesQuiz);

  // Sync Firebase data to model
  if (model.data.userEmail) {
    const replacedEmail = model.data.userEmail.replaceAll(".", ",");
    const path = QUIZ_PATH + replacedEmail;

    const quizRef = ref(db, path);
    onValue(quizRef, (snapshot) => {
      const quizData = snapshot.val();
      console.log("Quiz state updated from Firebase:", quizData);
      persistenceToModelQuiz(quizData, model);
    });
  }
}
