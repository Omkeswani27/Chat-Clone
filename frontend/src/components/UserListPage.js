import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const UserListPage = () => {
  const { id } = useParams(); // Get the chat ID from URL parameters
  const location = useLocation(); // Get the location object to access passed state
  const { chat } = location.state || {}; // Get the chat object from location.state

  // State to store chat messages
  const [messages, setMessages] = useState([
    { text: chat?.message, sender: 'other' }, // The first message is assumed to be from the other user
  ]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Fetch messages related to the specific chat
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/chats/${id}/messages/`);
        const data = await response.json();
        
        // Combine existing chat messages with fetched messages if available
        const existingMessages = chat?.messages || [];
        setMessages([...existingMessages, ...data.messages]); // Combine both arrays
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [id, chat]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you can also add logic to send the message to the server if needed
      setMessages([...messages, { text: newMessage, sender: 'me' }]); // Add the new message to the local state
      setNewMessage(''); // Clear input field
    }
  };

  // Handle case when chat object is not found
  if (!chat) {
    return <p>Chat not found</p>;
  }

  return (
    <div className="vh-100 d-flex flex-column bg-light">
      {/* Header */}
      <div className="bg-secondary text-white p-3 d-flex justify-content-start align-items-center">
        <img
          src="https://picsum.photos/50/50"
          alt="User"
          className="rounded-circle me-3"
          style={{ width: '50px', height: '50px' }}
        />
        <h1 className="h5 mb-0">{chat.name}</h1>
      </div>

      {/* Messages Area */}
      <div className="flex-grow-1 overflow-auto p-3">
        <ul className="list-unstyled">
          {messages.map((message, index) => (
            <li
              key={index}
              className={`mb-3 d-flex ${message.sender === 'me' ? 'justify-content-end' : 'justify-content-start'}`}
            >
              <p
                className={`p-2 border rounded ${message.sender === 'me' ? 'bg-secondary text-white' : 'bg-light'}`}
                style={{ maxWidth: '60%' }}
              >
                {message.text}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="p-3 d-flex bg-white border-top">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="btn btn-secondary" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default UserListPage;
