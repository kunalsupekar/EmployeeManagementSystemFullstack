
import React from 'react'
import { useAuth } from '../security/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Userdashboard() {


     const authContext = useAuth();
      const username = authContext.username;
      const navigate=useNavigate();
      const handleUpdate = () => {
        navigate(`/updateUserProfile`)
    };
  return (
    <>
      <div className="container mt-5"> {/* Added top margin */}
        <div className="row justify-content-center">
          <div className="col-md-8"> {/* Increased column width for more space */}
            <div className="card shadow-sm"> {/* Added shadow for a formal look */}
              <div className="card-body">
                <h5 className="card-title text-center mb-4">Welcome {username}</h5>
                <p className="card-text">
                  <strong>Full Name:</strong> John Doe
                </p>
                <p className="card-text">
                  <strong>Email:</strong> john.doe@example.com
                </p>
                <p className="card-text">
                  <strong>Phone:</strong> (123) 456-7890
                </p>
                <p className="card-text">
                  <strong>Location:</strong> New York, USA
                </p>
                <p className="card-text">
                  <strong>Occupation:</strong> Web Developer
                </p>
                <p className="card-text">
                  <strong>Bio:</strong> A passionate developer who loves building web applications.
                </p>
                <div className="d-flex justify-content-end mt-3"> {/* Moved buttons to a separate div */}
                  <button className="btn btn-outline-primary btn-sm me-2" onClick={handleUpdate}>Update Profile</button> {/* Changed button style */}
                  <button className="btn btn-outline-info btn-sm">Notifications</button> {/* Changed button style */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}