import { RouterView, createRouter, createWebHashHistory } from 'vue-router';
import { auth } from "../authService"; // Firebase auth object
import LogInPresenter from './logInPresenter';
import Welcome from './WelcomePresenter'; 
import PracticePresenter from './practicePresenter';
import QuizPresenter from './quizPresenter';
import NavbarPresenter from './navbarPresenter';
import ProfilePresenter from './profilePresenter';
import QuizPagePresenter from './quizPagePresenter';
import { ref } from "vue";
import "../css/testVueRoot.css";

export const isLoading = ref(false);

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
        ],
    });

    // Add navigation guard
    router.beforeEach((to, from, next) => {
        isLoading.value = true;
        const isSignedIn = auth.currentUser !== null; // Firebase auth check
        if (to.meta.requiresAuth && !isSignedIn) {
            // Redirect to login if user is not signed in
            next({ path: "/login", query: { redirect: to.fullPath } });
        } else {
            // Proceed to the requested route
            next();
        }
    });
    router.afterEach(() => {
        isLoading.value = false;
    });

    return router;
}

function VueRoot() {
    return (
        <div>
            {isLoading.value && (
            <div className="loading-overlay">
                    <img src="https://brfenergi.se/iprog/loading.gif" alt="Loading..." />
                </div>
            )}
            <NavbarPresenter />
            <div>
                <RouterView />
            </div>
        </div>
    );
}

export {VueRoot};



/*
// Code without global variable updating the user when the page is loading

import { RouterView, createRouter, createWebHashHistory } from 'vue-router';
import { auth } from "../authService"; // Firebase auth object
import LogInPresenter from './logInPresenter';
import Welcome from './WelcomePresenter'; 
import PracticePresenter from './practicePresenter';
import QuizPresenter from './quizPresenter';
import NavbarPresenter from './navbarPresenter';
import ProfilePresenter from './profilePresenter';
import QuizPagePresenter from './quizPagePresenter';
import "../css/testVueRoot.css";


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
            <NavbarPresenter />
            <div>
                <RouterView />
            </div>
        </div>
    );
}

export {VueRoot};

*/