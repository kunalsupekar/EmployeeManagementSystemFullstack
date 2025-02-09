import React, { useState } from 'react';

function UserNotifications() {
  const [notifications, setNotifications] = useState([
    { id: 1, sender: 'Admin', message: 'Welcome to our platform!' },
    { id: 2, sender: 'Admin', message: 'New features are available.' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendNotification = () => {
    if (newMessage.trim() !== '') {
      const newNotification = {
        id: Date.now(),
        sender: 'User',
        message: newMessage,
      };
      setNotifications([...notifications, newNotification]);
      setNewMessage('');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Notifications</h5>
              <ul className="list-group">
                {notifications.map((notification) => (
                  <li key={notification.id} className="list-group-item">
                    <strong>{notification.sender}:</strong> {notification.message}
                  </li>
                ))}
              </ul>
              <div className="mt-3">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleSendNotification}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserNotifications;
