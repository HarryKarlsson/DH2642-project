import { RouterView, createRouter, createWebHashHistory } from 'vue-router';
import Welcome from './WelcomePresenter'; 
import HomePresenter from './HomePresenter';
import QuizPresenter from './quizPresenter';
import NavbarPresenter from './navbarPresenter';

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
                component: <Welcome/>,
            },

            {
                path: "/practice",
                component: <PracticePresenter/>, // Här ska ni lägga till practise presenter
            },
            {
                path: "/quiz",
                component: <QuizPresenter/>, // Här sla ni lägga till quizpresenter
            }
        ]
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
