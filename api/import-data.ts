// API route to import data from localStorage export
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { 
  createProject, createBlog, createCertification, 
  createAchievement, createVolunteering 
} from '../../lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;
    const results = {
      projects: 0,
      blogs: 0,
      certifications: 0,
      achievements: 0,
      volunteering: 0
    };

    // Import projects
    if (data.projects && Array.isArray(data.projects)) {
      for (const project of data.projects) {
        await createProject(project);
        results.projects++;
      }
    }

    // Import blogs
    if (data.blogs && Array.isArray(data.blogs)) {
      for (const blog of data.blogs) {
        await createBlog(blog);
        results.blogs++;
      }
    }

    // Import certifications
    if (data.certifications && Array.isArray(data.certifications)) {
      for (const cert of data.certifications) {
        await createCertification(cert);
        results.certifications++;
      }
    }

    // Import achievements
    if (data.achievements && Array.isArray(data.achievements)) {
      for (const achievement of data.achievements) {
        await createAchievement(achievement);
        results.achievements++;
      }
    }

    // Import volunteering
    if (data.volunteering && Array.isArray(data.volunteering)) {
      for (const vol of data.volunteering) {
        await createVolunteering(vol);
        results.volunteering++;
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Data imported successfully!',
      results
    });
  } catch (error) {
    console.error('Import error:', error);
    return res.status(500).json({ 
      error: 'Failed to import data',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
