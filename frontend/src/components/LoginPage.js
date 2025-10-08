import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation

function LoginPage() {
  // State to manage username, password, and error messages
  const [username, setUsername] = useState(''); // Stores the username input
  const [password, setPassword] = useState(''); // Stores the password input
  const [error, setError] = useState(''); // Stores the error message
  const navigate = useNavigate(); // useNavigate hook to programmatically navigate to different routes

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    axios.post('http://127.0.0.1:8000/api/login/', { // Send POST request to login API
      username, // Send username and password as request data
      password
    })
    .then(response => {
      if (response.data.success) { // If login is successful based on backend response
        localStorage.setItem('token', response.data.token); // Store the token in localStorage
        navigate('/ChatPage'); // Redirect to home page upon successful login
      } else {
        setError('Invalid username or password.'); // Set error message if credentials are incorrect
      }
    })
    .catch(error => {
      console.log(error);
      setError('An error occurred. Please try again.'); // Generic error handling in case of network or server issues
    });
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-black">
      <form className="bg-light p-5 shadow rounded w-100" style={{ maxWidth: '400px' }} onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Login</h2>
        
        {/* Username Input */}
        <div className="form-group mb-3">
          <label htmlFor="text">Username</label>
          <input 
            type="text" 
            className="form-control" 
            id="username" 
            placeholder="Enter your username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update state as user types
            required // Makes the field required
          />
        </div>
        
        {/* Password Input */}
        <div className="form-group mb-4">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="password" 
            placeholder="Enter your password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update state as user types
            required // Makes the field required
          />
        </div>
        
        {/* Error Message */}
        {error && <div className="text-danger mb-3">{error}</div>} {/* Conditionally display error message */}
        
        {/* Submit Button */}
        <button type="submit" className="btn btn-secondary w-100">Login</button>
        
        {/* Sign Up Link */}
        <p className="text-center mt-3">
          Don't have an account? 
          <a href="/signup" className="text-primary"> Sign Up</a> {/* Link to sign-up page */}
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
