//logInView.jsx
import { app } from "../firebaseApp";
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged} from "firebase/auth";
import "../css/logIn.css";
import { useRouter } from 'vue-router';
import { defineComponent, ref, onMounted } from "vue";


export default defineComponent({
  name: "LoginView",
  setup() {
    // Firebase authentication setup
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const isSignedIn = ref(false);
    const userName = ref("");
    const userEmail = ref("");
    const isLoading = ref(false);
    const router = useRouter();

    // Sign in function
    const userSignIn = async () => {
        isLoading.value = true;
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log(user);
            userName.value = user.displayName || "Unknown User";
            userEmail.value = user.email || "No Email Provided";
            isSignedIn.value = true;
            window.location.hash = "#/welcome"; 
        } catch (error) {
            console.error("Sign-in error:", error.code, error.message);
        } finally {
            isLoading.value = false;
          }
    };

    // Sign out function
    const userSignOut = async () => {
        try {
            await signOut(auth);
            alert("You have signed out successfully!");
            isSignedIn.value = false;
        } catch (error) {
            console.error("Sign-out error:", error.message);
        }
    };

    // React to authentication state changes
    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          isSignedIn.value = true;
          userName.value = user.displayName || "Unknown User";
          userEmail.value = user.email || "No Email Provided";
        } else {
          isSignedIn.value = false;
          userName.value = "";
          userEmail.value = "";
        }
      });
    });

    return {
      isSignedIn,
      userName,
      userEmail,
      userSignIn,
      userSignOut,
    };
  },
  render() {
    return (
      <div class="login-container">
        <h1>Login</h1>
        <div>
          <button id="signInButton" onClick={this.userSignIn}>
            Create account / Sign In
          </button>
          <button
            id="signOutButton"
            onClick={this.userSignOut}
            style={{ display: this.isSignedIn ? "block" : "none" }}
          >
            Sign Out
          </button>
          <div id="message" style={{ display: this.isSignedIn ? "block" : "none" }}>
            <p>You have signed in as:</p>
            <p id="userName">Name: {this.userName}</p>
            <p id="userEmail">Email: {this.userEmail}</p>
          </div>
        </div>
      </div>
    );
  },
});











/*

//
//
// First code below, that kind of works...
//
//



//logInView.jsx
import { ref } from "vue";
import { logIn } from "../authService";
import "../css/logIn.css";

function LoginView() {
    const email = ref("");
    const password = ref("");

    const handleLogIn = async () => {
        try {
            await logIn(email.value, password.value); // Call Firebase auth logic
            console.log("Login successful");
            window.location.hash = "#/welcome"; // Redirect to Welcome page after login
        } 
        catch (error) {
            console.error("Login failed", error.message);
            alert("Login failed: " + error.message);
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <div>
                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email.value}
                    onInput={(e) => (e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password.value}
                    onInput={(e) => (e.target.value)}
                />
                <button onClick={handleLogIn}>Log In</button>
            </div>
        </div>
    );
}

export default LoginView;

*/