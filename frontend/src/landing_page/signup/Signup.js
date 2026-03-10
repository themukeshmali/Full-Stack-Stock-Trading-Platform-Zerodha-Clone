import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
    const [isLogin, setIsLogin] = useState(false); // Toggle between Login and Signup

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";
            const url = isLogin ? `${API_URL}/login` : `${API_URL}/signup`;
            const payload = isLogin ? { username, password } : { username, email, password };
            
            const response = await axios.post(url, payload);
            setMessage(response.data.message);
            setIsError(false);
            
            if (!isLogin) {
                // After successful signup, optionally switch to login or clear form
                setIsLogin(true);
                setPassword(""); // Just clear password requiring them to log in
            } else {
                setUsername("");
                setEmail("");
                setPassword("");
                // Redirect to dashboard
                setTimeout(() => {
                    window.location.href = process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001";
                }, 1000); // 1 second delay to show success message
            }
        } catch (error) {
            setIsError(true);
            setMessage(error.response?.data?.message || `An error occurred during ${isLogin ? 'login' : 'signup'}`);
        }
    };

    return ( 
        <div className="container mt-5 mb-5">
            <div className="row align-items-center justify-content-center mt-5">
                <div className="col-md-7 text-center mb-4 mb-md-0">
                    <img 
                        src="/media/images/signup.png" 
                        alt="Zerodha Products Logo" 
                        className="img-fluid" 
                        style={{ maxWidth: '90%', height: 'auto' }} 
                    />
                </div>
                <div className="col-md-5">
                    <div className="card p-4" style={{ borderRadius: "10px", border: "none", backgroundColor: "transparent" }}>
                        <h2 className="mb-4" style={{ color: "#424242", fontWeight: "500", fontSize: "2rem" }}>
                            {isLogin ? "Login to Kite" : "Signup now"}
                        </h2>
                        <p className="text-muted mb-4">
                            {isLogin ? "Welcome back!" : "Or track your existing application."}
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label" style={{ fontWeight: "500", color: "#424242" }}>Username</label>
                                <input 
                                    type="text" 
                                    className="form-control hover-shadow transition-all" 
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    style={{ padding: "10px" }}
                                />
                            </div>
                            
                            {!isLogin && (
                                <div className="mb-3">
                                    <label className="form-label" style={{ fontWeight: "500", color: "#424242" }}>Email Address</label>
                                    <input 
                                        type="email" 
                                        className="form-control hover-shadow transition-all" 
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        style={{ padding: "10px" }}
                                    />
                                </div>
                            )}

                            <div className="mb-4">
                                <label className="form-label" style={{ fontWeight: "500", color: "#424242" }}>Password</label>
                                <input 
                                    type="password" 
                                    className="form-control hover-shadow transition-all" 
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    style={{ padding: "10px" }}
                                />
                            </div>
                            
                            {message && (
                                <div className={`alert ${isError ? 'alert-danger' : 'alert-success'} py-2 mb-3`} role="alert">
                                    {message}
                                </div>
                            )}
                            
                            <button type="submit" className="btn btn-primary w-100 fw-bold border-0 fs-5" style={{ backgroundColor: "#387ed1", padding: "10px", borderRadius: "3px" }}>
                                {isLogin ? "Login" : "Sign up"}
                            </button>
                            
                            <div className="text-center mt-4">
                                <p className="text-muted mb-1" style={{ fontSize: "0.85rem" }}>
                                    By proceeding, you agree to our <span style={{ textDecoration: "underline", color: "#387ed1", cursor: "pointer" }}>Terms</span> and <span style={{ textDecoration: "underline", color: "#387ed1", cursor: "pointer" }}>Privacy Policy</span>.
                                </p>
                                <p className="text-muted mt-2" style={{ fontSize: "0.9rem" }}>
                                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                                    <span 
                                        onClick={() => {
                                            setIsLogin(!isLogin);
                                            setMessage("");
                                            setIsError(false);
                                        }} 
                                        style={{ textDecoration: "none", color: "#387ed1", cursor: "pointer", fontWeight: "500" }}
                                    >
                                        {isLogin ? "Sign up here" : "Login here"}
                                    </span>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;