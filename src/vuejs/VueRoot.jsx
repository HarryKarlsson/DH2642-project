import { RouterView, createRouter, createWebHashHistory } from 'vue-router';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../authService"; // Firebase auth object
import { ref } from "vue";
import LogInPresenter from './logInPresenter';
import Welcome from './WelcomePresenter'; 
import PracticePresenter from './practicePresenter';
import QuizPresenter from './quizPresenter';
import NavbarPresenter from './navbarPresenter';
import ProfilePresenter from './profilePresenter';
import QuizPagePresenter from './quizPagePresenter';


function makeRouter() {
    return createRouter({
        history: createWebHashHistory(),
        routes: [
            {
                path: "/",
                component: LogInPresenter,
            },
            {   path: "/login", 
                component: <LogInPresenter/>
            },
            {
                path: "/welcome",
                component: <Welcome/>,
            },
            {
                path: "/practice",
                component: <PracticePresenter/>, // Här ska ni lägga till practise presenter
            },
            {
                path: "/quiz",
                component: <QuizPresenter/>, // Här sla ni lägga till quizpresenter
            }, 
            {   
                path: "/quiz/page", 
                component: <QuizPagePresenter/> 
            },
            {   
                path:"/myProfile",
                component: <ProfilePresenter/>
            }
        ]
    });
}

export { makeRouter };



function VueRoot() {

    const user = ref(null);
    onAuthStateChanged( auth, (firebaseUser) => {
        if (firebaseUser) {
            console.log("User logged in: ", firebaseUser.uid);
            user.value = firebaseUser;
        }
        if (!firebaseUser) {
            console.log("User not logged in");
            user.value = null;
        }

})
    return (
        <div>
            {user.value && <NavbarPresenter />}
            <div>
                {user.value ? <RouterView /> : <LogInPresenter />}
            </div>
        </div>
    );
}

export {VueRoot};