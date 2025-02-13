import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UserMessages() {
  const [messages, setMessages] = useState([]);
  const userId = 2; // Hardcoded user ID (replace with dynamic ID from auth)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/messages/${userId}`);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 5000); // Polling every 5s
    return () => clearInterval(interval);
  }, []);

  const markAsRead = async (messageId) => {
    try {
      await axios.patch(`http://localhost:5000/messages/${messageId}/read`);
      setMessages(messages.map(msg => msg.id === messageId ? { ...msg, status: "read" } : msg));
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h3>Inbox</h3>
      {messages.length === 0 ? <p>No messages</p> : (
        messages.map((msg) => (
          <div key={msg.id} className={`alert ${msg.status === "unread" ? "alert-warning" : "alert-secondary"}`}>
            <strong>{msg.message}</strong> <br />
            <small>{new Date(msg.timestamp).toLocaleString()}</small> <br />
            {msg.status === "unread" && (
              <button className="btn btn-sm btn-success mt-1" onClick={() => markAsRead(msg.id)}>
                Mark as Read
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}
