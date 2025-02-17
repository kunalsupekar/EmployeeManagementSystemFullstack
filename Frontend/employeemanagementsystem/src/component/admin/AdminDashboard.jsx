import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminDashboard.css'; 
const AdminDashboard = () => {

    const userName=sessionStorage.getItem("userEmail")

    return (
        <div className="container-fluid">
            <div className="row"> {/* Use a row to contain sidebar and content */}
                {/* Sidebar */}
                
                <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar"> {/* Use nav element */}
                    <div className="position-sticky pt-3">
                        <p>Welcome</p>
                       <p>{userName}</p>
                        <h2 className="sidebar-heading px-3 py-4">
                        <Link to="/admin">Admin Dashboard</Link></h2>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <Link to="/admin/users" className="nav-link">List Users</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin/register" className="nav-link">Register User</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin/import" className="nav-link">Import Users</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin/approve" className="nav-link">Approve Requests</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin/delete" className="nav-link">Delete User</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin/loginHistory" className="nav-link">User Login History</Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4"> {/* Use main element */}
                    <Outlet /> {/* This is where nested routes will render */}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
