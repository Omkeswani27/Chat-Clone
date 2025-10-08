import { useState } from 'react'; // Importing useState hook for managing component state
import axios from 'axios'; // Importing axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // To enable navigation after signup

function SignUp() {
  // State variables to track input for username, email, and password
  const [username, setUsername] = useState(''); // State for the username input
  const [email, setEmail] = useState(''); // State for the email input
  const [password, setPassword] = useState(''); // State for the password input
  const navigate = useNavigate(); // Hook to navigate after successful signup

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    // Sends a POST request to the signup API with the username, email, and password
    axios.post('http://127.0.0.1:8000/api/signup/', {
      username,
      email,
      password // Sends data to the backend API
    })
    .then(response => {
      navigate('/login'); // Redirect to the login page upon successful signup
    })
    .catch(error => {
      console.log(error); // Logs any errors that occur during the signup process
      alert('Signup failed, please try again.'); // Alerts the user if signup fails
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-black"> {/* Set background to black */}
      <form className="bg-light p-5 shadow rounded w-100" style={{ maxWidth: '400px' }} onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Sign Up</h2> {/* Title of the form */}

        {/* Username input field */}
        <div className="form-group mb-3">
          <label htmlFor="username">Username</label> {/* Label for username */}
          <input 
            type="text" 
            className="form-control" 
            id="username" 
            placeholder="Enter username" // Placeholder text
            value={username} // Binds the input value to the username state
            onChange={(e) => setUsername(e.target.value)} // Updates state on input change
            required // Makes the field required
          />
        </div>

        {/* Email input field */}
        <div className="form-group mb-3">
          <label htmlFor="email">Email</label> {/* Label for email */}
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            placeholder="Enter email" // Placeholder text
            value={email} // Binds the input value to the email state
            onChange={(e) => setEmail(e.target.value)} // Updates state on input change
            required // Makes the field required
          />
        </div>

        {/* Password input field */}
        <div className="form-group mb-4">
          <label htmlFor="password">Password</label> {/* Label for password */}
          <input 
            type="password" 
            className="form-control" 
            id="password" 
            placeholder="Enter password" // Placeholder text
            value={password} // Binds the input value to the password state
            onChange={(e) => setPassword(e.target.value)} // Updates state on input change
            required // Makes the field required
          />
        </div>

        {/* Submit button */}
        <button type="submit" className="btn btn-secondary w-100">Sign Up</button> {/* Button to submit the form */}
      </form>
    </div>
  );
}

export default SignUp; // Exports the SignUp component for use in other parts of the application
