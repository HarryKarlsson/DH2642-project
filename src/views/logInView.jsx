// logInView.jsx
/*import { logIn } from "../authService";
import "../css/logIn.css";
import { useState } from "vue-router"

function LogInView() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    async function handleLogIn() {
        try {
            await logIn(email, password); //using the logIn function from authService
            console.log("Login successful");
            window.location.hash = "#/welcome"; // Redirect to Welcome page
        } catch (error) {
            console.error("Error logging in:", error.message);
            alert("Login failed: " + error.message);
        }
    }
    return (
        <div className="login-container">
            <h1>Log In Quiz</h1>
            <div>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogIn}>Log In</button>
            </div>
        </div>
    );
};

export default LogInView;

*/

import { ref } from "vue";
import { logIn } from "../authService";
import "../css/welcome.css";

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
                    v-model={email.value}
                />
                <input
                    type="password"
                    placeholder="Enter Password"
                    v-model={password.value}
                />
                <button onClick={handleLogIn}>Log In</button>
            </div>
        </div>
    );
}

export default LoginView;