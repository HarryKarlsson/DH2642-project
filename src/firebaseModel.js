import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get } from "firebase/database";
import { firebaseConfig } from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


const PATH = "quizModel";

export function modelToPersistence(model) {
    return {
      area: model,  // Sparar regionen som valts
      countries: model.countries  // Sparar de 10 slumpmässiga länderna
    };
  }

export function persistenceToModel(dataFromPersistence, model){
    model.region = dataFromPersistence?.area || "all";
    model.countries = dataFromPersistence?.countries || [];

   
}


export function saveToFirebase(model) {

    if (model.ready) {
      const dataToSave = modelToPersistence(model);
      
      set(ref(db, PATH), dataToSave)
    }
  
  }

  export function readFromFirebase(model){
    model.ready = false;
    return get(ref(db, PATH)).then(snapshotCB).then(modelReadyCB)

    function snapshotCB(snapshot){
      return persistenceToModel(snapshot.val(), model);
    }

    function modelReadyCB(){
      return model.ready = true;
    }
}

export function connectToFirebase(model, watchFunction) {
    function modelProperties() {
      return [model.numberOfGuests, model.dishes, model.currentDishId];
      }
  
    function saveModelChanges() {
      saveToFirebase(model);
      }
  
    watchFunction(modelProperties, saveModelChanges);
  
    readFromFirebase(model);
  }