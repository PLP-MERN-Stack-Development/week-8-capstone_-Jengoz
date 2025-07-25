// frontend/src/pages/CartPage.jsx
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx'; // Import useCart hook

const CartPage = () => {
  const { cartItems, removeFromCart, totalCartItems } = useCart(); // Destructure from context

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart ({totalCartItems} items)</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-xl text-gray-600">
          Your cart is empty. <Link to="/products" className="text-blue-600 hover:underline">Go back to products</Link>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border-b pb-3 mb-3 font-semibold text-gray-700">
            <div className="md:col-span-2">Image</div>
            <div className="md:col-span-4">Product</div>
            <div className="md:col-span-2">Price</div>
            <div className="md:col-span-2">Quantity</div>
            <div className="md:col-span-2">Action</div>
          </div>
          {cartItems.map((item) => (
            <div key={item.product} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b py-4">
              <div className="md:col-span-2">
                <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
              </div>
              <div className="md:col-span-4">
                <Link to={`/product/${item.product}`} className="text-lg font-semibold text-blue-600 hover:underline">
                  {item.name}
                </Link>
              </div>
              <div className="md:col-span-2">KSh {item.price.toFixed(2)}</div>
              <div className="md:col-span-2">{item.qty}</div>
              <div className="md:col-span-2">
                <button
                  onClick={() => removeFromCart(item.product)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-6 text-right">
            <h2 className="text-2xl font-bold text-gray-800">
              Subtotal: KSh {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </h2>
            <button
              className="mt-4 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 text-lg font-semibold"
              onClick={() => alert('Proceed to Checkout functionality coming soon!')}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;