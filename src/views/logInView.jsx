//logInView.jsx
import { app } from "../firebaseConfig";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

import "../css/logIn.css";
import { defineComponent, onMounted } from "vue";
import userModel from "/src/userModel";
import quizModel from "/src/quizModel";
import {saveToFirebase, checkIfUserExists, getAllUsersFromFirebase, setUppDefaultHighScore, resetScores } from "/src/firebaseModel";
import {loadStateFromFirebase} from "/src/firebaseModelQuiz";

import {saveStateToFirebase} from "/src/firebaseModelQuiz";

export async function signOutUser() {
  // if user is already signed out, do nothing
  if (!userModel.data.isSignedIn) {
    return;
  }
  const auth = getAuth(app);
  try {
    await signOut(auth);
    userModel.setIsSignedIn(false);
    userModel.setUserName("");
    userModel.setUserEmail("");
    localStorage.clear();
    sessionStorage.clear();
    window.location.hash = "#/login";
    window.location.reload();
  } catch (error) {
    console.error("Sign-out error:", error);
  }
}

export default defineComponent({
  name: "LoginView",
  data() {
    return {
      userModel
    };
  },
  methods: {
    async userSignIn() {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("Google Auth Result:", user);
        // check if user exists in Firebase
        const userExists = await checkIfUserExists(user.email);
        console.log("User exists in Firebase:", userExists);
        userModel.setUserName(user.displayName);
        userModel.setUserEmail(user.email);
        userModel.setIsSignedIn(true);
        userModel.setIsNewUser(userExists);
       
        console.log("User exists in Firebase:", userExists);
        console.log("User model before save:", userModel);

       
            await saveToFirebase(userModel);  
            await saveStateToFirebase(quizModel.data);
            console.log("New user data saved to Firebase");  
        
        window.location.hash = "#/welcome"; 
      } catch (error) {
        console.error("Sign-in error:", error);
      } 
    },
  },
  
  mounted() {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {

        const userExists = checkIfUserExists(user.email);
        console.log("User exists in Firebase:", userExists);
        userModel.setIsNewUser(!userExists);

        userModel.setUserName(user.displayName);
        userModel.setUserEmail(user.email);
        userModel.setIsSignedIn(true);
      } else {
        userModel.setIsSignedIn(false);
        userModel.setUserName("");
        userModel.setUserEmail("");
        userModel.setIsNewUser(false);
      }
    });
  },

  render() {
    return (
      <div className="login-title">
        <div className="main-title-section">
          <h1>Login <span className="globe">🌍</span></h1>            
        </div>
        <div> {!this.userModel.data.isSignedIn && (
            <button 
              className="btn-signIn" 
              id="signInButton" 
              onClick={this.userSignIn }
            > 
              Create account / Sign In
            </button>
          )}
          
          {this.userModel.data.isSignedIn && (
            <div id="message">
              <p>You have signed in as:</p>
              <p id="userName">Name: {this.userModel.data.userName}</p>
              <p id="userEmail">Email: {this.userModel.data.userEmail}</p>
              <p className="welcome-message">Welcome!</p>
              <button onClick={() => this.userModel.incrementScore()}>
                increment score
              </button>
              

                <button onClick={() => getAllUsersFromFirebase()}>
                get all users
                </button>

                <button onClick={() => loadStateFromFirebase()} >
                set high score
                </button>

                <button onClick={() => resetScores()} >
                reset scores
                </button>


            </div>
          )}
        </div>
      </div>
    );
  }
});
