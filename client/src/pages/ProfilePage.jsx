import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import axios from 'axios';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { userInfo, logout } = useAuth(); // Get userInfo and logout function

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login'); // Redirect if not logged in
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      // In a real app, you'd fetch the latest profile from the backend
      // For now, we use info from localStorage/context
      // const fetchProfile = async () => {
      //   try {
      //     const config = {
      //       headers: {
      //         Authorization: `Bearer ${userInfo.token}`,
      //       },
      //     };
      //     const { data } = await axios.get('/api/users/profile', config);
      //     setName(data.name);
      //     setEmail(data.email);
      //   } catch (err) {
      //     console.error("Error fetching profile:", err);
      //     // Handle token expiry/invalid token by logging out
      //     if (err.response && err.response.status === 401) {
      //        logout();
      //        navigate('/login');
      //     }
      //     setError(err.response?.data?.message || err.message);
      //   }
      // };
      // fetchProfile();
    }
  }, [userInfo, navigate, logout]); // Add logout to dependencies

  const submitHandler = (e) => {
    e.preventDefault();
    // This is where you'd handle profile updates (e.g., change name/email/password)
    // For now, we'll just show a success message as the backend update logic isn't built yet.
    setMessage('Profile updated successfully (frontend only for now)!');
    setError(null);
    // Example: axios.put('/api/users/profile', { name, email }, config);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">User Profile</h1>
      {message && <p className="text-green-500 text-center mb-4">{message}</p>}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            id="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {/* Password fields for updating password can be added here later */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;