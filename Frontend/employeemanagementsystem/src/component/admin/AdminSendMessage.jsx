import React, { useState, useEffect } from 'react';

function AdminMessageComponent() {
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    // Fetch messages from Spring Boot backend on component mount
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    // Replace with your actual API endpoint
    const response = await fetch('/api/messages');
    const data = await response.json();
    setMessages(data);
  };

  const handleReplyClick = (chatId) => {
    setSelectedChat(chatId);
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
    fetchMessages();
    setReplyText('');
    setSelectedChat(null); // Close the chat interface after sending
  };

  return (
    <div>
      <h2>Admin Message Panel</h2>
      <div className="message-list">
        {messages.map((message) => (
          <div key={message.id} className="message-item">
            <p>
              <strong>User:</strong> {message.sender}
            </p>
            <p>{message.content}</p>
            <button onClick={() => handleReplyClick(message.chatId)}>Reply</button>
          </div>
        ))}
      </div>

      {selectedChat && (
        <div className="chat-interface">
          <h3>Reply to Chat {selectedChat}</h3>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button onClick={handleSendReply}>Send Reply</button>
        </div>
      )}
    </div>
  );
}

export default AdminMessageComponent;
