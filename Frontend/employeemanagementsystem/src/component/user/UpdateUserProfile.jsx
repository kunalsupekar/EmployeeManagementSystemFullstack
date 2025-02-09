import React, { useState } from 'react';
import { useAuth } from '../security/AuthContext'; // ✅ Import useAuth
import { Navigate, useNavigate } from 'react-router-dom';

export default function UpdateUserProfile() {
  const authContext = useAuth();
  const username = authContext?.username || "Guest"; // ✅ Handle undefined case

  // ✅ State for user profile fields
  const [fullName, setFullName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('(123) 456-7890');
  const [location, setLocation] = useState('New York, USA');
  const [occupation, setOccupation] = useState('Web Developer');
  const [bio, setBio] = useState('A passionate developer who loves building web applications.');

  // ✅ Handle update action

  const navigate=useNavigate();
  const handleUpdate = () => {
    console.log('Updated Info:', { fullName, email, phone, location, occupation, bio });
    navigate(`/userDashboard`)
};

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-center mb-1">Welcome {username}</h5>
              <form>
                <div className="mb-1">
                  <label className="form-label">Full Name:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="mb-1">
                  <label className="form-label ">Email:</label>
                  <input    
                  
                    type="email"
                    className="form-control form-control-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-1">
                  <label className="form-label">Phone:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="mb-1">
                  <label className="form-label">Location:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="mb-1">
                  <label className="form-label">Occupation:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                  />
                </div>
                <div className="mb-1">
                  <label className="form-label">Bio:</label>
                  <textarea
                    className="form-control form-control-sm"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleUpdate}>
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
