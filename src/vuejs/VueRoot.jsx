import NavbarPresenter from "../vuejs/navbarPresenter";
import HomePresenter from "../vuejs/homePresenter";


function VueRoot() {
    return (
        <div>
            <NavbarPresenter />
            <HomePresenter />
        </div>
    );
}

export default VueRoot;
