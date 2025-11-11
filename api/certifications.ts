// API route for certifications
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getCertifications, createCertification, updateCertification, deleteCertification } from '../lib/db';

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
        const certifications = await getCertifications();
        return res.status(200).json(certifications);
      }

      case 'POST': {
        const newCert = await createCertification(req.body);
        return res.status(201).json(newCert);
      }

      case 'PUT': {
        const { id } = req.query;
        const updatedCert = await updateCertification(Number(id), req.body);
        return res.status(200).json(updatedCert);
      }

      case 'DELETE': {
        const { id: deleteId } = req.query;
        await deleteCertification(Number(deleteId));
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
