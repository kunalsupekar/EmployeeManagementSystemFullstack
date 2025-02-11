import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { updateUserById, updateUserProfile } from "../../api/EmployeeApiService";
import { toast } from "react-toastify";

export default function UpdateProfile() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user; // Get user data passed via state
    const isAdmin = location.state?.isAdmin || false; // Check if admin is updating

    const [formData, setFormData] = useState({
        userId: user?.userId || -1,
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        mobileNo: user?.mobileNo || "",
        role: user?.role || "",
        status:user?.status || " "
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if(isAdmin){
                 response = await updateUserById(user.userId, formData);

            }else{
                 response = await updateUserProfile(user.userId, formData);

            }
            
            if (response.status === 200) {
                toast.success('Profile updated successfully!"')
                //alert("Profile updated successfully!");
                // navigate("/userdashboard"); // Redirect to the user dashboard

                if (isAdmin) {
                    //  navigate("/admin/dashboard"); // Redirect to admin dashboard
                    navigate(`/admin/viewUserInAdminDashboard/${user.userId}`);

                } else {
                    navigate("/userdashboard"); // Redirect to user dashboard
                }
            }
        } catch (error) {
            console.error("Failed to update profile:", error);
            toast.error('Failed to update profile:', error)
            alert("Failed to update profile. Please try again.");
        }
    };

    return (
        <div className="container mt-2">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title text-center mb-4">Update Profile</h5>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="firstName" className="form-label">First Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="firstName"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="lastName" className="form-label">Last Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="lastName"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled // Email is typically not editable
                                    />
                                </div>

                                <div className="row">

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="mobileNo" className="form-label">Phone Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="mobileNo"
                                                name="mobileNo"
                                                value={formData.mobileNo}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="role" className="form-label">Change Role</label>
                                            <select
                                                className="form-control"
                                                id="role"
                                                name="role"
                                                value={formData.role || ""}
                                                onChange={handleChange}
                                                disabled={!isAdmin} 
                                            >
                                                {/* Default empty option */}
                                                <option value="USER">USER</option>
                                                <option value="ADMIN">ADMIN</option>
                                            </select>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="status" className="form-label">Change Status</label>
                                        <select
                                            className="form-control"
                                            id="status"
                                            name="status"
                                            value={formData.status || " "}
                                            onChange={handleChange}
                                            disabled={!isAdmin} 

                                        >
                                            <option value="">Select Status</option> {/* Default option */}
                                            <option value="ACTIVE">Active</option>
                                            <option value="DEACTIVE">Deactive</option>
                                            <option value="PENDING">Pending</option>
                                            <option value="REJECTED">Rejected</option>
                                        </select>
                                    </div>
                                </div>


                                <div className="d-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary">Save Changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}