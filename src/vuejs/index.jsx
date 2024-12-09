import { createApp } from "vue";
import VueRoot from "../vuejs/VueRoot"; 
import router from "../router";

const app = createApp(VueRoot);
app.use(router);
app.mount("#root");
