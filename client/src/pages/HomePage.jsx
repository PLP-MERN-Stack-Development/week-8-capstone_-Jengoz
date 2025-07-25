// frontend/src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white
                          py-16 md:py-24 rounded-lg shadow-xl mb-12 text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
          Discover Your Next Favorite Item
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Explore a world of quality products, curated just for you.
          Shop the latest trends and timeless classics with ease.
        </p>
        <Link
          to="/products" // This button now correctly links to the dedicated product list page
          className="bg-white text-blue-700 font-bold py-3 px-8 rounded-full
                     text-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105"
        >
          Shop All Products
        </Link>
      </section>
      {/* You can add sections like 'Featured Categories' or 'Why Shop With Us' here later */}
      <div className="text-center mt-12">
        <p className="text-gray-600 text-lg">
          Or, <Link to="/products" className="text-blue-600 hover:underline">browse all our amazing products</Link>.
        </p>
      </div>
    </div>
  );
};

export default HomePage;