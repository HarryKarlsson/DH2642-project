import { createApp, reactive } from 'vue';
import { VueRoot } from './VueRoot';
import { makeRouter } from './VueRoot';
import { connectToFirebase } from '../firebaseModel';

const router = makeRouter();

// Här skapas en reaktiv modell för appens globala tillstånd, Lägg till vad som behövs
const model = reactive({
    randomNumber: null, // Slumpmässigt nummer för ProfilePresenter
    ready: false,       // Indikerar om Firebase-data har laddats
});

// Anslut modellen till Firebase och ladda data
connectToFirebase(model, () => {
    console.log("Data loaded from Firebase:", model.randomNumber);
});

// Skapa och montera Vue-applikationen
const app = createApp(VueRoot, { model }); // Skicka modellen som prop till VueRoot
app.use(router);
app.mount('#root');
