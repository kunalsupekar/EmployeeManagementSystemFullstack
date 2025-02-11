import React, { useState } from "react";

export default function ImportUser() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleImport = () => {
    if (!selectedFile) {
      alert("Please select an Excel file before importing.");
      return;
    }
    // File processing logic will go here
    console.log("File selected:", selectedFile.name);
  };

  return (
    <div className="container p-4 border rounded shadow">
      <h2 className="mb-3">Import Users</h2>
      <div className="mb-3">
        <label htmlFor="fileInput" className="form-label fw-bold">
          Upload Excel File:
        </label>
        <input
          className="form-control"
          type="file"
          id="fileInput"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
        />
        <div className="form-text text-muted mt-1">
          <strong>Note:</strong> The uploaded file must be in Excel format (
          <code>.xlsx</code> or <code>.xls</code>) and contain the following
          columns with exact headers:
        </div>
        <ul className="form-text text-muted">
          <li><code>email</code></li>
          <li><code>firstName</code></li>
          <li><code>lastName</code></li>
          <li><code>mobileNo</code></li>
        </ul>
      </div>
      <button className="btn btn-primary" onClick={handleImport}>
        Import
      </button>
    </div>
  );
}
