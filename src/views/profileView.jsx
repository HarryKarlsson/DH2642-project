
import userModel from "/src/userModel";
import "../css/profile.css";

function ProfileView() {
    return (
        <div className="profile">
            <h1>My Profile</h1>
            <div className="profile-info">
                <h2>Player Name</h2>
                <p>{userModel.data.userName}</p>
                <h3>More info</h3>
                <p>Email: {userModel.data.userEmail}</p>
            </div>
            <div className="profile-stats">
                <h3>Stats</h3>
                <div>
            <p>Your Best Score: {userModel.data.userScore}</p>
           
        </div>
            </div>
        </div>
    );
}

export default ProfileView;
