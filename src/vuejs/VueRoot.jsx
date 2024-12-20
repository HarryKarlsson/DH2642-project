import { RouterView, createRouter, createWebHashHistory } from 'vue-router';
import { auth } from "../authService"; // Firebase auth object
import LogInPresenter from './logInPresenter';
import Welcome from './WelcomePresenter'; 
import PracticePresenter from './practicePresenter';
import QuizPresenter from './quizPresenter';
import NavbarPresenter from './navbarPresenter';
import ProfilePresenter from './profilePresenter';
import QuizPagePresenter from './quizPagePresenter';
import HighScorePresenter from './highscorePresenter';


export function makeRouter() {
    const router = createRouter({
        history: createWebHashHistory(),
        routes: [
            {
                path: "/",
                component: <LogInPresenter/>,
            },
            {
                path: "/login",
                component: <LogInPresenter/>,
            },
            {
                path: "/welcome",
                component: <Welcome/>,
                meta: { requiresAuth: true },
            },
            {
                path: "/practice",
                component: <PracticePresenter/>,
               // meta: { requiresAuth: true },
            },
            {
                path: "/quiz",
                component: <QuizPresenter/>,
                meta: { requiresAuth: true },
            },
            {
                path: "/quiz/page",
                component: <QuizPagePresenter/>,
                meta: { requiresAuth: true },
            },
            {
                path: "/myProfile",
                component: <ProfilePresenter/>,
                meta: { requiresAuth: true },
            },
            {
                path: "/highScore",
                component: <HighScorePresenter/>,
                //meta: { requiresAuth: true },
            }
            

        ],
    });

    // Add navigation guard
    router.beforeEach((to, from, next) => {
        const isSignedIn = auth.currentUser !== null; // Firebase auth check
        if (to.meta.requiresAuth && !isSignedIn) {
            // Redirect to login if user is not signed in
            next({ path: "/login", query: { redirect: to.fullPath } });
        } else {
            // Proceed to the requested route
            next();
        }
    });

    return router;
}

function VueRoot() {
    return (
        <div>
            {<NavbarPresenter />}
            <div>
                {<RouterView />}
            </div>
        </div>
    );
}

export {VueRoot};