import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios'; // Import axios
import { apiClient } from '../../api/ApiClient';
import { addUserApi } from '../../api/EmployeeApiService';

export default function RegisterUser() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobileNo, setmobileNo] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (event) => { // Make the function async
    event.preventDefault();

    if (!firstName || !lastName || !email || !password || !confirmPassword || !mobileNo) {
      toast.error('Please fill in all fields.', { position: 'top-right', autoClose: 2000 });
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.', { position: 'top-right', autoClose: 2000 });
      return;
    }

    if (!/^\d{10}$/.test(mobileNo)) {
      toast.error('Please enter a valid 10-digit mobile number.', { position: 'top-right', autoClose: 2000 });
      return;
    }

    const user = {
      firstName: firstName, // Use state variables
      lastName: lastName,    // Use state variables
      email: email,
      password: password,
      mobileNo: mobileNo,
    };

    try {
    
      const response = await addUserApi(user);

      if (response.status === 201) { // Assuming 201 Created is the success status
        toast.success('Registration successful! You will get an email soon.', {
          position: 'top-right',
          autoClose: 2000,
        });
        navigate(`/login`);
      } else {
        toast.error(`Registration failed: ${response.message || 'Unknown error'}`, { // Display error from server
          position: 'top-right',
          autoClose: 2000,
        });
        console.log(response)
        console.error('Registration failed:', response); // Log the full response for debugging
      }
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error(`Registration failed: ${error.message || 'Network error'}`, { // Handle network errors
        position: 'top-right',
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-7">
        <form onSubmit={handleRegister} className="p-3 shadow rounded">
          <h4 className="text-center mb-3">Register</h4>

          <div className="row mb-2">
            <div className="col-md-6">
              <label htmlFor="firstName" className="form-label">
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                className="form-control form-control-sm"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="lastName" className="form-label">
                Last Name:
              </label>
              <input
                type="text"
                id="lastName"
                className="form-control form-control-sm"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-2">
            <label htmlFor="mobileNo" className="form-label">
              Mobile Number:
            </label>
            <input
              type="tel"
              id="mobileNo"
              className="form-control form-control-sm"
              value={mobileNo}
              onChange={(e) => setmobileNo(e.target.value)}
              required
              pattern="[0-9]{10}"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="form-control form-control-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="form-control form-control-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control form-control-sm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary btn-sm w-100" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
