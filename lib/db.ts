// Database configuration for Vercel Postgres
import { sql } from '@vercel/postgres';

// Initialize database tables
export async function initializeDatabase() {
  try {
    // Projects table
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        description TEXT NOT NULL,
        long_description TEXT,
        images TEXT[],
        technologies TEXT[],
        github_url TEXT,
        live_url TEXT,
        demo_url TEXT,
        featured BOOLEAN DEFAULT false,
        date TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Blogs table
    await sql`
      CREATE TABLE IF NOT EXISTS blogs (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL,
        author TEXT NOT NULL,
        date TEXT NOT NULL,
        tags TEXT[],
        image TEXT,
        read_time TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Certifications table
    await sql`
      CREATE TABLE IF NOT EXISTS certifications (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        issuer TEXT NOT NULL,
        date TEXT NOT NULL,
        credential_url TEXT,
        description TEXT,
        category TEXT,
        image TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Achievements table
    await sql`
      CREATE TABLE IF NOT EXISTS achievements (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        date TEXT NOT NULL,
        type TEXT NOT NULL,
        icon TEXT,
        image TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Volunteering table
    await sql`
      CREATE TABLE IF NOT EXISTS volunteering (
        id SERIAL PRIMARY KEY,
        role TEXT NOT NULL,
        organization TEXT NOT NULL,
        location TEXT,
        period TEXT NOT NULL,
        description TEXT NOT NULL,
        image TEXT,
        events JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

// Projects CRUD operations
export async function getProjects() {
  const { rows } = await sql`SELECT * FROM projects ORDER BY date DESC`;
  return rows;
}

export async function createProject(project: any) {
  const { rows } = await sql`
    INSERT INTO projects (
      title, category, description, long_description, 
      images, technologies, github_url, live_url, demo_url, 
      featured, date
    ) VALUES (
      ${project.title}, ${project.category}, ${project.description}, 
      ${project.longDescription}, ${project.images}, ${project.technologies}, 
      ${project.githubUrl}, ${project.liveUrl}, ${project.demoUrl}, 
      ${project.featured}, ${project.date}
    ) RETURNING *
  `;
  return rows[0];
}

export async function updateProject(id: number, project: any) {
  const { rows } = await sql`
    UPDATE projects SET
      title = ${project.title},
      category = ${project.category},
      description = ${project.description},
      long_description = ${project.longDescription},
      images = ${project.images},
      technologies = ${project.technologies},
      github_url = ${project.githubUrl},
      live_url = ${project.liveUrl},
      demo_url = ${project.demoUrl},
      featured = ${project.featured},
      date = ${project.date},
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0];
}

export async function deleteProject(id: number) {
  await sql`DELETE FROM projects WHERE id = ${id}`;
}

// Blogs CRUD operations
export async function getBlogs() {
  const { rows } = await sql`SELECT * FROM blogs ORDER BY date DESC`;
  return rows;
}

export async function createBlog(blog: any) {
  const { rows } = await sql`
    INSERT INTO blogs (
      title, excerpt, content, author, date, tags, image, read_time
    ) VALUES (
      ${blog.title}, ${blog.excerpt}, ${blog.content}, 
      ${blog.author}, ${blog.date}, ${blog.tags}, 
      ${blog.image}, ${blog.readTime}
    ) RETURNING *
  `;
  return rows[0];
}

export async function updateBlog(id: number, blog: any) {
  const { rows } = await sql`
    UPDATE blogs SET
      title = ${blog.title},
      excerpt = ${blog.excerpt},
      content = ${blog.content},
      author = ${blog.author},
      date = ${blog.date},
      tags = ${blog.tags},
      image = ${blog.image},
      read_time = ${blog.readTime},
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0];
}

export async function deleteBlog(id: number) {
  await sql`DELETE FROM blogs WHERE id = ${id}`;
}

// Certifications CRUD operations
export async function getCertifications() {
  const { rows } = await sql`SELECT * FROM certifications ORDER BY date DESC`;
  return rows;
}

export async function createCertification(cert: any) {
  const { rows } = await sql`
    INSERT INTO certifications (
      name, issuer, date, credential_url, description, category, image
    ) VALUES (
      ${cert.name}, ${cert.issuer}, ${cert.date}, 
      ${cert.credentialUrl}, ${cert.description}, 
      ${cert.category}, ${cert.image}
    ) RETURNING *
  `;
  return rows[0];
}

export async function updateCertification(id: number, cert: any) {
  const { rows } = await sql`
    UPDATE certifications SET
      name = ${cert.name},
      issuer = ${cert.issuer},
      date = ${cert.date},
      credential_url = ${cert.credentialUrl},
      description = ${cert.description},
      category = ${cert.category},
      image = ${cert.image},
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0];
}

export async function deleteCertification(id: number) {
  await sql`DELETE FROM certifications WHERE id = ${id}`;
}

// Achievements CRUD operations
export async function getAchievements() {
  const { rows } = await sql`SELECT * FROM achievements ORDER BY date DESC`;
  return rows;
}

export async function createAchievement(achievement: any) {
  const { rows } = await sql`
    INSERT INTO achievements (
      title, description, date, type, icon, image
    ) VALUES (
      ${achievement.title}, ${achievement.description}, ${achievement.date}, 
      ${achievement.type}, ${achievement.icon}, ${achievement.image}
    ) RETURNING *
  `;
  return rows[0];
}

export async function updateAchievement(id: number, achievement: any) {
  const { rows } = await sql`
    UPDATE achievements SET
      title = ${achievement.title},
      description = ${achievement.description},
      date = ${achievement.date},
      type = ${achievement.type},
      icon = ${achievement.icon},
      image = ${achievement.image},
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0];
}

export async function deleteAchievement(id: number) {
  await sql`DELETE FROM achievements WHERE id = ${id}`;
}

// Volunteering CRUD operations
export async function getVolunteering() {
  const { rows } = await sql`SELECT * FROM volunteering ORDER BY period DESC`;
  return rows;
}

export async function createVolunteering(volunteering: any) {
  const { rows } = await sql`
    INSERT INTO volunteering (
      role, organization, location, period, description, image, events
    ) VALUES (
      ${volunteering.role}, ${volunteering.organization}, ${volunteering.location}, 
      ${volunteering.period}, ${volunteering.description}, 
      ${volunteering.image}, ${JSON.stringify(volunteering.events)}
    ) RETURNING *
  `;
  return rows[0];
}

export async function updateVolunteering(id: number, volunteering: any) {
  const { rows } = await sql`
    UPDATE volunteering SET
      role = ${volunteering.role},
      organization = ${volunteering.organization},
      location = ${volunteering.location},
      period = ${volunteering.period},
      description = ${volunteering.description},
      image = ${volunteering.image},
      events = ${JSON.stringify(volunteering.events)},
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0];
}

export async function deleteVolunteering(id: number) {
  await sql`DELETE FROM volunteering WHERE id = ${id}`;
}
