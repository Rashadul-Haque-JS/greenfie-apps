import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDB from '@/server/connection';
import { createProduct, getProducts,getProduct, updateProduct, deleteProduct } from '@/server/models/products';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;

   await connectToDB();

  switch (method) {
    case 'POST':
      try {
        const result = await createProduct(body);
        res.status(201).json(result);
      } catch (error) {
        res.status(500).json({ message: 'Error creating Product' });
      }
      break;
    case 'GET':
      try {
        const results = await getProducts();
        res.status(200).json(results);
      } catch (error) {
        res.status(500).json({ message: 'Error getting Products' });
      }
      break;
    case 'PUT':
      try {
        const { id } = query;
        const result = await updateProduct(id as string, body);
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).json({ message: 'Product not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error updating Product' });
      }
      break;
    case 'DELETE':
      try {
        const { id } = query;
        const result = await deleteProduct(id as string);
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).json({ message: 'Product not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error deleting Product' });
      }
      break;
    case 'GET':
      try {
        const { id } = query;
        const result = await getProduct(id as string);
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).json({ message: 'Product not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error getting Product' });
      }
      break;
    default:
      res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
