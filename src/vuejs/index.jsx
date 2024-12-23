import { createApp, reactive, watch  } from 'vue';
import { VueRoot } from './VueRoot';
import { makeRouter } from './VueRoot';
//import { connectToFirebase } from '../firebaseModel';
import userModel from '/src/userModel';
import quizModel from '/src/quizModel';
import countryModel from '/src/countryModel';
import {connectToFirebase} from "/src/firebaseModel";
import { connectToFirebaseQuiz } from '/src/firebaseModelQuiz';


const router = makeRouter();

// Här skapas en reaktiv modell för appens globala tillstånd, Lägg till vad som behövs

// Anslut modellen till Firebase och ladda data

// Skapa och montera Vue-applikationen
const app = createApp(VueRoot, { model: userModel });
watch(
    () => userModel.data.isSignedIn,
    (isSignedIn) => {
      if (isSignedIn) {
         connectToFirebase(userModel, watch);
        connectToFirebaseQuiz(quizModel, watch)
      }
    }
  );
app.use(router);
app.mount('#root');
