import { ref, onMounted, defineComponent } from "vue";
import "../css/nav.css";
import { getHighestScore } from "/src/firebaseModel";
import { signOutUser } from "/src/views/loginView";

function NavbarView() {
    const activePage = ref(window.location.hash || "#/welcome");

    onMounted(() => {
        window.addEventListener("hashchange", () => {
            activePage.value = window.location.hash;
        });
    });

    function nameThatCountryButtonACB() {
        console.log("Name that country! button was clicked");
        window.location.hash = "#/welcome";
    }

    function mainButtonACB() {
        console.log("main button was clicked");
        window.location.hash = "#/welcome";
    }
    function practiceButtonACB() {
        console.log("Practice button was clicked");
        window.location.hash = "#/practice";
    }
    function myProfileButtonACB() {
        console.log("My Profile button was clicked");
        window.location.hash = "#/myProfile";
    }
    function quizButtonACB() {
        console.log("Quiz button was clicked");
        window.location.hash = "#/quiz";
    }

    function highScoreButtonACB() {
        console.log("High Score button was clicked");
        getHighestScore();
        window.location.hash = "#/highScore";
    }
    function signOutButtonACB() {
        console.log("Sign out button was clicked");
        signOutUser();
    }



    return () => {
        const isQuizPage = activePage.value === "#/quiz/page";

        return (
            <nav>
                <h1 onClick={nameThatCountryButtonACB} class="nav-h1"> Name that country! </h1>
                <div class="menu">
                    <a onClick={mainButtonACB} class={activePage.value === "#/welcome" ? "active" : ""}>
                        Main</a>
                    <a onClick={practiceButtonACB} class={activePage.value === "#/practice" ? "active" : ""}>
                        Practice
                    </a>
                    <a onClick={myProfileButtonACB} class={activePage.value === "#/myProfile" ? "active" : ""}>
                        My profile
                    </a>
                    <a onClick={isQuizPage ? undefined : quizButtonACB} class={`${activePage.value === "#/quiz" ? "active" : ""} ${isQuizPage ? "disabled" : ""}`}>
                        Quiz
                    </a>
                    <a onClick={highScoreButtonACB} class={activePage.value === "#/highScore" ? "active" : ""}>
                        High score
                    </a>
                    <a onClick={signOutButtonACB}>Sign out</a>
                </div>
            </nav>
        );

    }
        
   
}

export default defineComponent(NavbarView);