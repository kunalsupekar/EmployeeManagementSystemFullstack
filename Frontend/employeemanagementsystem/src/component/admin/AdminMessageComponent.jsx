import { useEffect, useState } from "react";
import { getMessagesByreceiverId, sendMessageApi } from "../../api/EmployeeApiService";
import { toast } from "react-toastify";

function AdminMessageComponent() {
  const [messages, setMessages] = useState([]);
  const [senderId, setSenderId] = useState(null);
  const [receiverId, setReceiverId] = useState(null);
  const [senderUsername, setSenderUsername] = useState(null);
  const userId=sessionStorage.getItem("userId")
  const [selectedMessage, setSelectedMessage] = useState("");
  const [replyText, setReplyText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [loading, setLoading] = useState(true);
  ///const isAdmin = location.state?.isAdmin || false; // Check if admin is updating

  
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [composeReceiverId, setComposeReceiverId] = useState("");
  const [composeMessage, setComposeMessage] = useState("");


  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await getMessagesByreceiverId(userId);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReplyClick = (senderId, receiverId, set) => {
    setSenderId(senderId);
    setReceiverId(receiverId)
    setSenderUsername(set)
    setShowModal(true);
  };

  const handleViewClick = (message) => {
    setSelectedMessage(message);
    setShowViewModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    //setSelectedChat(null);
    setReplyText("");
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setSelectedMessage("");
  };

  const handleSendReply = async () => {
    if (!replyText.trim()) return;

    const messageDto = {
      senderId: receiverId,   // ID of the sender (Admin in this case)
      receiverId: senderId, // ID of the person receiving the reply
      message : replyText,   // The actual message content
    };

    try {
      console.log("sender id ",senderId ,"receiver id ",receiverId," message",replyText)
      const response = await sendMessageApi(messageDto)

      if (response.status===200) {
        toast.success("message send successfully")
        //console.log("send message")
      }

      fetchMessages();
      handleCloseModal();
    } catch (error) {
      console.error("Error sending reply:", error);
    }
  };


  const handleOpenComposeModal = () => {
    setShowComposeModal(true);
  };

  const handleCloseComposeModal = () => {
    setShowComposeModal(false);
    setComposeReceiverId("");
    setComposeMessage("");
  };


  const handleSendMessage = async () => {
    if (!composeReceiverId.trim() || !composeMessage.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    const messageDto = {
      senderId: userId, // Current logged-in user sending message
      receiverId: composeReceiverId,
      message: composeMessage,
    };

    try {
      const response = await sendMessageApi(messageDto);
      if (response.status === 200) {
        toast.success("Message sent successfully");
      }
      fetchMessages();
      handleCloseComposeModal();
    } catch (error) {
      if(error.status===404){
        toast.error(`user not found with userId ${composeReceiverId}`);
      }else{
        toast.error("something went wrong ")
      }
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="container mt-4">
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h2 className="h5 text-primary fw-bold py-2 border-bottom">📩 Message Panel</h2>
      <button className="btn btn-success btn-sm" onClick={handleOpenComposeModal}>
        ➕ Compose Message
      </button>
    </div>
      {loading ? (
        <p>Loading messages...</p>
      ) : (
        <div className="message-list">
          {messages.length > 0 ? (
            messages.map((message) => (
              <div key={message.id} className="card mb-2" style={{ maxWidth: "800px" }}>
                <div className="card-body p-2">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="flex-grow-1">
                      <h6 className="card-title mb-1">
                        <strong>From:</strong> {message.senderUsername}
                      </h6>
                      <p className="card-text mb-1">{message.message}</p>
                    </div>
                    <div className="text-nowrap">
                      <button
                        className="btn btn-secondary btn-sm me-2"
                        onClick={() => handleViewClick(message)}
                      >
                        View
                      </button>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleReplyClick(message.senderId, message.receiverId, message.senderUsername)}
                      >
                        Reply
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <p className="text-muted">No messages found.</p>
          )}
        </div>
      )}



{showComposeModal && (
        <>
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Compose Message</h5>
                  <button type="button" className="btn-close" onClick={handleCloseComposeModal}></button>
                </div>
                <div className="modal-body p-2">
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Receiver's User ID"
                    value={composeReceiverId}
                    onChange={(e) => setComposeReceiverId(e.target.value)}
                  />
                  <textarea
                    className="form-control"
                    placeholder="Type your message..."
                    value={composeMessage}
                    onChange={(e) => setComposeMessage(e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary btn-sm" onClick={handleCloseComposeModal}>
                    Cancel
                  </button>
                  <button type="button" className="btn btn-primary btn-sm" onClick={handleSendMessage}>
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}

      {/* Reply Modal */}
      {showModal && (
        <>
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Reply to  {senderUsername}</h5>
                  <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                </div>
                <div className="modal-body p-2">
                  <textarea
                    className="form-control"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply..."
                    rows={3}
                  />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary btn-sm" onClick={handleCloseModal}>
                    Close
                  </button>
                  <button type="button" className="btn btn-primary btn-sm" onClick={handleSendReply}>
                    Send Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}

      {/* View Message Modal */}
      {showViewModal && selectedMessage && (
        <>
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Message from {selectedMessage.senderUsername}</h5>
                  <button type="button" className="btn-close" onClick={handleCloseViewModal}></button>
                </div>
                <div className="modal-body">
                  <p>{selectedMessage.message}</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary btn-sm" onClick={handleCloseViewModal}>
                    Close
                  </button>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={handleCloseViewModal}>
                    Mark as read
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
}

export default AdminMessageComponent;
