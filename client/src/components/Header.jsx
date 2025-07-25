// frontend/src/components/Header.jsx
import React from 'react'; // Good practice to explicitly import React
import { Link, useNavigate } from 'react-router-dom'; // Ensure useNavigate is imported
import { useAuth } from '../context/AuthContext.jsx'; // Your AuthContext
import { useCart } from '../context/CartContext.jsx'; // Your CartContext

const Header = () => {
  const { userInfo, logout } = useAuth(); // Get userInfo and logout from AuthContext
  const { totalCartItems } = useCart(); // Get totalCartItems from CartContext
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to handle user logout
  const handleLogout = () => {
    logout(); // Call the logout function from your AuthContext
    navigate('/login'); // Redirect to login page after logout (you can change this to '/' or another page)
  };

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Site Title */}
        <Link to="/" className="text-2xl font-bold text-blue-300 hover:text-blue-100 transition-colors duration-200">
          JengoMart
        </Link>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-6 items-center">
            <li>
              <Link to="/products" className="text-white hover:text-gray-300 text-lg">
                Products
              </Link>
            </li>
            <li>
              <Link to="/cart" className="text-white hover:text-gray-300 text-lg relative">
                <i className="fas fa-shopping-cart mr-1"></i> Cart
                {/* Cart item count badge */}
                {totalCartItems > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-1">
                    {totalCartItems}
                  </span>
                )}
              </Link>
            </li>
            {/* Conditional Rendering for Authentication Buttons */}
            <li>
              {userInfo ? (
                // If user is logged in (userInfo object exists)
                // Added 'flex items-center' to the parent 'group' div for better alignment and hover area
                <div className="relative group flex items-center">
                  {/* Button/Link that shows user's name and triggers dropdown */}
                  {/* Added 'py-2' to increase the vertical hover/click area of the button */}
                  <button className="flex items-center text-white hover:text-gray-300 text-lg focus:outline-none py-2">
                    <i className="fas fa-user mr-1"></i> {/* User icon */}
                    {userInfo.name || userInfo.email || 'Profile'} {/* Display user's name or email, or 'Profile' */}
                    <i className="fas fa-caret-down ml-1 text-sm"></i> {/* Dropdown arrow icon */}
                  </button>
                  {/* Dropdown Menu for Profile and Logout */}
                  {/* Changed 'mt-2' to 'top-full' to remove the gap between button and dropdown */}
                  <div className="absolute right-0 top-full w-48 bg-white text-gray-800 rounded-md shadow-lg py-1 z-10
                                opacity-0 group-hover:opacity-100 group-focus-within:opacity-100
                                transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 text-base">Profile</Link>
                    {/* You can add more links here, e.g., to '/myorders' */}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 text-base"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              ) : (
                // If user is NOT logged in (userInfo is null)
                <Link to="/login" className="text-white hover:text-gray-300 text-lg">
                  <i className="fas fa-user mr-1"></i> Sign In
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;