
import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
      <div>
            <h2>Admin Dashboard</h2>
            <nav>
                <ul>
                    <li><Link to="/admin/users">List Users</Link></li>
                    <li><Link to="/admin/register">Register User</Link></li>
                    <li><Link to="/admin/import">Import Users</Link></li>
                    <li><Link to="/admin/approve">Approve Requests</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default AdminDashboard;
