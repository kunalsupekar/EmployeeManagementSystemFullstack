import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";


export default function RegisterUser() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const handleRegister = (event) => { // Add event argument
        event.preventDefault(); // Prevent default form submission

        toast.success("Registration successful you will get an email soon !", {
            position: "top-right",
            autoClose: 2000, // Closes after 3 seconds
        });
        console.log('Form submitted');
       navigate(`/login`);
    }
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
          <div className="col-md-6">
            <form onSubmit={handleRegister} className="p-4 shadow rounded">
              <div className="mb-1">
                <label htmlFor="firstName">First Name:</label>
                <input 
                  type="text" 
                  id="firstName" 
                  className="form-control"
                  value={firstName} 
                  onChange={(e) => setFirstName(e.target.value)} 
                />
              </div>
      
              <div className="mb-1">
                <label htmlFor="lastName">Last Name:</label>
                <input 
                  type="text" 
                  id="lastName" 
                  className="form-control"
                  value={lastName} 
                  onChange={(e) => setLastName(e.target.value)} 
                />
              </div>
      
              <div className="mb-1">
                <label htmlFor="email">Email:</label>
                <input 
                  type="email" 
                  id="email" 
                  className="form-control"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>
      
              <div className="mb-1">
                <label htmlFor="password">Password:</label>
                <input 
                  type="password" 
                  id="password" 
                  className="form-control"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
      
              <div className="mb-1">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  className="form-control"
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              
              <button className="btn btn-primary w-100" type="submit">Register</button>
            </form>
          </div>
        </div>
      );
      
    }