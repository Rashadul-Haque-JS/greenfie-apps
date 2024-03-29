import type { NextApiRequest, NextApiResponse } from 'next';
import { createRecipe, getRecipes, getRecipe, updateRecipe, deleteRecipe } from '@/server/models/recipes';

const recipeHandler=async(req: NextApiRequest, res: NextApiResponse) =>{
  const { method, body, query } = req;

  switch (method) {
    case 'POST':
      try {
        const result = await createRecipe(body);
        res.status(201).json(result);
      } catch (error) {
        res.status(500).json({ message: 'Error creating Recipe' });
      }
      break;
    case 'GET':
      if (query.id) {
        try {
          const result = await getRecipe(query.id as string);
          if (result) {
            res.status(200).json(result);
          } else {
            res.status(404).json({ message: 'Recipe not found' });
          }
        } catch (error) {
          res.status(500).json({ message: 'Error getting Recipe' });
        }
      } else {
        try {
          const results = await getRecipes();
          res.status(200).json(results);
        } catch (error) {
          res.status(500).json({ message: 'Error getting Recipes' });
        }
      }
      break;
    case 'PUT':
      try {
        const { id } = query;
        const result = await updateRecipe(id as string, body);
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).json({ message: 'Recipe not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error updating Recipe' });
      }
      break;
    case 'DELETE':
      try {
        const { id } = query;
        const result = await deleteRecipe(id as string);
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).json({ message: 'Recipe not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error deleting Recipe' });
      }
      break;
    default:
      res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default recipeHandler