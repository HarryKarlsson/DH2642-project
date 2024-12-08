import "../css/nav.css"
function NavbarView() { // navbar
    return (
        <nav>
            <h1>Name that country!</h1> {/* Man vill nog ha denna text som länk till hem från alla sidor*/}
            <div className="menu">
                <a href="#">Main</a>
                <a href="#">Practice</a>
                <a href="#">My profile</a>
                <a href="#" className="quiz">Quiz</a>
            </div>
        </nav>
    );
}

export default NavbarView;
