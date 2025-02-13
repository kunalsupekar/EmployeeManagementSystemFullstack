import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getLoginHistoryForUsers } from "../../api/EmployeeApiService";

export default function UserLoginHistory() {
  const [loginHistory, setLoginHistory] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const fetchLoginHistory = async () => {
      try {
        const response = await getLoginHistoryForUsers() // Update API URL
        const data =response.data
        // Set today's date as the default
        const today = new Date().toISOString().split("T")[0];
        setSelectedDate(today);

        setLoginHistory(data);
      } catch (error) {
        console.error("Error fetching login history:", error);
      }
    };

    fetchLoginHistory();
  }, []);

  // Filter records based on selected date (only compare the date part)
  const filteredHistory = loginHistory.filter(
    (entry) => entry.loginTime.split("T")[0] === selectedDate
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-3">User Login History</h2>

      {/* Date Picker */}
      <div className="mb-3">
        <label className="form-label"><strong>Filter by Date:</strong></label>
        <input
          type="date"
          className="form-control"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Login Time</th>
            <th>Logout Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredHistory.length > 0 ? (
            filteredHistory.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.userId}</td>
                <td>{entry.username}</td>
                <td>{new Date(entry.loginTime).toLocaleString()}</td>
                <td>{entry.logoutTime ? new Date(entry.logoutTime).toLocaleString() : "Still Logged In"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No login history found for this date.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
