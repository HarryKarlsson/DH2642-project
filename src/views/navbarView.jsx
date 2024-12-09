import "../css/nav.css"
function NavbarView() { // navbar

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

    return (
        <nav>
            <h1 onClick={nameThatCountryButtonACB} className="nav-h1"> Name that country!</h1> {/* Man vill nog ha denna text som länk till hem från alla sidor // Fixat*/}
            <div className="menu">
                <a onClick={mainButtonACB}>Main</a>
                <a onClick={practiceButtonACB}>Practice</a>
                <a onClick={myProfileButtonACB}>My profile</a>
                <a onClick={quizButtonACB}>Quiz</a>
            </div>
        </nav>
    );
}

export default NavbarView;
