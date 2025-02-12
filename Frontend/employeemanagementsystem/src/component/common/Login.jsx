import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../security/AuthContext';

export default function Login() {
    const [userEmail, setUserEmail] = useState('Shaku@gmail.com');
    const [password, setPassword] = useState('123');
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const authContext = useAuth();
    const navigate = useNavigate();
    

    useEffect(() => {
        if (authContext.role) {
            console.log("Role is", authContext.role);
            // Navigate based on role
            if (authContext.role === "ADMIN") {
                navigate("/admin");
            } else if (authContext.role === "USER") {
                navigate("/userDashboard");
            }
        }
    }, [authContext.role, navigate]);


    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        try {
            const loginSuccess = await authContext.login(userEmail, password);
            if (!loginSuccess) {
                setShowErrorMessage(true);
            }
        } catch (error) {
            setShowErrorMessage(true);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm border-0">
                        <div className="card-body p-4">
                            <h5 className="card-title text-center mb-4">Time to Login</h5>
                            {showErrorMessage && (
                                <div className="alert alert-danger fade-in" role="alert">
                                    Authentication Failed. Please check your credentials.
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="userEmail" className="form-label">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control form-control-sm"
                                        id="userEmail"
                                        name="userEmail"
                                        value={userEmail}
                                        onChange={(e) => {
                                            setUserEmail(e.target.value);
                                            setShowErrorMessage(false);
                                        }}
                                        placeholder="Enter your userEmail"
                                        aria-describedby="userEmailHelp"
                                    />
                                    <div id="userEmailHelp" className="form-text">Enter your registered userEmail.</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control form-control-sm"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setShowErrorMessage(false);
                                        }}
                                        placeholder="Enter your password"
                                    />
                                </div>
                                <div className="d-grid">
                                    <button
                                        type="submit"
                                        className="btn btn-outline-primary btn-sm me-2"
                                        name="login"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Logging in...' : 'Login'}
                                    </button>
                                    <div className="mt-2 text-center">
                                        Don't have an account? <Link to="/register">Sign up</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}