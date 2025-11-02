import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiLogOut, FiSave } from 'react-icons/fi';
import type { Project } from '../data/projects';

interface AdminUser {
  username: string;
  password: string;
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  image: string;
  readTime: string;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  date: string;
  type: 'award' | 'certification' | 'competition' | 'publication';
  icon: string;
}

interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  description?: string;
}

type ContentItem = Project | BlogPost | Achievement | Certification;

const ADMIN_CREDENTIALS: AdminUser = {
  username: import.meta.env.VITE_ADMIN_USERNAME || 'admin',
  password: import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'
};

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'projects' | 'blogs' | 'achievements' | 'certifications'>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  const loadData = () => {
    const savedProjects = localStorage.getItem('portfolioProjects');
    const savedBlogs = localStorage.getItem('portfolioBlogs');
    const savedAchievements = localStorage.getItem('portfolioAchievements');
    const savedCertifications = localStorage.getItem('portfolioCertifications');

    if (savedProjects) setProjects(JSON.parse(savedProjects));
    if (savedBlogs) setBlogs(JSON.parse(savedBlogs));
    if (savedAchievements) setAchievements(JSON.parse(savedAchievements));
    if (savedCertifications) setCertifications(JSON.parse(savedCertifications));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      loadData();
    } else {
      alert('Invalid credentials!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
    setUsername('');
    setPassword('');
  };

  const saveData = (type: 'projects' | 'blogs' | 'achievements' | 'certifications', data: ContentItem[]) => {
    const key = `portfolio${type.charAt(0).toUpperCase() + type.slice(1)}`;
    localStorage.setItem(key, JSON.stringify(data));
    
    if (type === 'projects') setProjects(data as Project[]);
    else if (type === 'blogs') setBlogs(data as BlogPost[]);
    else if (type === 'achievements') setAchievements(data as Achievement[]);
    else setCertifications(data as Certification[]);
  };

  const handleAdd = () => {
    let newItem: ContentItem;
    
    if (activeTab === 'projects') {
      newItem = {
        id: Date.now(),
        title: '',
        category: 'AI/ML',
        description: '',
        longDescription: '',
        image: '',
        technologies: [],
        githubUrl: '',
        liveUrl: '',
        featured: false,
        date: new Date().toISOString().split('T')[0]
      };
    } else if (activeTab === 'blogs') {
      newItem = {
        id: Date.now(),
        title: '',
        excerpt: '',
        content: '',
        author: 'Sahaswari Samoda',
        date: new Date().toISOString().split('T')[0],
        tags: [],
        image: '',
        readTime: '5 min read'
      };
    } else if (activeTab === 'achievements') {
      newItem = {
        id: Date.now(),
        title: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        type: 'award',
        icon: 'FiAward'
      };
    } else {
      // certifications
      newItem = {
        id: Date.now(),
        name: '',
        issuer: '',
        date: new Date().toISOString().split('T')[0],
        credentialUrl: '',
        description: ''
      };
    }
    
    setEditingItem(newItem);
    setIsAddingNew(true);
  };

  const handleSave = () => {
    if (!editingItem) return;

    let updatedData: ContentItem[];
    
    if (activeTab === 'projects') {
      if (isAddingNew) {
        updatedData = [...projects, editingItem];
      } else {
        updatedData = projects.map(p => p.id === editingItem.id ? editingItem : p);
      }
      saveData('projects', updatedData);
    } else if (activeTab === 'blogs') {
      if (isAddingNew) {
        updatedData = [...blogs, editingItem];
      } else {
        updatedData = blogs.map(b => b.id === editingItem.id ? editingItem : b);
      }
      saveData('blogs', updatedData);
    } else if (activeTab === 'achievements') {
      if (isAddingNew) {
        updatedData = [...achievements, editingItem];
      } else {
        updatedData = achievements.map(a => a.id === editingItem.id ? editingItem : a);
      }
      saveData('achievements', updatedData);
    } else {
      // certifications
      if (isAddingNew) {
        updatedData = [...certifications, editingItem];
      } else {
        updatedData = certifications.map(c => c.id === editingItem.id ? editingItem : c);
      }
      saveData('certifications', updatedData);
    }

    setEditingItem(null);
    setIsAddingNew(false);
  };

  const handleDelete = (id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    if (activeTab === 'projects') {
      saveData('projects', projects.filter(p => p.id !== id));
    } else if (activeTab === 'blogs') {
      saveData('blogs', blogs.filter(b => b.id !== id));
    } else if (activeTab === 'achievements') {
      saveData('achievements', achievements.filter(a => a.id !== id));
    } else {
      saveData('certifications', certifications.filter(c => c.id !== id));
    }
  };

  const handleEdit = (item: ContentItem) => {
    setEditingItem({ ...item });
    setIsAddingNew(false);
  };

  const handleCancel = () => {
    setEditingItem(null);
    setIsAddingNew(false);
  };

  const updateField = (field: string, value: string | number | boolean | string[]) => {
    if (editingItem) {
      setEditingItem({ ...editingItem, [field]: value });
    }
  };

  const getCurrentData = () => {
    if (activeTab === 'projects') return projects;
    if (activeTab === 'blogs') return blogs;
    if (activeTab === 'achievements') return achievements;
    return certifications;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <div className="bg-primary p-8 rounded-xl shadow-2xl w-full max-w-md border border-neutral-800">
          <h1 className="text-3xl font-bold text-white mb-6 text-center font-serif">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-neutral-300 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 bg-secondary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border border-neutral-700"
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <label className="block text-neutral-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-secondary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border border-neutral-700"
                placeholder="Enter password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-accent hover:bg-opacity-90 text-secondary font-bold py-2 rounded-lg transition-colors"
            >
              Login
            </button>
          </form>
          <p className="text-neutral-500 text-sm mt-4 text-center">
            Default: admin / admin123
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary text-white">
      {/* Header */}
      <header className="bg-primary border-b border-neutral-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold font-serif">Portfolio Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'projects'
                ? 'bg-accent text-secondary'
                : 'bg-primary text-neutral-300 hover:bg-neutral-800'
            }`}
          >
            Projects ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'blogs'
                ? 'bg-accent text-secondary'
                : 'bg-primary text-neutral-300 hover:bg-neutral-800'
            }`}
          >
            Blogs ({blogs.length})
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'achievements'
                ? 'bg-accent text-secondary'
                : 'bg-primary text-neutral-300 hover:bg-neutral-800'
            }`}
          >
            Achievements ({achievements.length})
          </button>
          <button
            onClick={() => setActiveTab('certifications')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'certifications'
                ? 'bg-accent text-secondary'
                : 'bg-primary text-neutral-300 hover:bg-neutral-800'
            }`}
          >
            Certifications ({certifications.length})
          </button>
        </div>

        {/* Add Button */}
        {!editingItem && (
          <button
            onClick={handleAdd}
            className="mb-6 flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
          >
            <FiPlus />
            Add New {activeTab === 'projects' ? 'Project' : activeTab === 'blogs' ? 'Blog' : activeTab === 'achievements' ? 'Achievement' : 'Certification'}
          </button>
        )}

        {/* Edit Form */}
        {editingItem && (
          <div className="bg-primary p-6 rounded-xl mb-6 border border-neutral-800">
            <h2 className="text-xl font-bold mb-4 font-serif">
              {isAddingNew ? 'Add New' : 'Edit'} {activeTab === 'projects' ? 'Project' : activeTab === 'blogs' ? 'Blog' : activeTab === 'achievements' ? 'Achievement' : 'Certification'}
            </h2>
            
            {activeTab === 'projects' && editingItem && 'category' in editingItem && (
              <ProjectForm item={editingItem as Project} updateField={updateField} />
            )}
            
            {activeTab === 'blogs' && editingItem && 'excerpt' in editingItem && (
              <BlogForm item={editingItem as BlogPost} updateField={updateField} />
            )}
            
            {activeTab === 'achievements' && editingItem && 'type' in editingItem && (
              <AchievementForm item={editingItem as Achievement} updateField={updateField} />
            )}

            {activeTab === 'certifications' && editingItem && 'issuer' in editingItem && (
              <CertificationForm item={editingItem as Certification} updateField={updateField} />
            )}

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2 bg-accent hover:bg-opacity-90 text-secondary font-bold rounded-lg transition-colors"
              >
                <FiSave />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* List */}
        <div className="grid gap-4">
          {getCurrentData().map((item) => (
            <div key={item.id} className="bg-primary p-4 rounded-lg border border-neutral-800 flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold">
                  {'title' in item ? item.title : 'name' in item ? item.name : ''}
                </h3>
                <p className="text-neutral-400 text-sm mt-1">
                  {'description' in item ? item.description : 'excerpt' in item ? item.excerpt : 'issuer' in item ? item.issuer : ''}
                </p>
                <p className="text-neutral-500 text-xs mt-2">{item.date}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 bg-accent hover:bg-opacity-90 text-secondary rounded-lg transition-colors"
                >
                  <FiEdit2 />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
          
          {getCurrentData().length === 0 && !editingItem && (
            <p className="text-center text-neutral-500 py-8">
              No {activeTab} added yet. Click "Add New" to get started.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// Project Form Component
interface ProjectFormProps {
  item: Project;
  updateField: (field: string, value: string | number | boolean | string[]) => void;
}

function ProjectForm({ item: project, updateField }: ProjectFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-neutral-300 mb-2">Title *</label>
        <input
          type="text"
          value={project.title}
          onChange={(e) => updateField('title', e.target.value)}
          className="w-full px-4 py-2 bg-secondary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border border-neutral-700"
          required
        />
      </div>
      
      <div>
        <label className="block text-neutral-300 mb-2">Category *</label>
        <select
          value={project.category}
          onChange={(e) => updateField('category', e.target.value)}
          className="w-full px-4 py-2 bg-secondary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border border-neutral-700"
        >
          <option value="AI/ML">AI/ML</option>
          <option value="Web Development">Web Development</option>
          <option value="Mobile">Mobile</option>
          <option value="Data Science">Data Science</option>
          <option value="Other">Other</option>
        </select>
      </div>
      
      <div>
        <label className="block text-neutral-300 mb-2">Short Description *</label>
        <textarea
          value={project.description}
          onChange={(e) => updateField('description', e.target.value)}
          className="w-full px-4 py-2 bg-secondary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border border-neutral-700"
          rows={2}
          required
        />
      </div>
      
      <div>
        <label className="block text-neutral-300 mb-2">Long Description</label>
        <textarea
          value={project.longDescription}
          onChange={(e) => updateField('longDescription', e.target.value)}
          className="w-full px-4 py-2 bg-secondary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border border-neutral-700"
          rows={4}
        />
      </div>
      
      <div>
        <label className="block text-neutral-300 mb-2">Image URL</label>
        <input
          type="text"
          value={project.image}
          onChange={(e) => updateField('image', e.target.value)}
          className="w-full px-4 py-2 bg-secondary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border border-neutral-700"
          placeholder="/projects/project-name.jpg"
        />
      </div>
      
      <div>
        <label className="block text-neutral-300 mb-2">Technologies (comma-separated)</label>
        <input
          type="text"
          value={Array.isArray(project.technologies) ? project.technologies.join(', ') : ''}
          onChange={(e) => updateField('technologies', e.target.value.split(',').map((t: string) => t.trim()))}
          className="w-full px-4 py-2 bg-secondary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border border-neutral-700"
          placeholder="React, Node.js, MongoDB"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-neutral-300 mb-2">GitHub URL</label>
          <input
            type="url"
            value={project.githubUrl || ''}
            onChange={(e) => updateField('githubUrl', e.target.value)}
            className="w-full px-4 py-2 bg-secondary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border border-neutral-700"
          />
        </div>
        
        <div>
          <label className="block text-neutral-300 mb-2">Live URL</label>
          <input
            type="url"
            value={project.liveUrl || ''}
            onChange={(e) => updateField('liveUrl', e.target.value)}
            className="w-full px-4 py-2 bg-secondary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border border-neutral-700"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={project.featured}
          onChange={(e) => updateField('featured', e.target.checked)}
          className="w-4 h-4"
        />
        <label className="text-neutral-300">Featured Project</label>
      </div>
      
      <div>
        <label className="block text-neutral-300 mb-2">Date</label>
        <input
          type="date"
          value={project.date}
          onChange={(e) => updateField('date', e.target.value)}
          className="w-full px-4 py-2 bg-secondary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border border-neutral-700"
        />
      </div>
    </div>
  );
}

// Blog Form Component
interface BlogFormProps {
  item: BlogPost;
  updateField: (field: string, value: string | number | boolean | string[]) => void;
}

function BlogForm({ item: blog, updateField }: BlogFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-neutral-300 mb-2">Title *</label>
        <input
          type="text"
          value={blog.title}
          onChange={(e) => updateField('title', e.target.value)}
          className="w-full px-4 py-2 bg-secondary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border border-neutral-700"
          required
        />
      </div>
      
      <div>
        <label className="block text-neutral-300 mb-2">Excerpt *</label>
        <textarea
          value={blog.excerpt}
          onChange={(e) => updateField('excerpt', e.target.value)}
          className="w-full px-4 py-2 bg-secondary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border border-neutral-700"
          rows={2}
          required
        />
      </div>
      
      <div>
        <label className="block text-neutral-300 mb-2">Content *</label>
        <textarea
          value={blog.content}
          onChange={(e) => updateField('content', e.target.value)}
          className="w-full px-4 py-2 bg-secondary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border border-neutral-700"
          rows={8}
          required
        />
      </div>
      
      <div>
        <label className="block text-neutral-300 mb-2">Author</label>
        <input
          type="text"
          value={blog.author}
          onChange={(e) => updateField('author', e.target.value)}
          className="w-full px-4 py-2 bg-secondary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border border-neutral-700"
        />
      </div>
      
      <div>
        <label className="block text-neutral-300 mb-2">Tags (comma-separated)</label>
        <input
          type="text"
          value={Array.isArray(blog.tags) ? blog.tags.join(', ') : ''}
          onChange={(e) => updateField('tags', e.target.value.split(',').map((t: string) => t.trim()))}
          className="w-full px-4 py-2 bg-secondary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border border-neutral-700"
          placeholder="AI, Machine Learning, Tutorial"
        />
      </div>
      
      <div>
        <label className="block text-neutral-300 mb-2">Image URL</label>
        <input
          type="text"
          value={blog.image}
          onChange={(e) => updateField('image', e.target.value)}
          className="w-full px-4 py-2 bg-secondary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border border-neutral-700"
          placeholder="/blog/blog-image.jpg"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-neutral-300 mb-2">Read Time</label>
          <input
            type="text"
            value={blog.readTime}
            onChange={(e) => updateField('readTime', e.target.value)}
            className="w-full px-4 py-2 bg-secondary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border border-neutral-700"
            placeholder="5 min read"
          />
        </div>
        
        <div>
          <label className="block text-neutral-300 mb-2">Date</label>
          <input
            type="date"
            value={blog.date}
            onChange={(e) => updateField('date', e.target.value)}
            className="w-full px-4 py-2 bg-secondary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border border-neutral-700"
          />
        </div>
      </div>
    </div>
  );
}

// Achievement Form Component
interface AchievementFormProps {
  item: Achievement;
  updateField: (field: string, value: string | number | boolean | string[]) => void;
}

function AchievementForm({ item: achievement, updateField }: AchievementFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-neutral-300 mb-2">Title *</label>
        <input
          type="text"
          value={achievement.title}
          onChange={(e) => updateField('title', e.target.value)}
          className="w-full px-4 py-2 bg-secondary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border border-neutral-700"
          required
        />
      </div>
      
      <div>
        <label className="block text-neutral-300 mb-2">Description *</label>
        <textarea
          value={achievement.description}
          onChange={(e) => updateField('description', e.target.value)}
          className="w-full px-4 py-2 bg-secondary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border border-neutral-700"
          rows={3}
          required
        />
      </div>
      
      <div>
        <label className="block text-neutral-300 mb-2">Type</label>
        <select
          value={achievement.type}
          onChange={(e) => updateField('type', e.target.value)}
          className="w-full px-4 py-2 bg-secondary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border border-neutral-700"
        >
          <option value="award">Award</option>
          <option value="certification">Certification</option>
          <option value="competition">Competition</option>
          <option value="publication">Publication</option>
        </select>
      </div>
      
      <div>
        <label className="block text-neutral-300 mb-2">Date</label>
        <input
          type="date"
          value={achievement.date}
          onChange={(e) => updateField('date', e.target.value)}
          className="w-full px-4 py-2 bg-secondary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border border-neutral-700"
        />
      </div>
    </div>
  );
}

// Certification Form Component
interface CertificationFormProps {
  item: Certification;
  updateField: (field: string, value: string | number | boolean | string[]) => void;
}

function CertificationForm({ item: certification, updateField }: CertificationFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-neutral-300 mb-2">Certification Name *</label>
        <input
          type="text"
          value={certification.name}
          onChange={(e) => updateField('name', e.target.value)}
          className="w-full px-4 py-2 bg-secondary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border border-neutral-700"
          placeholder="e.g., AWS Certified Solutions Architect"
          required
        />
      </div>
      
      <div>
        <label className="block text-neutral-300 mb-2">Issuing Organization *</label>
        <input
          type="text"
          value={certification.issuer}
          onChange={(e) => updateField('issuer', e.target.value)}
          className="w-full px-4 py-2 bg-secondary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border border-neutral-700"
          placeholder="e.g., Amazon Web Services, Coursera"
          required
        />
      </div>
      
      <div>
        <label className="block text-neutral-300 mb-2">Description</label>
        <textarea
          value={certification.description || ''}
          onChange={(e) => updateField('description', e.target.value)}
          className="w-full px-4 py-2 bg-secondary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border border-neutral-700"
          rows={3}
          placeholder="Brief description of the certification..."
        />
      </div>
      
      <div>
        <label className="block text-neutral-300 mb-2">Credential URL</label>
        <input
          type="url"
          value={certification.credentialUrl || ''}
          onChange={(e) => updateField('credentialUrl', e.target.value)}
          className="w-full px-4 py-2 bg-secondary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border border-neutral-700"
          placeholder="https://coursera.org/verify/..."
        />
      </div>
      
      <div>
        <label className="block text-neutral-300 mb-2">Issue Date *</label>
        <input
          type="date"
          value={certification.date}
          onChange={(e) => updateField('date', e.target.value)}
          className="w-full px-4 py-2 bg-secondary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border border-neutral-700"
          required
        />
      </div>
    </div>
  );
}
