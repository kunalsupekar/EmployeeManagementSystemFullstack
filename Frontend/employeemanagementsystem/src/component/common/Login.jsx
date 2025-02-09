import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../security/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('kunal');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const authContext = useAuth();
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (authContext.login(username, password)) {
      if (role === 'admin') {
        navigate('/adminDashboard');
      } else {
        navigate('/userDashboard');
      }
    } else {
      setShowErrorMessage(true);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm border-0">
            {/* Added shadow and removed border */}
            <div className="card-body p-4">
              {/* Added padding for a cleaner look */}
              <h5 className="card-title text-center mb-4">Login as {role}</h5>{' '}
              {/* Changed to h5 for a subtler title */}
              {showErrorMessage && (
                <div className="alert alert-danger" role="alert">
                  Authentication Failed. Please check your credentials.
                </div>
              )}
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>{' '}
                  {/* Shortened label */}
                  <input
                    type="text"
                    className="form-control form-control-sm" // Smaller input
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} // Inline onChange
                    placeholder="Enter your username"
                  />{' '}
                  {/* Added placeholder */}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>{' '}
                  {/* Shortened label */}
                  <input
                    type="password"
                    className="form-control form-control-sm" // Smaller input
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Inline onChange
                    placeholder="Enter your password"
                  />{' '}
                  {/* Added placeholder */}
                </div>
                <div className="mb-3">
                  <label htmlFor="role" className="form-label">
                    Login As
                  </label>{' '}
                  {/* More formal label */}
                  <select
                    className="form-select form-select-sm" // Smaller select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="d-grid">
                  <button
                  
                    type="button"
                    className="btn btn-outline-primary btn-sm me-2" // Smaller button
                    name="login"
                    onClick={handleSubmit}
                  >
                    Login
                  </button>
                  <div className="mt-2 text-center">
                    {/* Slightly improved readability */}
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
