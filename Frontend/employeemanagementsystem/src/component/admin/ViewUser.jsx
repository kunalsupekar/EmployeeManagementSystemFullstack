import React, { useState } from 'react';
import { useAuth } from '../security/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ViewUser() {
  const authContext = useAuth();
  const username = authContext.username;
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  // Dummy user data - replace with actual data fetching
  const firstName = 'John';
  const lastName = 'Doe';
  const email = 'john.doe@example.com';
  const phone = '(123) 456-7890';
  const role = 'User';
  const registeredAt = 'Web Developer';

  const handleUpdate = () => {
    navigate(`/updateUserProfile`);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Implement your upload logic here, e.g., using FormData and fetch
      console.log('Uploading file:', selectedFile);
      // You might want to send the file to an API endpoint
    } else {
      alert('Please select a file to upload.');
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-center mb-4">User Details</h5>
                <p className="card-text">
                  <strong>First Name:</strong> {firstName}
                </p>
                <p className="card-text">
                  <strong>Last Name:</strong> {lastName}
                </p>
                <p className="card-text">
                  <strong>Email:</strong> {email}
                </p>
                <p className="card-text">
                  <strong>Phone:</strong> {phone}
                </p>
                <p className="card-text">
                  <strong>Role:</strong> {role}
                </p>
                <p className="card-text">
                  <strong>Registered At:</strong> {registeredAt}
                </p>
                <div>
                  <input type="file" onChange={handleFileChange} className="mb-2" />
                </div>
                <div className="d-flex justify-content-end mt-3">
                  <button className="btn btn-outline-primary btn-sm me-2" onClick={handleUpdate}>
                    Update Profile
                  </button>
                  <button className="btn btn-outline-info btn-sm" onClick={handleUpload} >
                    Upload Document
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
