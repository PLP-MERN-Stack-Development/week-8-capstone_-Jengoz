// frontend/src/components/ProductCard.jsx (TEMPORARY CHANGES)
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="border border-gray-200 rounded-xl shadow-lg overflow-hidden bg-white
                    transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02]
                    border-4 border-red-500"> {/* TEMPORARY: Red border for the card */}
      <Link to={`/product/${product._id}`}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-56 object-cover border-4 border-green-500" // TEMPORARY: Green border for the image
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-xl font-bold text-gray-800 hover:text-blue-600 mb-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-2xl font-extrabold text-gray-900 mt-2">
          KSh {product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;