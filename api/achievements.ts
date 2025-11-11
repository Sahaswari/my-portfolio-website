// API route for achievements
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getAchievements, createAchievement, updateAchievement, deleteAchievement } from './_db.js';

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
        const achievements = await getAchievements();
        return res.status(200).json(achievements);
      }

      case 'POST': {
        const newAchievement = await createAchievement(req.body);
        return res.status(201).json(newAchievement);
      }

      case 'PUT': {
        const { id } = req.query;
        const updatedAchievement = await updateAchievement(Number(id), req.body);
        return res.status(200).json(updatedAchievement);
      }

      case 'DELETE': {
        const { id: deleteId } = req.query;
        await deleteAchievement(Number(deleteId));
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
