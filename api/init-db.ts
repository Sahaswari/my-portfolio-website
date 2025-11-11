// API route to initialize database tables
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { initializeDatabase } from '../lib/db';

export const config = {
  runtime: 'nodejs',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      await initializeDatabase();
      return res.status(200).json({ 
        success: true, 
        message: 'Database tables created successfully!' 
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Database initialization error:', error);
    return res.status(500).json({ 
      error: 'Failed to initialize database',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
