import NavbarPresenter from "../vuejs/navbarPresenter";
import Welcome from "../vuejs/WelcomePresenter";


/*
function makeRouter(){
    return createRouter({
        history: createWebHashHistory(),
        routes: [{
            path: "/",
            component: <Welcome/>,
        },
        {
            path: "welcome",
            component: <Welcome/>,
        },
        {
            path: "practice",
            component: <HomePresenter/>,
        },
        {
            path: "quiz",
            component: <quizPresenter/>,
        },
    

        ]
    })
}
*/


function VueRoot() {
    return (
        <div>
            <NavbarPresenter/>
            <div><Welcome/></div>

        </div>
    );
}

export default VueRoot;
