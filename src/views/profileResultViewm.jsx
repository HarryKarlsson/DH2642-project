import "../css/profile.css";

//Lägg in användaren här med
function ProfileView({ randomNumber, errorMessage }) {
    return (
        <div className="profile">
            <h1>My Profile</h1>
            <div className="profile-info">
                <h2>Player Name</h2>
                <p>More info</p>
            </div>
            <div className="profile-stats">
                <h3>Stats</h3>
                <div>
            {randomNumber !== null && <p>Best Score: {randomNumber}</p>}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
            </div>
        </div>
    );
}

export default ProfileView;
