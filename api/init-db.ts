// API route to initialize database tables
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { initializeDatabase } from './_db';

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
      // Check if database URL is available
      const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING;
      
      if (!dbUrl) {
        return res.status(500).json({ 
          error: 'Database connection not configured',
          details: 'DATABASE_URL environment variable is missing. Please connect your Neon database in Vercel Storage settings.',
          availableVars: Object.keys(process.env).filter(k => k.includes('POSTGRES') || k.includes('DATABASE'))
        });
      }

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
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
  }
}
