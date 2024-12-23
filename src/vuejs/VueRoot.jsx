import { RouterView, createRouter, createWebHashHistory } from 'vue-router';
import { auth } from "../firebaseConfig"
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
            // Redirect to login if not signed in
            next({ path: "/login", query: { redirect: to.fullPath } });
        } else if (to.path === "/login" && isSignedIn) {
            // Redirect signed-in users away from login
            next({ path: "/welcome" });
        } else if (to.path === "/quiz" && isSignedIn && !quizModel.getIsEnded()) {
            // Load saved quiz state using .then()
            loadStateFromFirebase()
                .then((savedData) => {
                    console.log("Saved data from Firebase:", savedData);
    
                    if (savedData && savedData.currentQuestion) {
                        // Ask the user if they want to load the saved game
                        const confirmLoad = window.confirm(
                            "You have a saved game. Do you want to load it? OK to load, Cancel to start a new game."
                        );
    
                        if (confirmLoad) {
                            // Load the saved data and proceed
                            quizModel.setQuizData(savedData);
                            next({ path: "/quiz/page" });
                        } else {
                            // Reset quiz and proceed
                            quizModel.resetQuiz();
                            quizModel.setIsEnded(true);
                            console.log("Quiz reset. Starting a new game.");
                            next();
                        }
                    } else {
                        // No saved data, proceed normally
                        console.log("No saved quiz data found.");
                        next();
                    }
                })
                .catch((error) => {
                    // Handle errors in loading saved state
                    console.error("Error loading saved quiz state:", error);
                    next(); // Proceed to the requested route anyway
                });
        } else {
            // Default case: Proceed to the requested route
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

