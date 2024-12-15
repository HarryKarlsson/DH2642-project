// firebaseModel.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { firebaseConfig } from "./firebaseConfig";
import { watch } from "vue";

// "modelToPersistence" ligger i profile presenter just nu men heter ProfilePresenter()

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

//Test model 
export const modelx = {
  randomNumber: null, 
  testScore: null,
  ready: false,
};

//kan bli svårt att ha den såhär om man ska lägga till saker tror jag eventuellt 
//kanske ska ha att den set(x, en)
export function saveToFirebase(model) {
  var modelRef = ref(db, "model");
  set(modelRef, { randomNumber: model.randomNumber })
      .then(function() {
          console.log("Model saved to Firebase");
      })
      .catch(function(error) {
          console.error("Error saving model to Firebase:", error);
      });
}



export function readFromFirebase(model, callback) {
  const modelRef = ref(db, "model");

  onValue(modelRef, function(snapshot) {
      const data = snapshot.val();
      if (data && data.randomNumber !== undefined) {
          model.randomNumber = data.randomNumber; 
      } else {
          model.randomNumber = null; 
      }
      model.ready = true; 
      callback(); 
  });
}


//vi hade watchFunction innan men fick det ej att fungera,
export function connectToFirebase(model, callback) {

  readFromFirebase(model, callback);

  watch(
      function () { return model.randomNumber; },
      function (newValue) {
          const modelRef = ref(db, "model");
          set(modelRef, { randomNumber: newValue })
              .then(function () {
                  console.log("Model updated in Firebase");
              })
              .catch(function (error) {
                  console.error("Error updating Firebase:", error);
              });
      }
  );
}
