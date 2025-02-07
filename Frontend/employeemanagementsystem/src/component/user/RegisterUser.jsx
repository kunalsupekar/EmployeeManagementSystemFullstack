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

        toast.success("Registration successful!", {
            position: "top-right",
            autoClose: 1000, // Closes after 3 seconds
        });
        console.log('Form submitted');
       // navigate(`/login`);
    }

    return (
        <div className="container mt-5">
          <form onSubmit={handleRegister}> {/* Use onSubmit for the form */}
          <div className="mb-3">
              <label htmlFor="firstName">First Name:</label>
              <input 
                type="text" 
                id="firstName" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
              />
            </div>
    
            <div className="mb-3">
              <label htmlFor="lastName">Last Name:</label>
              <input 
                type="text" 
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)} 
              />
            </div>
    
            <div className="mb-3">
              <label htmlFor="email">Email:</label>
              <input 
                type="email" 
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
    
            <div className="mb-3">
              <label htmlFor="password">Password:</label>
              <input 
                type="password" 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
    
            <div className="mb-3">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input 
                type="password" 
                id="confirmPassword" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            
            <button className="btn btn-primary" type="submit">Register</button> {/* Remove onClick from the button */}
          </form>
        </div>
      );
    }
