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
import { loadStateFromFirebase } from '/src/firebaseModelQuiz';  
import quizModel from '/src/quizModel';
import "../css/testVueRoot.css";



export function makeRouter() {
    const router = createRouter({
        history: createWebHashHistory(),
        routes: [
            {
                path: "/",
                redirect: "/login",
                //component: <LogInPresenter/>,
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
                meta: { requiresAuth: false },
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
        } else if (to.path === "/quiz" && isSignedIn) { // Check for quiz page specifically
            try {
                const savedData = loadStateFromFirebase(); 
                
                if (savedData && savedData.currentQuestion !== null) {
                  
                    const confirmLoad = window.confirm("You have a saved game. Do you want to load it? OK to load, Cancel to start a new game.");
                    if (!confirmLoad) {
                        
                        next();
                        quizModel.resetQuiz();

                        return;
                    } else {
                        // Load the saved data
                        quizModel.setQuizData(savedData);
                    // redirect to the page with the saved data
                       next({ path: "/quiz/page" }); 
                    }
                    

                } else {
                    // No saved data, proceed normally
                    next();
                }
            } catch (error) {
                console.error("Error loading saved quiz state:", error);
                next(); // Proceed anyway if there's an error
            }
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
            <NavbarPresenter />
            <div>
                <RouterView />
            </div>
        </div>
    );
}

export {VueRoot};

