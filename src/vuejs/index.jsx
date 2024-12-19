import { createApp, reactive, watch  } from 'vue';
import { VueRoot } from './VueRoot';
import { makeRouter } from './VueRoot';
//import { connectToFirebase } from '../firebaseModel';
import userModel from '/src/userModel';
import {connectToFirebase} from "/src/firebaseModel";


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
      }
    }
  );
app.use(router);
app.mount('#root');
