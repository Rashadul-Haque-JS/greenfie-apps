import mongoose from 'mongoose';
import { IProducts } from '@/utils/types';
// Define Products schema
const ProductsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
   
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  }
});

// Check if model is already defined before defining it
// to avoid the "Cannot overwrite model once compiled" error
 const Products = mongoose.models.Products || mongoose.model('Products', ProductsSchema);
   
// Define CRUD operations
export async function createProduct(data:IProducts) {
  const Product = new Products(data);
  await Product.save();
  return Product.toObject();
}

export async function getProducts() {
  const Productss = await Products.find();
  return Productss.map((Products) => Products.toObject());
}

export async function getProduct(id:string) {
  const Product = await Products.findById(id);
  return Product ? Product.toObject() : null;
}

export async function updateProduct(id:string, data:IProducts) {
  const Product = await Products.findByIdAndUpdate(id, data, { new: true });
  return Product ? Product.toObject() : null;
}

export async function deleteProduct(id:string) {
  const Product = await Products.findByIdAndDelete(id);
  return Product ? Product.toObject() : null;
}

export default Products