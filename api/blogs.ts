// API route for blogs
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getBlogs, createBlog, updateBlog, deleteBlog } from '../../lib/db';

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
        const blogs = await getBlogs();
        return res.status(200).json(blogs);
      }

      case 'POST': {
        const newBlog = await createBlog(req.body);
        return res.status(201).json(newBlog);
      }

      case 'PUT': {
        const { id } = req.query;
        const updatedBlog = await updateBlog(Number(id), req.body);
        return res.status(200).json(updatedBlog);
      }

      case 'DELETE': {
        const { id: deleteId } = req.query;
        await deleteBlog(Number(deleteId));
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
