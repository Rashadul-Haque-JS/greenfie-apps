import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDB from '@/server/connection';
import { createRecipe, getRecipes,getRecipe, updateRecipe, deleteRecipe } from '@/server/models/recipes';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;

   await connectToDB();

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
      try {
        const results = await getRecipes();
        res.status(200).json(results);
      } catch (error) {
        res.status(500).json({ message: 'Error getting Recipes' });
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
    case 'GET':
      try {
        const { id } = query;
        const result = await getRecipe(id as string);
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).json({ message: 'Recipe not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error getting Recipe' });
      }
      break;
    default:
      res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
