import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the form data
    const formData = { name, email, message };

    // Send form data to backend
    fetch('http://localhost:8000/api/contact/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setIsSubmitted(true);
          setName('');
          setEmail('');
          setMessage('');
          setErrorMessage('');
        } else {
          setErrorMessage('Failed to submit the form');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessage('An error occurred. Please try again later.');
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Contact Support</h1>
      <p className="text-center mb-4">We're here to help. Please fill out the form below to contact our support team.</p>
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
        <div className="mb-3">
          <label className="form-label" htmlFor="name">Name:</label>
          <input
            className="form-control"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">Email:</label>
          <input
            className="form-control"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="message">Message:</label>
          <textarea
            className="form-control"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button
          className="btn btn-secondary"
          type="submit"
        >
          Submit
        </button>
        {isSubmitted && (
          <p className="text-success mt-3">Your message has been sent. We'll get back to you soon.</p>
        )}
        {errorMessage && (
          <p className="text-danger mt-3">{errorMessage}</p>
        )}
      </form>
    </div>
  );
};

export default Contact;
