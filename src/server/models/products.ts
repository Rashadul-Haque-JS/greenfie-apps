import mongoose from "mongoose";
import { IProducts } from "@/utils/types";
// Define Products schema
const ProductsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: [true, "Product's unit is not specified"],
  },

  shortDesc: {
    type: String,
    required: [true, "Product's shortDesc is required"],
  },

  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
  },
  inStock: {
    type: Number,
    required: [true, "In stock is not specified"],
  },
  isAvailable: {
    type: Boolean,
    required: [true, "Please select product's availability"],
  },
  ownerId: {
    type: String,
    required: [true, "Server error, pls try again"],
  },
});

// Check if model is already defined before defining it
// to avoid the "Cannot overwrite model once compiled" error
const Products =
  mongoose.models.Products || mongoose.model("Products", ProductsSchema);

export async function getProducts() {
  const productss = await Products.find();
  return productss.map((products) => products.toObject());
}

export async function getProduct(id: string) {
  const product = await Products.findById(id);
  return product ? product.toObject() : null;
}

export async function updateProduct(id: string, data: IProducts) {
  const product = await Products.findByIdAndUpdate(id, data, { new: true });
  return product ? product.toObject() : null;
}

export async function deleteProduct(id: string) {
  const product = await Products.findByIdAndDelete(id);
  return product ? product.toObject() : null;
}

export default Products;
