// API route for volunteering
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getVolunteering, createVolunteering, updateVolunteering, deleteVolunteering } from './_db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    switch (req.method) {
      case 'GET': {
        const volunteering = await getVolunteering();
        return res.status(200).json(volunteering);
      }

      case 'POST': {
        const newVolunteering = await createVolunteering(req.body);
        return res.status(201).json(newVolunteering);
      }

      case 'PUT': {
        const { id } = req.query;
        const updatedVolunteering = await updateVolunteering(Number(id), req.body);
        return res.status(200).json(updatedVolunteering);
      }

      case 'DELETE': {
        const { id: deleteId } = req.query;
        await deleteVolunteering(Number(deleteId));
        return res.status(204).end();
      }

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
