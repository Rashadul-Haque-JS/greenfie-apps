import type { NextApiRequest, NextApiResponse } from 'next';
import connect from '@/server/connection';
import { createUser, getUsers, getUser, updateUser, deleteUser } from '@/server/models/users';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;

   await connect();

  switch (method) {
    case 'POST':
      try {
        const result = await createUser(body);
        res.status(201).json(result);
      } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
      }
      break;
    case 'GET':
      try {
        const results = await getUsers();
        res.status(200).json(results);
      } catch (error) {
        res.status(500).json({ message: 'Error getting users' });
      }
      break;
    case 'PUT':
      try {
        const { id } = query;
        const result = await updateUser(id as string, body);
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error updating user' });
      }
      break;
    case 'DELETE':
      try {
        const { id } = query;
        const result = await deleteUser(id as string);
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
      }
      break;
    case 'GET':
      try {
        const { id } = query;
        const result = await getUser(id as string);
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error getting user' });
      }
      break;
    default:
      res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
