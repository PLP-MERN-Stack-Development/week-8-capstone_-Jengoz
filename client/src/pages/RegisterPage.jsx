// frontend/src/pages/RegisterPage.jsx
import React, { useState, useEffect } from 'react'; // Import useEffect
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx'; // <--- Corrected import path to .jsx

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null); // For success messages (e.g., "Passwords do not match" if not an error)
  const [error, setError] = useState(null);     // For API errors
  const [loading, setLoading] = useState(false); // <--- Added loading state

  const navigate = useNavigate();
  const { userInfo, login } = useAuth(); // <--- Destructure userInfo and login from AuthContext

  // Redirect if user is already logged in
  useEffect(() => {
    if (userInfo) {
      navigate('/'); // Redirect to home page (or a dashboard/profile page if you prefer)
    }
  }, [userInfo, navigate]); // Depend on userInfo and navigate

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting
    setMessage(null); // Clear previous messages
    setError(null);   // Clear previous errors

    if (password !== confirmPassword) {
      setError('Passwords do not match'); // Use setError for this validation message
      setLoading(false);
      return;
    }

    try {
      // Your backend registration endpoint
      const { data } = await axios.post('/api/users/register', { name, email, password }); // Corrected path to /api/users/register
      login(data); // Call login from context to update state and localStorage
      // Redirection is now handled by the useEffect hook
    } catch (err) {
      setError(err.response && err.response.data.message
        ? err.response.data.message // Backend provided error message
        : err.message); // Generic error message
    } finally {
      setLoading(false); // Set loading to false after request completes
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 flex justify-center items-center min-h-[calc(100vh-150px)]">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Register</h1>
        {/* Enhanced message/error message styling */}
        {message && (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4" role="alert">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              id="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-blue-500 focus:border-blue-500" // Added focus styles
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-blue-500 focus:border-blue-500" // Added focus styles
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:ring-blue-500 focus:border-blue-500" // Added focus styles
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:ring-blue-500 focus:border-blue-500" // Added focus styles
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 w-full text-lg font-semibold transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed" // Added disabled styles and transition
            disabled={loading} // Disable button when loading
          >
            {loading ? 'Registering...' : 'Register'} {/* Dynamic button text */}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">Have an Account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline font-semibold">Login</Link> {/* Added font-semibold */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;