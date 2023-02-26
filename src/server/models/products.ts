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
  const product = new Products(data);
  await product.save();
  return product.toObject();
}

export async function getProducts() {
  const productss = await Products.find();
  return productss.map((products) => products.toObject());
}

export async function getProduct(id:string) {
  const product = await Products.findById(id);
  return product ? product.toObject() : null;
}

export async function updateProduct(id:string, data:IProducts) {
  const product = await Products.findByIdAndUpdate(id, data, { new: true });
  return product ? product.toObject() : null;
}

export async function deleteProduct(id:string) {
  const product = await Products.findByIdAndDelete(id);
  return product ? product.toObject() : null;
}

export default Products