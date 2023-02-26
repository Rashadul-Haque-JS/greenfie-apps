import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDB from '@/server/connection';
import { createApp, getApps, getApp, updateApp, deleteApp } from '@/server/models/fav-apps';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;

  await connectToDB();

  switch (method) {
    case 'POST':
      try {
        const result = await createApp(body);
        res.status(201).json(result);
      } catch (error) {
        res.status(500).json({ message: 'Error creating FavApp' });
      }
      break;
    case 'GET':
      if (query.id) {
        try {
          const result = await getApp(query.id as string);
          if (result) {
            res.status(200).json(result);
          } else {
            res.status(404).json({ message: 'FavApp not found' });
          }
        } catch (error) {
          res.status(500).json({ message: 'Error getting FavApp' });
        }
      } else {
        try {
          const results = await getApps();
          res.status(200).json(results);
        } catch (error) {
          res.status(500).json({ message: 'Error getting FavApps' });
        }
      }
      break;
    case 'PUT':
      try {
        const { id } = query;
        const result = await updateApp(id as string, body);
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).json({ message: 'FavApp not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error updating FavApp' });
      }
      break;
    case 'DELETE':
      try {
        const { id } = query;
        const result = await deleteApp(id as string);
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).json({ message: 'FavApp not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error deleting FavApp' });
      }
      break;
    default:
      res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
