// client/src/components/ProductImageGallery.jsx
import React, { useState } from 'react';
import './ProductImageGallery.css'; // We'll create this CSS file next

const ProductImageGallery = ({ images }) => {
  // If no images are provided, use a placeholder
  const defaultImage = 'https://via.placeholder.com/600x400?text=No+Image';
  const [mainImage, setMainImage] = useState(images && images.length > 0 ? images[0] : defaultImage);

  // If images array is empty or null, provide a fallback for thumbnails
  const displayImages = images && images.length > 0 ? images : [defaultImage];

  return (
    <div className="product-image-gallery">
      <div className="main-image-container">
        <img src={mainImage} alt="Main product view" className="main-product-image" />
      </div>

      <div className="thumbnail-container">
        {displayImages.map((image, index) => (
          <img
            key={index} // Consider using a unique ID if images are dynamic and can reorder
            src={image}
            alt={`Product thumbnail ${index + 1}`}
            className={`thumbnail-image ${image === mainImage ? 'active' : ''}`}
            onClick={() => setMainImage(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;