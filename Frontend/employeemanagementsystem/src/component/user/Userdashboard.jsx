import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../security/AuthContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { getUserByEmail, getUserById, uploadFileForUser } from '../../api/EmployeeApiService';
import { toast } from 'react-toastify';

export default function UserDashboard() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const authContext = useAuth();
  const userEmail = authContext.userEmail;
  const [user, setUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const isAdmin = !!userId;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = userId ? await getUserById(userId) : await getUserByEmail(userEmail);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [userId, userEmail, fileUploaded]);

  const handleUpdate = () => {
    navigate(isAdmin ? `/admin/updateUserInAdminDashboard` : `/updateProfile`, {
      state: { user, isAdmin },
    });
  };

  const handleDocuments = () => {
    if (!user?.files || user.files.length === 0) return;
    navigate(isAdmin ? `/admin/userDocumentInAdminDashboard` : `/users/documents`, {
      state: { files: user.files },
    });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.warning('Please select a file to upload.');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      await uploadFileForUser(userId, formData);
      toast.success('File uploaded successfully!');
      setFileUploaded(true);
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Error while uploading the file');
    } finally {
      setIsUploading(false);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                  <FaUserCircle size={50} className="me-3 text-primary" />
                  <h5 className="mb-0">{user.firstName || 'N/A'} {user.lastName || 'N/A'}</h5>
                </div>
                <p className="card-text mb-0"><strong>User ID:</strong> {user.userId || 'N/A'}</p>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <p className="card-text"><strong>First Name:</strong> {user.firstName || 'N/A'}</p>
                </div>
                <div className="col-md-6">
                  <p className="card-text"><strong>Last Name:</strong> {user.lastName || 'N/A'}</p>
                </div>
              </div>

              <p className="card-text"><strong>Email:</strong> {user.email || 'N/A'}</p>

              <div className="row">
                <div className="col-md-6">
                  <p className="card-text"><strong>Phone:</strong> {user.mobileNo || 'N/A'}</p>
                </div>
                <div className="col-md-6">
                  <p className="card-text"><strong>Documents:</strong> {user.files?.length || 0}</p>
                </div>
              </div>

              <p className="card-text"><strong>Status:</strong> {user.status || 'N/A'}</p>
              <div className="row">
                <div className="col-md-6">
                  <p className="card-text"><strong>Role:</strong> {user.role || 'N/A'}</p>
                </div>
                {isAdmin && (
                  <div className="col-md-6">
                    <input
                      type="file"
                      name="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="mb-2"
                    />
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={handleUpload}
                      disabled={isUploading}
                    >
                      {isUploading ? "Uploading..." : "Upload Document for User"}
                    </button>
                  </div>
                )}
              </div>
              <p className="card-text"><strong>Registered At:</strong> {user.registeredAt ? new Date(user.registeredAt).toLocaleDateString() : 'N/A'}</p>

              <div className="d-flex justify-content-end mt-3">
                <button
                  className="btn btn-outline-secondary btn-sm me-2"
                  onClick={handleDocuments}
                  disabled={!user.files || user.files.length === 0}
                >
                  View Documents
                </button>
                <button className="btn btn-outline-primary btn-sm me-2" onClick={handleUpdate}>Update Profile</button>
               {!isAdmin && 
               <Link to="/userMessages" >
                <button className="btn btn-outline-info btn-sm">Messages</button>
                </Link>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}