import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, Modal, Button } from 'react-bootstrap';

const ChatPage = () => {
  const [search, setSearch] = useState('');
  const [chats, setChats] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newChatUser, setNewChatUser] = useState('');
  const [newChatMessage, setNewChatMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/api/chats/')
      .then(response => response.json())
      .then(data => {
        console.log("Fetched chat data:", data);
        setChats(data);
      })
      .catch(error => console.error('Error fetching chats:', error));
  }, []);

  const handleChatClick = (chat) => {
    navigate(`/chat/${chat.id}`, { state: { chat } });
  };

  const handleStartNewChat = () => {
    const newChat = {
      name: newChatUser,
      message: newChatMessage,
    };

    fetch('http://localhost:8000/api/chats/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newChat),
    })
      .then(response => response.json())
      .then(data => {
        console.log("New chat added:", data);
        setChats([...chats, data]); // Update the chat list with the new chat
        setShowModal(false); // Close the modal
        setNewChatUser(''); // Clear the username input
        setNewChatMessage(''); // Clear the message input
      })
      .catch(error => console.error('Error adding new chat:', error));
  };

  return (
    <div className="d-flex flex-column vh-100 bg-light">
      {/* Navbar */}
      <div className="bg-secondary p-3 text-white d-flex justify-content-between align-items-center shadow-sm">
        <h1 className="h4 mb-0">Quickchat</h1>
        <div className="d-flex align-items-center">
          {/* Search Input */}
          <div className="d-flex align-items-center bg-white p-1 rounded me-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ height: '24px', width: '24px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="form-control ms-2 border-0"
            />
          </div>
          {/* Dropdown */}
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Help
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/FAQPage">FAQ</Dropdown.Item>
              <Dropdown.Item href="/Contact">Contact Support</Dropdown.Item>
              <Dropdown.Item href="/about">About Us</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      {/* Chats List */}
      <div className="flex-grow-1 overflow-auto p-4">
        <ul className="list-unstyled">
          {chats
            .filter(chat => chat.name && chat.name.toLowerCase().includes(search.toLowerCase()))
            .map(chat => (
              <li
                key={chat.id}
                className="d-flex align-items-center mb-3 p-2 border rounded"
                onClick={() => handleChatClick(chat)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src="https://picsum.photos/200/300"
                  alt="Profile"
                  className="rounded-circle me-3"
                  style={{ width: '50px', height: '50px' }}
                />
                <div>
                  <h5 className="mb-1">{chat.name}</h5>
                  <p className="text-muted mb-0">{chat.message}</p>
                </div>
              </li>
            ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="bg-secondary p-3 text-white d-flex justify-content-between align-items-center">
        <button className="btn btn-light" onClick={() => setShowModal(true)}>Start New Chat</button>
      </div>

      {/* Modal for adding new chat */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Start New Chat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            value={newChatUser}
            onChange={(e) => setNewChatUser(e.target.value)}
            placeholder="Enter username"
            className="form-control mb-2"
          />
          <textarea
            value={newChatMessage}
            onChange={(e) => setNewChatMessage(e.target.value)}
            placeholder="Enter message"
            className="form-control"
            rows="3"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleStartNewChat}>
            Start Chat
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ChatPage;
