import { Suspense, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ChatApp from "./ChatApp";
import axios from "axios";
import experimental_brain_logo from "../assets/images/avatar.png";
import Loadding from "./Loadding";
import './style/chatlogin.less';

export default function ChatLogin() {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const apiUrl1 = import.meta.env.VITE_API_LOGIN_URL;
    const [showChat, setShowChat] = useState(localStorage.getItem("userData") ? localStorage.getItem("userData") : false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            try {
                const response = await axios.post(apiUrl1,
                    { schooltenant: "techveindemo", uname: email, upasswd: password },
                    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
                );
                if (response.status === 200) {
                    toast.success("Login successful");
                    setShowChat(true);
                    return;
                } else {
                    throw new Error("Failed to log in with the first API");
                }
            } catch (error) {
                console.error("ERP API login attempt failed:", error.message);
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
                } catch (Error) {
                    console.error("Json API login attempt failed:", Error.message);
                    throw new Error("Login failed with both APIs");
                }
            }
        } catch (error) {
            toast.error(`Login error: ${error.message}`);
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
                                        type="text"
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
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Suspense>
    );
}
