import { createApp } from "vue";
import VueRoot from "../vuejs/VueRoot"; // Importera VueRoot-komponenten

// Skapa Vue-applikationen med VueRoot som huvudkomponent
const app = createApp(VueRoot);

// Montera applikationen till div med id "root" i index.html
app.mount("#root");
