//logInView.jsx
import { ref } from "vue";
import { logIn } from "../authService";
import "../css/logIn.css";

function LoginView() {
    const email = ref("");
    const password = ref("")

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