
# 🛍️ JengoMart E-commerce Platform

JengoMart is a modern, full-stack e-commerce application designed to provide a seamless shopping experience. It features a robust product catalog, an intuitive shopping cart, user authentication, and a visually appealing interface.

## ✨ Features

* **Product Catalog:** Browse a wide range of products with detailed listings.

* **Product Details Page:** View comprehensive product information, including an interactive image gallery.

    * **Dynamic Image Gallery:** Clickable thumbnails to switch the main product image.

* **Shopping Cart:** Add, update quantities, and remove items from your cart.

* **User Authentication:**

    * **User Registration:** Create new accounts.

    * **User Login:** Securely log in to access personalized features.

    * **Conditional Header UI:** Automatically switches between "Sign In" and "Log Out" options based on user authentication status.

    * **User Profile Page:** View and potentially update user information.

    * Automatic redirection for logged-in users from login/register pages.

* **Responsive Design:** Optimized for various screen sizes (desktop, tablet, mobile).

* **Modern UI:** Clean and attractive design using Tailwind CSS, featuring a subtle gradient background for an enhanced visual experience.

## 🚀 Technologies Used

This project is built with a MERN stack (MongoDB, Express.js, React, Node.js) along with other powerful libraries.

**Frontend:**

* **React:** A JavaScript library for building user interfaces.

* **React Router DOM:** For declarative routing in React applications.

* **Axios:** Promise-based HTTP client for making API requests.

* **Tailwind CSS:** A utility-first CSS framework for rapid UI development.

* **Font Awesome:** For scalable vector icons.

* **Vite:** A fast build tool for modern web projects.

**Backend:**

* **Node.js:** JavaScript runtime environment.

* **Express.js:** Web framework for Node.js.

* **MongoDB:** NoSQL database for storing application data.

* **Mongoose:** ODM (Object Data Modeling) library for MongoDB and Node.js.

* **JSON Web Tokens (JWT):** For secure user authentication.

* **Bcrypt.js:** For password hashing.

* **Dotenv:** For loading environment variables.

* **Nodemon:** For automatically restarting the Node.js server during development.

## 📦 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

* **Node.js** (LTS version recommended)

* **pnpm** (preferred package manager) or npm/yarn

    * To install pnpm: `npm install -g pnpm`

* **MongoDB:** Running locally or access to a MongoDB Atlas cluster.

### Installation

1.  **Clone the repository:**

    ```
    git clone <repository_url>
    cd Ecommerce-platform


    ```

2.  **Backend Setup:**
    Navigate into the `server` directory and install dependencies:

    ```
    cd server
    pnpm install


    ```

    Create a `.env` file in the `server` directory and add your environment variables:

    ```
    MONGO_URI=mongodb://127.0.0.1:27017/shopnexus # Or your MongoDB Atlas URI
    JWT_SECRET=your_jwt_secret_key
    NODE_ENV=development
    PORT=5000


    ```

3.  **Frontend Setup:**
    Navigate into the `client` directory and install dependencies:

    ```
    cd ../client
    pnpm install


    ```

### Running the Application

1.  **Start the Backend Server:**
    From the `server` directory:

    ```
    pnpm dev


    ```

    The server will start on `http://localhost:5000`.

2.  **Start the Frontend Development Server:**
    From the `client` directory:

    ```
    pnpm dev


    ```

    The frontend application will typically open in your browser at `http://localhost:5173` (Vite's default port).

The frontend is configured to proxy API requests to the backend, so `axios.get('/api/products')` will correctly hit your Node.js server.

## 💡 Usage

1.  **Browse Products:** Navigate to `/products` to see all available items.

2.  **View Product Details:** Click on any product to see its detailed page, including the image gallery.

3.  **Add to Cart:** Select quantity and add products to your shopping cart.

4.  **Register/Login:**

    * Click "Sign In" in the header to go to the login page.

    * If you don't have an account, click "Register" to create one.

    * Once logged in, the "Sign In" button will change to your username (or "Profile") with a dropdown for "Profile" and "Log Out".

5.  **View Cart:** Click "Cart" in the header to review your selected items.

6.  **User Profile:** Click on your username/profile in the header to view your profile details.

## 📁 Project Structure

Ecommerce-platform/
├── client/                 # Frontend (React) application
│   ├── public/             # Static assets (index.html, favicon, etc.)
│   ├── src/
│   │   ├── assets/         # Images, fonts, etc.
│   │   ├── components/     # Reusable UI components (Header, Footer, ProductImageGallery, etc.)
│   │   ├── context/        # React Contexts (AuthContext, CartContext)
│   │   ├── pages/          # Main application pages (HomePage, ProductPage, LoginPage, etc.)
│   │   ├── App.jsx         # Main React application component
│   │   ├── main.jsx        # Entry point for React app
│   │   └── index.css       # Global CSS (Tailwind imports)
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
├── server/                 # Backend (Node.js/Express) application
│   ├── config/             # Database connection setup
│   ├── controllers/        # Logic for handling API requests
│   ├── middleware/         # Express middleware (e.g., authentication)
│   ├── models/             # Mongoose schemas for MongoDB
│   ├── routes/             # API routes definitions
│   ├── .env                # Environment variables
│   ├── server.js           # Main server file
│   └── package.json
└── README.md               # This file


## 💡 Future Enhancements

* **Product Variants:** Implement options for products (e.g., size, color) that affect price and stock.

* **Advanced Search & Filtering:** Add more robust search capabilities and filtering options (by category, price range, brand, etc.).

* **Product Reviews & Ratings:** Allow users to leave reviews and ratings for products.

* **Checkout Process:** Implement full checkout flow (shipping address, payment integration).

* **Order History:** Allow logged-in users to view their past orders.

* **Admin Dashboard:** A dedicated interface for managing products, orders, and users.

* **Image Uploads:** Implement functionality for admins to upload product images.

* **User Profile Updates:** Enable users to update their personal information from the profile page.

## 🤝 Contributing

Contributions are welcome! If you have suggestions or want to contribute, please feel free to open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details (if you have one, otherwise remove this line).

## 📧 Contact

For any inquiries or feedback, please reach out to \
Moses Jengo , mosesjengo2@gmail.com