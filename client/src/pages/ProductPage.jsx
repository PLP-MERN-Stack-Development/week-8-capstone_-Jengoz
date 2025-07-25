// frontend/src/pages/ProductPage.jsx
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext.jsx';
import ProductImageGallery from '../components/ProductImageGallery.jsx'; // <--- Import the new Image Gallery component

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true); // Set loading true before fetch
        const { data } = await axios.get(`/api/products/${id}`);

        // --- IMPORTANT: MOCKING MULTIPLE IMAGES FOR TESTING ---
        // If your backend currently only provides 'imageUrl',
        // augment the product object with an 'images' array for the gallery.
        // This is crucial until your backend supports an 'images' array.
        if (!data.images || !Array.isArray(data.images) || data.images.length === 0) {
          data.images = [
            data.imageUrl || 'https://via.placeholder.com/600x400?text=Product+Image+1',
            'https://via.placeholder.com/600x400?text=Product+Image+2',
            'https://via.placeholder.com/600x400?text=Product+Image+3',
            // Add more placeholder images if needed
          ];
          // Ensure the original imageUrl is always the first if it exists
          if (data.imageUrl && data.images[0] !== data.imageUrl) {
              data.images.unshift(data.imageUrl);
          }
        }
        // --- END MOCKING ---

        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, qty);
    navigate('/cart');
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Link to="/products" className="text-blue-600 hover:underline mb-4 inline-block text-lg font-semibold">&larr; Go Back to Products</Link>
      {loading ? (
        <p className="text-center text-xl text-blue-600">Loading product details...</p>
      ) : error ? (
        <p className="text-center text-red-600 text-xl">Error: {error}</p>
      ) : product ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-lg">
          {/* Replace your single img tag with the ProductImageGallery */}
          <div className="product-image-section"> {/* Added a div for section structure */}
            <ProductImageGallery images={product.images} />
          </div>
          {/* Rest of your product info section */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-4 text-gray-800">{product.name}</h1>
              <p className="text-gray-700 text-lg mb-4 leading-relaxed">{product.description}</p>
              <p className="text-3xl font-extrabold text-blue-700 mb-4">KSh {product.price.toFixed(2)}</p>
              <p className="text-gray-600 text-lg mb-4">
                Status: {product.countInStock > 0 ? (
                  <span className="text-green-600 font-semibold">In Stock ({product.countInStock})</span>
                ) : (
                  <span className="text-red-600 font-semibold">Out Of Stock</span>
                )}
              </p>

              {product.countInStock > 0 && (
                <div className="flex items-center mb-4">
                  <span className="text-gray-700 mr-3 text-lg font-medium">Qty:</span>
                  <select
                    className="form-select border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {product.countInStock > 0 && (
              <button
                className="bg-blue-600 text-white px-6 py-3 rounded-md
                          hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
                          text-lg font-semibold transition duration-200"
                onClick={handleAddToCart}
                disabled={product.countInStock === 0}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-xl text-gray-600">Product not found.</p>
      )}
    </div>
  );
};

export default ProductPage;