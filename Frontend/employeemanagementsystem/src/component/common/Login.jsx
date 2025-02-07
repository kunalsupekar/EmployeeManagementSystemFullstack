import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {

  const [username, setUsername] = useState('kunal')

  const [password, setPassword] = useState('')

  const [showErrorMessage, setShowErrorMessage] = useState(false)

  const navigate = useNavigate();

  function handleSubmit() {
    if (username==='kunal'&& password==='123') { 
      navigate(`/adminDashboard`)
  } else {
      setShowErrorMessage(true)
  }
  }


  function handleUsernameChange(event) {
    setUsername(event.target.value)
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value)
  }
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Time to Login!</h2>
              {showErrorMessage && (
                <div className="alert alert-danger" role="alert">
                  Authentication Failed. Please check your credentials.
                </div>
              )}
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    User Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="d-grid">
                  <button
                    type="button"
                    className="btn btn-primary"
                    name="login"
                    onClick={handleSubmit}
                  >
                    Login
                  </button>
                 <div>
                  Don't have an account ?
                  <Link to="/register">Sign up</Link>
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