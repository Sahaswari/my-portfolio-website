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
  image?: string;
}

interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  description?: string;
  category?: string;
  image?: string;
}

interface VolunteeringEvent {
  name: string;
  date: string;
  description: string;
  role: string;
  impact: string;
  image?: string;
}

interface Volunteering {
  id: number;
  role: string;
  organization: string;
  location: string;
  period: string;
  description: string;
  logo?: string;
  image?: string;
  events: VolunteeringEvent[];
  achievements: string[];
}

type ContentItem = Project | BlogPost | Achievement | Certification | Volunteering;

const ADMIN_CREDENTIALS: AdminUser = {
  username: import.meta.env.VITE_ADMIN_USERNAME || 'admin',
  password: import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'
};

// Helper function to resize and compress images
const resizeImage = (file: File, maxWidth = 800, maxHeight = 800): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round(height * (maxWidth / width));
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round(width * (maxHeight / height));
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return reject(new Error('Could not get canvas context'));
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.8)); // Use JPEG format with 80% quality
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};


export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'projects' | 'blogs' | 'achievements' | 'certifications' | 'volunteering' | 'cv'>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [volunteering, setVolunteering] = useState<Volunteering[]>([]);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [cvUploading, setCvUploading] = useState(false);
  const [cvStatus, setCvStatus] = useState<string>('');

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
    const savedVolunteering = localStorage.getItem('portfolioVolunteering');

    if (savedProjects) setProjects(JSON.parse(savedProjects));
    if (savedBlogs) setBlogs(JSON.parse(savedBlogs));
    if (savedAchievements) setAchievements(JSON.parse(savedAchievements));
    if (savedCertifications) setCertifications(JSON.parse(savedCertifications));
    if (savedVolunteering) setVolunteering(JSON.parse(savedVolunteering));
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

  const handleCvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate PDF file
    if (file.type !== 'application/pdf') {
      setCvStatus('Error: Please upload a PDF file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setCvStatus('Error: File size should be less than 5MB');
      return;
    }

    setCvUploading(true);
    setCvStatus('Uploading CV...');

    try {
      // Convert PDF to base64 and store in localStorage
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        localStorage.setItem('portfolioCV', JSON.stringify({
          name: file.name,
          data: base64,
          uploadDate: new Date().toISOString()
        }));
        setCvStatus('CV uploaded successfully! ✓');
        setCvUploading(false);
        
        // Note: In production, you would actually upload this to your public folder
        // For now, we're storing it in localStorage as a demo
        setTimeout(() => {
          setCvStatus('Note: To use this CV on your site, copy the PDF to /public/resume.pdf');
        }, 3000);
      };
      reader.readAsDataURL(file);
    } catch {
      setCvStatus('Error uploading CV. Please try again.');
      setCvUploading(false);
    }
  };

  const handleDownloadStoredCv = () => {
    const storedCv = localStorage.getItem('portfolioCV');
    if (!storedCv) {
      alert('No CV stored in admin panel');
      return;
    }

    const cvData = JSON.parse(storedCv);
    const link = document.createElement('a');
    link.href = cvData.data;
    link.download = cvData.name || 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteStoredCv = () => {
    if (confirm('Are you sure you want to delete the stored CV?')) {
      localStorage.removeItem('portfolioCV');
      setCvStatus('CV deleted successfully');
      // Force re-render by clearing status after a delay
      setTimeout(() => setCvStatus(''), 3000);
    }
  };

  const handleExportData = () => {
    // Get all data from localStorage
    const allData = {
      projects: projects.length > 0 ? projects : JSON.parse(localStorage.getItem('portfolioProjects') || '[]'),
      blogs: blogs.length > 0 ? blogs : JSON.parse(localStorage.getItem('portfolioBlogs') || '[]'),
      achievements: achievements.length > 0 ? achievements : JSON.parse(localStorage.getItem('portfolioAchievements') || '[]'),
      certifications: certifications.length > 0 ? certifications : JSON.parse(localStorage.getItem('portfolioCertifications') || '[]'),
      volunteering: volunteering.length > 0 ? volunteering : JSON.parse(localStorage.getItem('portfolioVolunteering') || '[]'),
      exportDate: new Date().toISOString()
    };

    // Create blob and download
    const blob = new Blob([JSON.stringify(allData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    alert('Data exported successfully! Check your downloads folder.');
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        
        // Validate data structure
        if (!data.projects || !data.blogs || !data.achievements || !data.certifications || !data.volunteering) {
          alert('Invalid data format. Please check the file.');
          return;
        }

        // Import data to localStorage
        localStorage.setItem('portfolioProjects', JSON.stringify(data.projects));
        localStorage.setItem('portfolioBlogs', JSON.stringify(data.blogs));
        localStorage.setItem('portfolioAchievements', JSON.stringify(data.achievements));
        localStorage.setItem('portfolioCertifications', JSON.stringify(data.certifications));
        localStorage.setItem('portfolioVolunteering', JSON.stringify(data.volunteering));

        // Reload data
        loadData();
        
        alert('Data imported successfully! All content has been updated.');
      } catch (error) {
        alert('Error importing data. Please check the file format.');
        console.error('Import error:', error);
      }
    };
    reader.readAsText(file);
  };

  const saveData = (type: 'projects' | 'blogs' | 'achievements' | 'certifications' | 'volunteering', data: ContentItem[]) => {
    const key = `portfolio${type.charAt(0).toUpperCase() + type.slice(1)}`;
    localStorage.setItem(key, JSON.stringify(data));
    
    if (type === 'projects') setProjects(data as Project[]);
    else if (type === 'blogs') setBlogs(data as BlogPost[]);
    else if (type === 'achievements') setAchievements(data as Achievement[]);
    else if (type === 'certifications') setCertifications(data as Certification[]);
    else setVolunteering(data as Volunteering[]);
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
        images: [],
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
        icon: 'FiAward',
        image: ''
      };
    } else if (activeTab === 'certifications') {
      newItem = {
        id: Date.now(),
        name: '',
        issuer: '',
        date: new Date().toISOString().split('T')[0],
        credentialUrl: '',
        description: '',
        image: ''
      };
    } else {
      // volunteering
      newItem = {
        id: Date.now(),
        role: '',
        organization: '',
        location: '',
        period: '',
        description: '',
        logo: '',
        image: '',
        events: [],
        achievements: []
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
    } else if (activeTab === 'certifications') {
      if (isAddingNew) {
        updatedData = [...certifications, editingItem];
      } else {
        updatedData = certifications.map(c => c.id === editingItem.id ? editingItem : c);
      }
      saveData('certifications', updatedData);
    } else {
      // volunteering
      if (isAddingNew) {
        updatedData = [...volunteering, editingItem];
      } else {
        updatedData = volunteering.map(v => v.id === editingItem.id ? editingItem : v);
      }
      saveData('volunteering', updatedData);
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
    } else if (activeTab === 'certifications') {
      saveData('certifications', certifications.filter(c => c.id !== id));
    } else {
      saveData('volunteering', volunteering.filter(v => v.id !== id));
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

  const updateField = (field: string, value: string | number | boolean | string[] | VolunteeringEvent[]) => {
    if (editingItem) {
      setEditingItem({ ...editingItem, [field]: value });
    }
  };

  const getCurrentData = () => {
    if (activeTab === 'projects') return projects;
    if (activeTab === 'blogs') return blogs;
    if (activeTab === 'achievements') return achievements;
    if (activeTab === 'certifications') return certifications;
    return volunteering;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <div className="bg-light p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-200">
          <h1 className="text-3xl font-bold text-primary mb-6 text-center font-serif">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-text mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 bg-secondary text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300"
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <label className="block text-text mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-secondary text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300"
                placeholder="Enter password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary hover:bg-green-800 text-light font-bold py-2 rounded-lg transition-colors"
            >
              Login
            </button>
          </form>
          <p className="text-gray-500 text-sm mt-4 text-center">
            Default: admin / admin123
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary text-text">
      {/* Header */}
      <header className="bg-light border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold font-serif text-primary">Portfolio Admin Panel</h1>
          <div className="flex items-center gap-3">
            {/* Export Button */}
            <button
              onClick={handleExportData}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-semibold"
              title="Export all data to JSON file"
            >
              <FiSave />
              Export Data
            </button>
            
            {/* Import Button */}
            <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors cursor-pointer text-sm font-semibold">
              <FiPlus />
              Import Data
              <input
                type="file"
                accept=".json"
                onChange={handleImportData}
                className="hidden"
              />
            </label>
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-light rounded-lg transition-colors"
            >
              <FiLogOut />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'projects'
                ? 'bg-primary text-light'
                : 'bg-light text-text hover:bg-gray-200'
            }`}
          >
            Projects ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'blogs'
                ? 'bg-primary text-light'
                : 'bg-light text-text hover:bg-gray-200'
            }`}
          >
            Blogs ({blogs.length})
          </button>
          <button
            onClick={() => setActiveTab('certifications')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'certifications'
                ? 'bg-primary text-light'
                : 'bg-light text-text hover:bg-gray-200'
            }`}
          >
            Certifications ({certifications.length})
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'achievements'
                ? 'bg-primary text-light'
                : 'bg-light text-text hover:bg-gray-200'
            }`}
          >
            Achievements ({achievements.length})
          </button>
          <button
            onClick={() => setActiveTab('volunteering')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'volunteering'
                ? 'bg-primary text-light'
                : 'bg-light text-text hover:bg-gray-200'
            }`}
          >
            Volunteering ({volunteering.length})
          </button>
          <button
            onClick={() => setActiveTab('cv')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'cv'
                ? 'bg-primary text-light'
                : 'bg-light text-text hover:bg-gray-200'
            }`}
          >
            CV / Resume
          </button>
        </div>

        {/* Add Button */}
        {!editingItem && activeTab !== 'cv' && (
          <button
            onClick={handleAdd}
            className="mb-6 flex items-center gap-2 px-4 py-2 bg-highlight hover:bg-green-600 text-light rounded-lg transition-colors"
          >
            <FiPlus />
            Add New {activeTab === 'projects' ? 'Project' : activeTab === 'blogs' ? 'Blog' : activeTab === 'achievements' ? 'Achievement' : activeTab === 'certifications' ? 'Certification' : 'Volunteering'}
          </button>
        )}

        {/* Edit Form */}
        {editingItem && (
          <div className="bg-light p-6 rounded-xl mb-6 border border-gray-200">
            <h2 className="text-xl font-bold mb-4 font-serif text-primary">
              {isAddingNew ? 'Add New' : 'Edit'} {activeTab === 'projects' ? 'Project' : activeTab === 'blogs' ? 'Blog' : activeTab === 'achievements' ? 'Achievement' : activeTab === 'certifications' ? 'Certification' : 'Volunteering'}
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

            {activeTab === 'volunteering' && editingItem && 'organization' in editingItem && (
              <VolunteeringForm item={editingItem as Volunteering} updateField={updateField} />
            )}

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2 bg-primary hover:bg-green-800 text-light font-bold rounded-lg transition-colors"
              >
                <FiSave />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-light rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* CV Management Section */}
        {activeTab === 'cv' && (
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold text-primary mb-6">CV / Resume Management</h2>
            
            <div className="space-y-6">
              {/* Upload Section */}
              <div className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-300">
                <h3 className="text-lg font-semibold text-text mb-4">Upload New CV</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-text mb-2">
                      Select PDF file (max 5MB)
                    </label>
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={handleCvUpload}
                      className="w-full px-4 py-3 bg-white text-text rounded-lg border-2 border-gray-300 focus:outline-none focus:border-primary cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-green-800"
                    />
                  </div>
                  
                  {cvStatus && (
                    <div className={`p-3 rounded-lg ${
                      cvStatus.includes('Error') 
                        ? 'bg-red-50 text-red-700 border border-red-200' 
                        : cvStatus.includes('successfully')
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}>
                      {cvStatus}
                    </div>
                  )}
                  
                  {cvUploading && (
                    <div className="flex items-center justify-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      <span className="ml-3 text-text">Uploading...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Current CV Info */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-text mb-4">Current CV Status</h3>
                {(() => {
                  const storedCv = localStorage.getItem('portfolioCV');
                  if (storedCv) {
                    const cvData = JSON.parse(storedCv);
                    return (
                      <div className="space-y-4">
                        <div className="flex items-start justify-between bg-white p-4 rounded-lg border border-gray-200">
                          <div className="flex-1">
                            <p className="font-semibold text-primary">{cvData.name}</p>
                            <p className="text-sm text-gray-600 mt-1">
                              Uploaded: {new Date(cvData.uploadDate).toLocaleDateString()} at {new Date(cvData.uploadDate).toLocaleTimeString()}
                            </p>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <button
                              onClick={handleDownloadStoredCv}
                              className="px-4 py-2 bg-primary hover:bg-green-800 text-white rounded-lg transition-colors text-sm font-semibold"
                            >
                              Download
                            </button>
                            <button
                              onClick={handleDeleteStoredCv}
                              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-semibold"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <h4 className="font-semibold text-yellow-800 mb-2">📝 Important Instructions:</h4>
                          <ol className="list-decimal list-inside space-y-2 text-sm text-yellow-700">
                            <li>Download the uploaded CV using the button above</li>
                            <li>Manually copy/replace it as <code className="bg-yellow-100 px-2 py-1 rounded">/public/resume.pdf</code> in your project</li>
                            <li>This ensures the "Download CV" button on your website works correctly</li>
                            <li>The CV is stored here for backup and management purposes</li>
                          </ol>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div className="text-center py-8 text-gray-500">
                      <p>No CV uploaded yet</p>
                      <p className="text-sm mt-2">Upload a PDF file to get started</p>
                    </div>
                  );
                })()}
              </div>

              {/* Public Folder Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 How to Deploy Your CV</h3>
                <div className="space-y-3 text-sm text-blue-800">
                  <p><strong>Step 1:</strong> Upload your CV using the form above</p>
                  <p><strong>Step 2:</strong> Click "Download" to save it to your computer</p>
                  <p><strong>Step 3:</strong> Place the file in your project:</p>
                  <pre className="bg-blue-100 p-3 rounded-lg overflow-x-auto mt-2">
                    <code>my-portfolio/public/resume.pdf</code>
                  </pre>
                  <p><strong>Step 4:</strong> The "Download CV" button in your header will automatically use this file</p>
                  <p className="mt-4 pt-3 border-t border-blue-300">
                    <strong>Note:</strong> For security reasons, we can't automatically write files to your public folder. 
                    You need to manually place the CV there before deploying to Vercel.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* List */}
        <div className="grid gap-4">
          {activeTab !== 'cv' && getCurrentData().map((item) => {
            const title = 'title' in item ? item.title : 'name' in item ? item.name : 'role' in item ? (item as Volunteering).role : '';
            const description = 'description' in item && !('organization' in item) ? item.description 
              : 'excerpt' in item ? item.excerpt 
              : 'issuer' in item ? item.issuer 
              : 'organization' in item ? (item as Volunteering).organization 
              : '';
            const dateInfo = 'date' in item ? item.date : 'period' in item ? (item as Volunteering).period : '';
            
            return (
              <div key={item.id} className="bg-light p-4 rounded-lg border border-gray-200 flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-primary">{title}</h3>
                  <p className="text-text text-sm mt-1">{description}</p>
                  <p className="text-gray-500 text-xs mt-2">{dateInfo}</p>
                </div>
                <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 bg-primary hover:bg-green-800 text-light rounded-lg transition-colors"
                >
                  <FiEdit2 />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 bg-red-600 hover:bg-red-700 text-light rounded-lg transition-colors"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
            );
          })}
          
          {activeTab !== 'cv' && getCurrentData().length === 0 && !editingItem && (
            <p className="text-center text-gray-500 py-8">
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
        <label className="block text-text mb-2">Title *</label>
        <input
          type="text"
          value={project.title}
          onChange={(e) => updateField('title', e.target.value)}
          className="w-full px-4 py-2 bg-secondary text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300"
          required
        />
      </div>
      
      <div>
        <label className="block text-text mb-2">Category *</label>
        <select
          value={project.category}
          onChange={(e) => updateField('category', e.target.value)}
          className="w-full px-4 py-2 bg-secondary text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300"
        >
          <option value="AI/ML">AI/ML</option>
          <option value="Web Development">Web Development</option>
          <option value="Mobile">Mobile</option>
          <option value="Data Science">Data Science</option>
          <option value="Other">Other</option>
        </select>
      </div>
      
      <div>
        <label className="block text-text mb-2">Short Description *</label>
        <textarea
          value={project.description}
          onChange={(e) => updateField('description', e.target.value)}
          className="w-full px-4 py-2 bg-secondary text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300"
          rows={2}
          required
        />
      </div>
      
      <div>
        <label className="block text-text mb-2">Long Description</label>
        <textarea
          value={project.longDescription}
          onChange={(e) => updateField('longDescription', e.target.value)}
          className="w-full px-4 py-2 bg-secondary text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300"
          rows={4}
        />
      </div>
      
      <div>
        <label className="block text-text mb-2">Images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={async (e) => {
            if (e.target.files) {
              const files = Array.from(e.target.files);
              try {
                const resizedImages = await Promise.all(
                  files.map(file => resizeImage(file))
                );
                updateField('images', [...(project.images || []), ...resizedImages]);
              } catch (error) {
                console.error("Image resizing failed:", error);
              }
            }
          }}
          className="w-full px-4 py-2 bg-secondary text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300"
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {(project.images || []).map((image, index) => (
            <div key={index} className="relative">
              <img src={image} alt={`Project image ${index + 1}`} className="w-24 h-24 object-cover rounded-lg" />
              <button
                type="button"
                onClick={() => {
                  const newImages = project.images.filter((_, i) => i !== index);
                  updateField('images', newImages);
                }}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs"
              >
                <FiTrash2 />
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-text mb-2">Technologies (comma-separated)</label>
        <input
          type="text"
          value={Array.isArray(project.technologies) ? project.technologies.join(', ') : ''}
          onChange={(e) => updateField('technologies', e.target.value.split(',').map((t: string) => t.trim()))}
          className="w-full px-4 py-2 bg-secondary text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300"
          placeholder="React, Node.js, MongoDB"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-text mb-2">GitHub URL</label>
          <input
            type="url"
            value={project.githubUrl || ''}
            onChange={(e) => updateField('githubUrl', e.target.value)}
            className="w-full px-4 py-2 bg-secondary text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300"
          />
        </div>
        
        <div>
          <label className="block text-text mb-2">Live URL</label>
          <input
            type="url"
            value={project.liveUrl || ''}
            onChange={(e) => updateField('liveUrl', e.target.value)}
            className="w-full px-4 py-2 bg-secondary text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300"
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
        <label className="text-text">Featured Project</label>
      </div>
      
      <div>
        <label className="block text-text mb-2">Date</label>
        <input
          type="date"
          value={project.date}
          onChange={(e) => updateField('date', e.target.value)}
          className="w-full px-4 py-2 bg-secondary text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300"
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
        <label className="block text-text mb-2">Title *</label>
        <input
          type="text"
          value={blog.title}
          onChange={(e) => updateField('title', e.target.value)}
          className="w-full px-4 py-2 bg-secondary text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300"
          required
        />
      </div>
      
      <div>
        <label className="block text-text mb-2">Excerpt *</label>
        <textarea
          value={blog.excerpt}
          onChange={(e) => updateField('excerpt', e.target.value)}
          className="w-full px-4 py-2 bg-secondary text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300"
          rows={2}
          required
        />
      </div>
      
      <div>
        <label className="block text-text mb-2">Content *</label>
        <textarea
          value={blog.content}
          onChange={(e) => updateField('content', e.target.value)}
          className="w-full px-4 py-2 bg-secondary text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300"
          rows={8}
          required
        />
      </div>
      
      <div>
        <label className="block text-text mb-2">Author</label>
        <input
          type="text"
          value={blog.author}
          onChange={(e) => updateField('author', e.target.value)}
          className="w-full px-4 py-2 bg-secondary text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300"
        />
      </div>
      
      <div>
        <label className="block text-text mb-2">Tags (comma-separated)</label>
        <input
          type="text"
          value={Array.isArray(blog.tags) ? blog.tags.join(', ') : ''}
          onChange={(e) => updateField('tags', e.target.value.split(',').map((t: string) => t.trim()))}
          className="w-full px-4 py-2 bg-secondary text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300"
          placeholder="AI, Machine Learning, Tutorial"
        />
      </div>
      
      <div>
        <label className="block text-text mb-2">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            if (e.target.files && e.target.files[0]) {
              try {
                const resizedImage = await resizeImage(e.target.files[0]);
                updateField('image', resizedImage);
              } catch (error) {
                console.error("Image resizing failed:", error);
              }
            }
          }}
          className="w-full px-4 py-2 bg-secondary text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300"
        />
        {blog.image && (
          <div className="mt-2 relative w-32 h-32">
            <img src={blog.image} alt="Blog post" className="w-full h-full object-cover rounded-lg" />
            <button
              type="button"
              onClick={() => updateField('image', '')}
              className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs"
            >
              <FiTrash2 />
            </button>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-text mb-2">Read Time</label>
          <input
            type="text"
            value={blog.readTime}
            onChange={(e) => updateField('readTime', e.target.value)}
            className="w-full px-4 py-2 bg-secondary text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300"
            placeholder="5 min read"
          />
        </div>
        
        <div>
          <label className="block text-text mb-2">Date</label>
          <input
            type="date"
            value={blog.date}
            onChange={(e) => updateField('date', e.target.value)}
            className="w-full px-4 py-2 bg-secondary text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300"
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
        <label className="block text-text mb-2">Title *</label>
        <input
          type="text"
          value={achievement.title}
          onChange={(e) => updateField('title', e.target.value)}
          className="w-full px-4 py-2 bg-secondary text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300"
          required
        />
      </div>
      
      <div>
        <label className="block text-text mb-2">Description *</label>
        <textarea
          value={achievement.description}
          onChange={(e) => updateField('description', e.target.value)}
          className="w-full px-4 py-2 bg-secondary text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300"
          rows={3}
          required
        />
      </div>
      
      <div>
        <label className="block text-text mb-2">Type</label>
        <select
          value={achievement.type}
          onChange={(e) => updateField('type', e.target.value)}
          className="w-full px-4 py-2 bg-secondary text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300"
        >
          <option value="award">Award</option>
          <option value="certification">Certification</option>
          <option value="competition">Competition</option>
          <option value="publication">Publication</option>
        </select>
      </div>
      
      <div>
        <label className="block text-text mb-2">Date</label>
        <input
          type="date"
          value={achievement.date}
          onChange={(e) => updateField('date', e.target.value)}
          className="w-full px-4 py-2 bg-secondary text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300"
        />
      </div>
      <div>
        <label className="block text-text mb-2">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            if (e.target.files && e.target.files[0]) {
              try {
                const resizedImage = await resizeImage(e.target.files[0]);
                updateField('image', resizedImage);
              } catch (error) {
                console.error("Image resizing failed:", error);
              }
            }
          }}
          className="w-full px-4 py-2 bg-secondary text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300"
        />
        {achievement.image && (
          <div className="mt-2 relative w-32 h-32">
            <img src={achievement.image} alt="Achievement" className="w-full h-full object-cover rounded-lg" />
            <button
              type="button"
              onClick={() => updateField('image', '')}
              className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs"
            >
              <FiTrash2 />
            </button>
          </div>
        )}
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
        <label className="block text-text mb-2">Certification Name *</label>
        <input
          type="text"
          value={certification.name}
          onChange={(e) => updateField('name', e.target.value)}
          className="w-full px-4 py-2 bg-secondary text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300"
          placeholder="e.g., AWS Certified Solutions Architect"
          required
        />
      </div>
      
      <div>
        <label className="block text-text mb-2">Issuing Organization *</label>
        <input
          type="text"
          value={certification.issuer}
          onChange={(e) => updateField('issuer', e.target.value)}
          className="w-full px-4 py-2 bg-secondary text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300"
          placeholder="e.g., Amazon Web Services, Coursera"
          required
        />
      </div>
      
      <div>
        <label className="block text-text mb-2">Description</label>
        <textarea
          value={certification.description || ''}
          onChange={(e) => updateField('description', e.target.value)}
          className="w-full px-4 py-2 bg-secondary text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300"
          rows={3}
          placeholder="Brief description of the certification..."
        />
      </div>
      
      <div>
        <label className="block text-text mb-2">Category</label>
        <select
          value={certification.category || ''}
          onChange={(e) => updateField('category', e.target.value)}
          className="w-full px-4 py-2 bg-secondary text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300"
        >
          <option value="">Select a category...</option>
          <option value="AI/ML">AI & Machine Learning</option>
          <option value="Data Science">Data Science</option>
          <option value="Cloud">Cloud Computing</option>
          <option value="Web Development">Web Development</option>
          <option value="Achievements">Achievements & Awards</option>
          <option value="Leadership">Leadership & Management</option>
          <option value="Volunteering">Volunteering Certificates</option>
          <option value="Language">Language & Communication</option>
          <option value="Other">Other</option>
        </select>
      </div>
      
      <div>
        <label className="block text-text mb-2">Credential URL</label>
        <input
          type="url"
          value={certification.credentialUrl || ''}
          onChange={(e) => updateField('credentialUrl', e.target.value)}
          className="w-full px-4 py-2 bg-secondary text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300"
          placeholder="https://coursera.org/verify/..."
        />
      </div>
      
      <div>
        <label className="block text-text mb-2">Issue Date *</label>
        <input
          type="date"
          value={certification.date}
          onChange={(e) => updateField('date', e.target.value)}
          className="w-full px-4 py-2 bg-secondary text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300"
          required
        />
      </div>
      <div>
        <label className="block text-text mb-2">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            if (e.target.files && e.target.files[0]) {
              try {
                const resizedImage = await resizeImage(e.target.files[0]);
                updateField('image', resizedImage);
              } catch (error) {
                console.error("Image resizing failed:", error);
              }
            }
          }}
          className="w-full px-4 py-2 bg-secondary text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300"
        />
        {certification.image && (
          <div className="mt-2 relative w-32 h-32">
            <img src={certification.image} alt="Certification" className="w-full h-full object-cover rounded-lg" />
            <button
              type="button"
              onClick={() => updateField('image', '')}
              className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs"
            >
              <FiTrash2 />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Volunteering Form Component
interface VolunteeringFormProps {
  item: Volunteering;
  updateField: (field: string, value: string | number | boolean | string[] | VolunteeringEvent[]) => void;
}

function VolunteeringForm({ item: volunteering, updateField }: VolunteeringFormProps) {
  const [newEvent, setNewEvent] = useState<VolunteeringEvent>({
    name: '',
    date: '',
    description: '',
    role: '',
    impact: '',
    image: ''
  });
  const [newAchievement, setNewAchievement] = useState('');

  const handleAddEvent = () => {
    if (newEvent.name && newEvent.date && newEvent.description) {
      updateField('events', [...volunteering.events, newEvent]);
      setNewEvent({ name: '', date: '', description: '', role: '', impact: '', image: '' });
    }
  };

  const handleRemoveEvent = (index: number) => {
    const updatedEvents = volunteering.events.filter((_, i) => i !== index);
    updateField('events', updatedEvents);
  };

  const handleAddAchievement = () => {
    if (newAchievement.trim()) {
      updateField('achievements', [...volunteering.achievements, newAchievement.trim()]);
      setNewAchievement('');
    }
  };

  const handleRemoveAchievement = (index: number) => {
    const updatedAchievements = volunteering.achievements.filter((_, i) => i !== index);
    updateField('achievements', updatedAchievements);
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-text mb-2">Role *</label>
          <input
            type="text"
            value={volunteering.role}
            onChange={(e) => updateField('role', e.target.value)}
            className="w-full px-4 py-2 bg-secondary text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300"
            placeholder="e.g., Secretary"
            required
          />
        </div>
        
        <div>
          <label className="block text-text mb-2">Organization *</label>
          <input
            type="text"
            value={volunteering.organization}
            onChange={(e) => updateField('organization', e.target.value)}
            className="w-full px-4 py-2 bg-secondary text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300"
            placeholder="e.g., IEEE Women in Engineering (WIE)"
            required
          />
        </div>

        <div>
          <label className="block text-text mb-2">Location *</label>
          <input
            type="text"
            value={volunteering.location}
            onChange={(e) => updateField('location', e.target.value)}
            className="w-full px-4 py-2 bg-secondary text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300"
            placeholder="e.g., University of Ruhuna"
            required
          />
        </div>

        <div>
          <label className="block text-text mb-2">Period *</label>
          <input
            type="text"
            value={volunteering.period}
            onChange={(e) => updateField('period', e.target.value)}
            className="w-full px-4 py-2 bg-secondary text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300"
            placeholder="e.g., 2023 - Present"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-text mb-2">Description *</label>
        <textarea
          value={volunteering.description}
          onChange={(e) => updateField('description', e.target.value)}
          className="w-full px-4 py-2 bg-secondary text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300"
          rows={3}
          placeholder="Describe your role and responsibilities..."
          required
        />
      </div>

      <div>
        <label className="block text-text mb-2">Logo (optional)</label>
        <input
          type="text"
          value={volunteering.logo || ''}
          onChange={(e) => updateField('logo', e.target.value)}
          className="w-full px-4 py-2 bg-secondary text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300"
          placeholder="Logo URL or emoji (e.g., 🎯)"
        />
      </div>

      <div>
        <label className="block text-text mb-2">Image (Optional)</label>
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            if (e.target.files && e.target.files[0]) {
              try {
                const resizedImage = await resizeImage(e.target.files[0]);
                updateField('image', resizedImage);
              } catch (error) {
                console.error("Image resizing failed:", error);
              }
            }
          }}
          className="w-full px-4 py-2 bg-secondary text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300"
        />
        {volunteering.image && (
          <div className="mt-2 relative w-32 h-32">
            <img src={volunteering.image} alt="Volunteering" className="w-full h-full object-cover rounded-lg" />
            <button
              type="button"
              onClick={() => updateField('image', '')}
              className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs"
            >
              <FiTrash2 />
            </button>
          </div>
        )}
      </div>

      {/* Events Section */}
      <div className="border-t border-gray-300 pt-4">
        <h3 className="text-lg font-semibold text-primary mb-4">Events Organized</h3>
        
        {/* Existing Events */}
        {volunteering.events.length > 0 && (
          <div className="space-y-3 mb-4">
            {volunteering.events.map((event, index) => (
              <div key={index} className="bg-secondary p-4 rounded-lg border border-gray-300">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-text">{event.name}</h4>
                    <p className="text-sm text-gray-600">{event.date} • {event.role}</p>
                    <p className="text-sm text-text mt-1">{event.description}</p>
                    <p className="text-xs text-green-600 mt-1">Impact: {event.impact}</p>
                    {event.image && <img src={event.image} alt={event.name} className="w-16 h-16 object-cover rounded-md mt-2" />}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveEvent(index)}
                    className="ml-2 p-1 text-red-600 hover:text-red-700"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add New Event */}
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <h4 className="font-semibold text-text">Add New Event</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              value={newEvent.name}
              onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
              className="px-3 py-2 bg-white text-text rounded-lg border border-gray-300"
              placeholder="Event name"
            />
            <input
              type="text"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              className="px-3 py-2 bg-white text-text rounded-lg border border-gray-300"
              placeholder="Date (e.g., 2024)"
            />
            <input
              type="text"
              value={newEvent.role}
              onChange={(e) => setNewEvent({ ...newEvent, role: e.target.value })}
              className="px-3 py-2 bg-white text-text rounded-lg border border-gray-300"
              placeholder="Your role"
            />
            <input
              type="text"
              value={newEvent.impact}
              onChange={(e) => setNewEvent({ ...newEvent, impact: e.target.value })}
              className="px-3 py-2 bg-white text-text rounded-lg border border-gray-300"
              placeholder="Impact (e.g., 100+ participants)"
            />
          </div>
          <textarea
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            className="w-full px-3 py-2 bg-white text-text rounded-lg border border-gray-300"
            rows={2}
            placeholder="Event description"
          />
          <div>
            <label className="block text-text text-sm mb-1">Event Image (Optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                if (e.target.files && e.target.files[0]) {
                  try {
                    const resizedImage = await resizeImage(e.target.files[0]);
                    setNewEvent({ ...newEvent, image: resizedImage });
                  } catch (error) {
                    console.error("Image resizing failed:", error);
                  }
                }
              }}
              className="w-full px-3 py-2 bg-white text-text rounded-lg border border-gray-300"
            />
            {newEvent.image && (
              <div className="mt-2 relative w-24 h-24">
                <img src={newEvent.image} alt="New event" className="w-full h-full object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={() => setNewEvent({ ...newEvent, image: '' })}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs"
                >
                  <FiTrash2 />
                </button>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={handleAddEvent}
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-green-800 text-white rounded-lg transition-colors"
          >
            <FiPlus /> Add Event
          </button>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="border-t border-gray-300 pt-4">
        <h3 className="text-lg font-semibold text-primary mb-4">Key Achievements</h3>
        
        {/* Existing Achievements */}
        {volunteering.achievements.length > 0 && (
          <ul className="space-y-2 mb-4">
            {volunteering.achievements.map((achievement, index) => (
              <li key={index} className="bg-secondary p-3 rounded-lg border border-gray-300 flex justify-between items-center">
                <span className="text-text">{achievement}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveAchievement(index)}
                  className="ml-2 p-1 text-red-600 hover:text-red-700"
                >
                  <FiTrash2 />
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Add New Achievement */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-text mb-2">Add New Achievement</h4>
          <div className="flex gap-2">
            <input
              type="text"
              value={newAchievement}
              onChange={(e) => setNewAchievement(e.target.value)}
              className="flex-1 px-3 py-2 bg-white text-text rounded-lg border border-gray-300"
              placeholder="Enter achievement..."
              onKeyPress={(e) => e.key === 'Enter' && handleAddAchievement()}
            />
            <button
              type="button"
              onClick={handleAddAchievement}
              className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-green-800 text-white rounded-lg transition-colors"
            >
              <FiPlus /> Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
