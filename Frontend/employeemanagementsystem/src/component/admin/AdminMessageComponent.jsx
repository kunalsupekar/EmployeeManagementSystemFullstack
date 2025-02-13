import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminMessageComponent() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      chatId: 'chat123',
      sender: 'UserA',
      content: 'Hello, I have a question about my order.',
    },
    {
      id: 2,
      chatId: 'chat123',
      sender: 'UserA',
      content: 'When will it be shipped?',
    },
    {
      id: 3,
      chatId: 'chat456',
      sender: 'UserB',
      content: 'I am having trouble logging in.',
    },
    {
      id: 4,
      chatId: 'chat456',
      sender: 'UserB',
      content: 'Can you reset my password?',
    },
    {
      id: 5,
      chatId: 'chat789',
      sender: 'UserC',
      content: 'Where can I find the documentation?',
    },
  ]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  useEffect(() => {
    // Simulate fetching messages from Spring Boot backend on component mount
    // fetchMessages(); // Commented out fetchMessages
  }, []);

  const fetchMessages = async () => {
    // Replace with your actual API endpoint
    const response = await fetch('/api/messages');
    const data = await response.json();
    setMessages(data);
  };

  const handleReplyClick = (chatId) => {
    setSelectedChat(chatId);
    setShowModal(true); // Open the modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
    setSelectedChat(null); // Clear selected chat
    setReplyText('');
  };

  const handleSendReply = async () => {
    // Send the reply to the Spring Boot backend
    await fetch('/api/messages/reply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chatId: selectedChat,
        message: replyText,
      }),
    });

    // After sending, refresh the messages or update the specific chat
    // fetchMessages();  //Commented out fetchMessages
    //Simulate updating the messages array with the reply
    setMessages((prevMessages) => {
      return prevMessages.map((message) => {
        if (message.chatId === selectedChat) {
          return { ...message, replies: [...(message.replies || []), replyText] };
        }
        return message;
      });
    });
    setReplyText('');
    setShowModal(false); // Close the modal after sending
    setSelectedChat(null);
  };

  return (
    <div className="container">
      <h2>Admin Message Panel</h2>
      <div className="message-list">
        {messages.map((message) => (
          <div key={message.id} className="message-item card mb-3">
            <div className="card-body">
              <h5 className="card-title">
                <strong>User:</strong> {message.sender}
              </h5>
              <p className="card-text">{message.content}</p>
              <button className="btn btn-primary" onClick={() => handleReplyClick(message.chatId)}>
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bootstrap Modal */}
      <div className={`modal ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Reply to Chat {selectedChat}</h5>
              <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <textarea
                className="form-control"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSendReply}>
                Send Reply
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Optional: Add a backdrop for the modal */}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}

export default AdminMessageComponent;
