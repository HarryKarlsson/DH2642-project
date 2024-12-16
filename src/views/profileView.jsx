function ProfileView({ handleButtonClick }) {
    return (
        <div>
            <h1>Profil</h1>
            <button onClick={handleButtonClick}>Generera slumpmässigt nummer</button>
        </div>
    );
}

export default ProfileView;
