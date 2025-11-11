// API route for projects
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getProjects, createProject, updateProject, deleteProject } from '../../lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    switch (req.method) {
      case 'GET': {
        const projects = await getProjects();
        return res.status(200).json(projects);
      }

      case 'POST': {
        const newProject = await createProject(req.body);
        return res.status(201).json(newProject);
      }

      case 'PUT': {
        const { id } = req.query;
        const updatedProject = await updateProject(Number(id), req.body);
        return res.status(200).json(updatedProject);
      }

      case 'DELETE': {
        const { id: deleteId } = req.query;
        await deleteProject(Number(deleteId));
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
