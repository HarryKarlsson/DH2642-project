
import { createApp, reactive } from 'vue';
import { VueRoot }from './VueRoot';
import { makeRouter } from './VueRoot';



const router = makeRouter();


const app = createApp(<VueRoot/>);
app.use(router); 
app.mount('#root'); 

