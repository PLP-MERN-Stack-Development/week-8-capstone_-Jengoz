import mongoose from 'mongoose';

  const productSchema = mongoose.Schema(
    {
      user: { // Who created the product (optional, but good for admin panel later)
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
      name: {
        type: String,
        required: true,
      },
      imageUrl: { // Use imageUrl instead of image
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
        default: 0,
      },
      countInStock: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );

  const Product = mongoose.model('Product', productSchema);

  export default Product;