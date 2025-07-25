// frontend/src/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react'; // Import useEffect
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx'; // <--- Corrected import path to .jsx

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // <--- Added loading state

  const { userInfo, login } = useAuth(); // <--- Destructure userInfo and login from AuthContext
  const navigate = useNavigate();

  // Redirect if user is already logged in
  useEffect(() => {
    if (userInfo) {
      navigate('/'); // Redirect to home page (or a dashboard/profile page if you prefer)
    }
  }, [userInfo, navigate]); // Depend on userInfo and navigate

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting
    setError(null); // Clear previous errors

    try {
      // Replace with your actual backend login endpoint
      const { data } = await axios.post('/api/users/login', { email, password });
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
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Sign In</h1>
        {/* Enhanced error message styling */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={submitHandler}>
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
          <div className="mb-6">
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
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 w-full text-lg font-semibold transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed" // Added disabled styles and transition
            disabled={loading} // Disable button when loading
          >
            {loading ? 'Signing In...' : 'Sign In'} {/* Dynamic button text */}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">New Customer?{' '}
            <Link to="/register" className="text-blue-600 hover:underline font-semibold">Register</Link> {/* Added font-semibold */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;