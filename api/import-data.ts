// API route to import data from localStorage export
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { 
  createProject, createBlog, createCertification, 
  createAchievement, createVolunteering,
  updateProject, updateBlog, updateCertification,
  updateAchievement, updateVolunteering,
  getProjects, getBlogs, getCertifications,
  getAchievements, getVolunteering
} from './_db.js';

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

    // Get existing data to check for duplicates
    const [existingProjects, existingBlogs, existingCerts, existingAchievements, existingVolunteering] = await Promise.all([
      getProjects(),
      getBlogs(),
      getCertifications(),
      getAchievements(),
      getVolunteering()
    ]);

    // Import projects (upsert logic)
    if (data.projects && Array.isArray(data.projects)) {
      for (const project of data.projects) {
        try {
          // Remove id from data when creating
          const { id, ...projectData } = project;
          const existing = existingProjects.find(p => p.id === id);
          
          if (existing) {
            await updateProject(id, projectData);
          } else {
            await createProject(projectData);
          }
          results.projects++;
        } catch (err) {
          console.error('Error importing project:', project.title, err);
        }
      }
    }

    // Import blogs
    if (data.blogs && Array.isArray(data.blogs)) {
      for (const blog of data.blogs) {
        try {
          const { id, ...blogData } = blog;
          const existing = existingBlogs.find(b => b.id === id);
          
          if (existing) {
            await updateBlog(id, blogData);
          } else {
            await createBlog(blogData);
          }
          results.blogs++;
        } catch (err) {
          console.error('Error importing blog:', blog.title, err);
        }
      }
    }

    // Import certifications
    if (data.certifications && Array.isArray(data.certifications)) {
      for (const cert of data.certifications) {
        try {
          const { id, ...certData } = cert;
          const existing = existingCerts.find(c => c.id === id);
          
          if (existing) {
            await updateCertification(id, certData);
          } else {
            await createCertification(certData);
          }
          results.certifications++;
        } catch (err) {
          console.error('Error importing certification:', cert.name, err);
        }
      }
    }

    // Import achievements
    if (data.achievements && Array.isArray(data.achievements)) {
      for (const achievement of data.achievements) {
        try {
          const { id, ...achievementData } = achievement;
          const existing = existingAchievements.find(a => a.id === id);
          
          if (existing) {
            await updateAchievement(id, achievementData);
          } else {
            await createAchievement(achievementData);
          }
          results.achievements++;
        } catch (err) {
          console.error('Error importing achievement:', achievement.title, err);
        }
      }
    }

    // Import volunteering
    if (data.volunteering && Array.isArray(data.volunteering)) {
      for (const vol of data.volunteering) {
        try {
          const { id, ...volData } = vol;
          const existing = existingVolunteering.find(v => v.id === id);
          
          if (existing) {
            await updateVolunteering(id, volData);
          } else {
            await createVolunteering(volData);
          }
          results.volunteering++;
        } catch (err) {
          console.error('Error importing volunteering:', vol.role, err);
        }
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Data imported successfully!',
      ...results
    });
  } catch (error) {
    console.error('Import error:', error);
    return res.status(500).json({ 
      error: 'Failed to import data',
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
  }
}
