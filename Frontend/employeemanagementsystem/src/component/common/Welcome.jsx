import React from 'react';

export default function Welcome() {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-8 text-center">
        <div className="alert alert-success shadow-lg rounded p-4" role="alert">
          <h4 className="alert-heading">Welcome to Employee Management System!</h4>
          <p>
            Aww yeah, you successfully accessed the system. This platform helps you manage employees efficiently, track records, and streamline operations.
          </p>
          <hr />
          <p className="mb-0">Use the dashboard to navigate through various features and manage employee details with ease.</p>
        </div>
      </div>
    </div>
  );
}
