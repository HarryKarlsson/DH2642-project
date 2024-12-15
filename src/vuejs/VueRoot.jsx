import { RouterView, createRouter, createWebHashHistory } from 'vue-router';
import Welcome from './WelcomePresenter'; 
import PracticePresenter from './practicePresenter';
import QuizPresenter from './quizPresenter';
import NavbarPresenter from './navbarPresenter';
import ProfilePresenter from './profilePresenter';
import QuizPagePresenter from './quizPagePresenter';
import ProfileResultPresenter from './profileResultPresenter'; 


function makeRouter() {
    return createRouter({
        history: createWebHashHistory(),
        routes: [
            {
                path: "/",
                component: <Welcome />,
            },
            {
                path: "/welcome",
                component: <Welcome />,
            },
            {
                path: "/practice",
                component: <PracticePresenter />,
            },
            {
                path: "/quiz",
                component: <QuizPresenter />,
            },
            {
                path: "/quiz/page",
                component: <QuizPagePresenter />,
            },
            {
                path: "/myProfile",
                component: <ProfilePresenter />,
            },
            {
                path: "/pr",
                component: <ProfileResultPresenter />, 
            },
        ],
    });
}

export { makeRouter };



function VueRoot() {
    return (
        <div>
            <NavbarPresenter/>
            <div><RouterView/></div>

        </div>
    );
}

export {VueRoot};