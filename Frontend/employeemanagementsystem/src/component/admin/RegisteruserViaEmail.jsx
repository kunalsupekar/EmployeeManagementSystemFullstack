import React, { useState } from 'react';
import { registerUserViaEmailApi } from '../../api/EmployeeApiService';

export default function RegisterUserViaEmail() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // To prevent multiple clicks

  const handleRegister = async (e) => {
    e.preventDefault();

    // Trim values to prevent unnecessary spaces
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      alert('Please enter a valid email and password.');
      return;
    }

    setLoading(true); // Disable button while API call is in progress

    try {
      const response = await registerUserViaEmailApi({ email: trimmedEmail, password: trimmedPassword });

      if (response.status === 200) {
        alert('User registered successfully!');
        setEmail('');
        setPassword('');
      } else {
        alert('Failed to register user. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred while registering. Please try again.');
    } finally {
      setLoading(false); // Re-enable button after API call
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center">Register User via Email</h3>
              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
