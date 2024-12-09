import "../css/profile.css";

function ProfileView() {
    return (
        <div className="profile">
            <h1>My Profile</h1>
            <div className="profile-info">
                <h2>Player Name</h2>
                <p>More info</p>
            </div>
            <div className="profile-stats">
                <h3>Stats</h3>
                <p>Wins: 120</p>
                <p>Losses: 45</p>
                <p>Best time</p>
            </div>
        </div>
    );
}

export default ProfileView;
