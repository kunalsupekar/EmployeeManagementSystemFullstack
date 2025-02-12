import React, { useRef, useState } from "react";
import { importUserFromFile } from "../../api/EmployeeApiService";
import { toast } from "react-toastify";

export default function ImportUser() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleImport = async () => {
    if (!selectedFile) {
      alert("Please select an Excel file before importing.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      await importUserFromFile(formData);
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
          accept=".csv"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <div className="form-text text-muted mt-1">
          <strong>Note:</strong> The uploaded file must be in Excel format (
          <code>.csv</code> or <code>.xls</code>) and contain the following
          columns with exact headers:
        </div>
        <ul className="form-text text-muted">

          <li><code>firstName</code></li>

          <li><code>lastName</code></li>
          <li><code>email</code></li>
          <li><code>mobileNo</code></li>
          <li><code>password</code></li>
        </ul>
      </div>
      <button className="btn btn-primary" onClick={handleImport} disabled={isUploading}>
        Import
      </button>
    </div>
  );
}
