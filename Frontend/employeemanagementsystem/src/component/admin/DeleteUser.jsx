import React, { useState } from 'react';
import { deleteUserById } from '../../api/EmployeeApiService';
import { toast } from 'react-toastify';

export default function DeleteUser() {
  const [userId, setUserId] = useState('');
  const [isDeleting, setIsDeleting] = useState(false); // Track loading state
  const [errorMessage, setErrorMessage] = useState(null); // Store error message

  const handleDelete = async () => {
    if (!userId) {
      alert("Please enter a User ID.");
      return;
    }

    setIsDeleting(true); // Disable button during deletion
    setErrorMessage(null); // Clear previous errors

    try {
      const response = await deleteUserById(userId);

      toast.success(`User with ID ${userId} deleted successfully!`);
      console.log('Response:', response.data);

      setUserId(''); // Clear input field after successful deletion

    } catch (error) {
      if (error.response) {
        // Backend returned an error response (like 404 User Not Found)
        setErrorMessage(error.response.data.message || "An error occurred.");
      } else {
        // Network or other unexpected errors
        setErrorMessage("Failed to connect to the server.");
      }
    } finally {
      setIsDeleting(false); // Re-enable button
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="text-center">Delete User</h3>

              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="userId" className="form-label">User ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="userId"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Enter User ID"
                />
              </div>

              <div className="d-flex justify-content-center">
                <button 
                  className="btn btn-danger" 
                  onClick={handleDelete}
                  disabled={!userId || isDeleting} // Disable when input is empty or deleting
                >
                  {isDeleting ? "Deleting..." : "Delete User"}
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
