import { Suspense, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ChatApp from "./ChatApp";
import axios from "axios";
import experimental_brain_logo from "../assets/images/avatar.png";
import Loadding from "./Loadding";
import './style/chatlogin.less';

export default function ChatLogin() {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const [showChat, setShowChat] = useState(localStorage.getItem("userData") ? localStorage.getItem("userData") : false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [schooltenant, setSchooltenant] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`${apiUrl}/users`, {
                headers: { "Content-Type": "application/json" },
            });
            if (response.status !== 200) {
                throw new Error("Failed to fetch user data");
            }
            const users = response.data;
            const user = users.find((user) => user.email === email);
            if (!user) {
                toast.warn("User not found");
                return;
            }
            if (user.password !== password) {
                toast.error("Incorrect password");
                return;
            }
            localStorage.setItem("userData", JSON.stringify(user));
            toast.success("Login successful");
            setShowChat(true);
        } catch (error) {
            toast.error(`Login error: ${error.message}`);
        }
    };

    const handleSchooltenantLogin = async () => {
        const url = `http://192.46.208.144:8080/experimentalbrain/api/v1/fedlogin`;
        const payload = { schooltenant };

        try {
            const res = await axios.post(url, new URLSearchParams(payload), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            if (res.status !== 200) {
                throw new Error("Failed to log in");
            }

            const user = res.data;
            if (!user) {
                toast.warn("User not found");
                return;
            }

            localStorage.setItem("userData", JSON.stringify(user));
            toast.success("Login successful");
            setShowChat(true);
        } catch (err) {
            toast.error(`Login error: ${err.message}`);
        }
    };

    return (
        <Suspense fallback={<Loadding />}>
            <ToastContainer draggable theme="colored" />
            {showChat ? (
                <ChatApp />
            ) : (
                <>
                    <div className="body">
                        <div className="main">
                            <input type="checkbox" id="chk" aria-hidden="true" />

                            <div className="signup">
                                <form onSubmit={handleSubmit}>
                                    <img className="image" src={experimental_brain_logo} alt="experimental_brain_logo" />
                                    <label htmlFor="chk" aria-label="" className="login-label-sign-in">Login</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                        className="input-class"
                                    />
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        className="input-class"
                                    />
                                    <button type="submit" className="login-button">Sign In</button>
                                    {/* <button type="button" onClick={handleSchooltenantLogin} className="login-button">Login With School Tenant</button> */}
                                </form>
                            </div>

                            {/* <div className="login">
                                <form>
                                    <label htmlFor="chk" aria-hidden="true" className="login-label">Register</label>
                                    <input type="email" name="email" placeholder="Email" className="input-class" required />
                                    <input type="password" name="pswd" placeholder="Password" className="input-class" required />
                                    <button onClick={(() => toast.warn("Only admin can register "))} className="login-button">Sign Up</button>
                                </form>
                            </div> */}
                        </div>
                    </div>
                </>
            )}
        </Suspense>
    );
}
