import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';

const DisplayDocument = () => {

    const location = useLocation();
  const files = location.state?.files || []; // Get passed document

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Link copied to clipboard!'); // Replace with a better notification if needed
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Documents</h2>
      <div className="list-group">
        {files.map((file) => (
          <div className="list-group-item d-flex justify-content-between align-items-center" key={file.documentId}>
            <div>
              <strong>{file.fileName}</strong>
              <a href={file.fileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-link ms-2">
                View Document
              </a>
            </div>
            <button 
              className="btn btn-outline-secondary btn-sm" 
              onClick={() => handleCopyToClipboard(file.fileUrl)}
            >
              Copy Link
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayDocument;
