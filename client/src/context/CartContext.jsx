// frontend/src/context/CartContext.js
import { createContext, useContext, useState, useEffect } from 'react';

// 1. Create the Context object
const CartContext = createContext();

// 2. Create the CartProvider component
export const CartProvider = ({ children }) => {
  // Initialize cart items from localStorage if available, otherwise an empty array
  // This helps persist the cart even after a page refresh
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localCart = localStorage.getItem('cartItems');
      return localCart ? JSON.parse(localCart) : [];
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
      return [];
    }
  });

  // Effect to save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Function to add an item to the cart
  const addToCart = (product, qty) => {
    const itemToAdd = {
      product: product._id, // Store product ID
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
      countInStock: product.countInStock,
      qty: Number(qty) // Ensure quantity is a number
    };

    setCartItems((prevItems) => {
      // Check if the item already exists in the cart
      const existItem = prevItems.find((x) => x.product === itemToAdd.product);

      if (existItem) {
        // If it exists, update its quantity
        return prevItems.map((x) =>
          x.product === existItem.product ? itemToAdd : x
        );
      } else {
        // If it doesn't exist, add the new item
        return [...prevItems, itemToAdd];
      }
    });
  };

  // Function to remove an item from the cart
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product !== id));
  };

  // Function to clear the entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate total items in cart for display in header/icon
  const totalCartItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  // 3. Provide the cart state and functions to children components
  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalCartItems, // Provide total count for header
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 4. Custom hook to easily consume the cart context
export const useCart = () => {
  return useContext(CartContext);
};