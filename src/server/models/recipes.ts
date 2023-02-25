import mongoose from 'mongoose';
import { IRecipe } from '@/utils/types';

// Define Recipes schema
const RecipesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  directions: {
    type: [String],
    required: true,
  },
});

// Check if model is already defined before defining it
// to avoid the "Cannot overwrite model once compiled" error
const Recipes = mongoose.models.Recipes || mongoose.model('Recipes', RecipesSchema);

// Define CRUD operations
export async function createRecipe(data: IRecipe) {
  const recipe = new Recipes(data);
  await recipe.save();
  return recipe.toObject();
}

export async function getRecipes() {
  const recipes = await Recipes.find();
  return recipes.map((recipe) => recipe.toObject());
}

export async function getRecipe(id: string) {
  const recipe = await Recipes.findById(id);
  return recipe ? recipe.toObject() : null;
}

export async function updateRecipe(id: string, data: IRecipe) {
  const recipe = await Recipes.findByIdAndUpdate(id, data, { new: true });
  return recipe ? recipe.toObject() : null;
}

export async function deleteRecipe(id: string) {
  const recipe = await Recipes.findByIdAndDelete(id);
  return recipe ? recipe.toObject() : null;
}

export default Recipes;
