import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUserByRole } from '../../api/EmployeeApiService';

export default function ListAllUsers() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const refreshAllUsers = useCallback(async () => {
        try {
            const response = await getAllUserByRole("USER");
            setUsers(response.data);
            // console.log(response.data); // Correct logging
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }, []);

    useEffect(() => {
        refreshAllUsers();
    }, [refreshAllUsers]); // Safe dependency

    const viewUser = (userId) => {
        console.log("clicked ", userId)
        navigate(`/admin/viewUserInAdminDashboard/${userId}`);
    };
    return (
        <div>
            <h1>All Employees!</h1>
            {/* {message && <div className="alert alert-warning">{message}</div>} */}
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>User ID</th>  {/* Changed to User ID for readability*/}
                            <th>Email</th>
                            <th>First Name</th>  {/* Changed to First Name for readability*/}
                            <th>Last Name</th> {/* Changed to Last Name for readability*/}
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.userId}>
                                <td>{user.userId}</td>
                                <td>{user.email}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>
                                    <span
                                        className={`text-${user.status === "ACTIVE"
                                                ? "success"
                                                : user.status === "PENDING"
                                                    ? "warning"
                                                    : user.status === "REJECTED"
                                                        ? "danger"
                                                        : "secondary"
                                            }`}
                                    >
                                        {user.status}
                                    </span>
                                </td>


                                <td>
                                    <button
                                        className="btn btn-success"
                                        onClick={() => viewUser(user.userId)} // Pass the user ID to viewUser
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* <div className="btn btn-success m-5" onClick={addNewTodo}>Add New Todo</div> */}
            </div>
        </div>
    );
}
