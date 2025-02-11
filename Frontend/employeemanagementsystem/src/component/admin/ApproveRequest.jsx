import React, { useEffect, useState } from 'react';
import { changeUserStatusById, getAllUserByStatus } from '../../api/EmployeeApiService';
import { toast } from 'react-toastify';

export default function ApproveRequest() {
  const [status, setStatus] = useState('PENDING');
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false); // Add a refresh state

  useEffect(() => {
    fetchUserByTheirStatus(status);
  }, [status, refresh]); // Add refresh to the dependency array

  const fetchUserByTheirStatus = async (status) => {
    try {
      const response = await getAllUserByStatus(status);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleApprove = async (userId) => {
    try {
      console.log("Sending Status:", "ACTIVE");
      const response = await changeUserStatusById(userId, 'ACTIVE');

      if (response) {  // Assuming a successful response is truthy
        toast.success("Status is set to ACTIVE ")
        setRefresh(prev => !prev); // Toggle the refresh state
      } else {
        //console.warn("Approval failed for user:", userId);
        toast.error("Approval failed for user:", userId)
      }

    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  const handleReject = async (userId) => {
    try {
      console.log("Sending Status:", "REJECTED");
      const response = await changeUserStatusById(userId, 'REJECTED');

      if (response) {  // Assuming a successful response is truthy
        toast.success("Status is set to REJECTED ")
        setRefresh(prev => !prev); // Toggle the refresh state
      } else {
        toast.error("Rejection failed for user:", userId)
        //console.warn("Rejection failed for user:", userId);
      }
    } catch (error) {
      console.error('Error rejecting user:', error);
    }
  };

  return (
    <div className="container">
      <div>
        <label htmlFor="statusFilter">Filter by Status:</label>
        <select
          id="statusFilter"
          className="form-control"
          value={status}
          onChange={handleStatusChange}
        >
          <option value="PENDING">Pending</option>
          <option value="ACTIVE">Active</option>
          <option value="DEACTIVE">Inactive</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Status</th>
            <th>Approve</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.email}</td>
              <td>{user.firstName}</td>
              {/* <td>{user.status}</td> */}
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
                {/* {user.status==="ACTIVE" && } */}
                <button
                  className="btn btn-warning"
                  onClick={() => handleApprove(user.userId)}
                  disabled={user.status==="ACTIVE"}
                >
                  Approve
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleReject(user.userId)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
