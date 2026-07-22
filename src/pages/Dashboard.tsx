import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus, Pencil, Trash2, Save, X, ArrowLeft, LayoutDashboard, GripVertical, ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProjectStore } from '@/stores/projectStore';
import { useAuthStore } from '@/stores/authStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { useTechStackStore } from '@/stores/techStackStore';
import { toast } from 'sonner';
import type { Project } from '@/types';
import MenuButton from '@/components/layout/MenuButton';
import VantaGlobeBackground from '@/components/features/VantaGlobeBackground';

interface ProjectFormData {
  title: string;
  description: string;
  techs: string;
  url: string;
  buttonText: string;
  imageUrl: string;
  sortOrder: string;
}

const EMPTY_PROJECT_FORM: ProjectFormData = {
  title: '',
  description: '',
  techs: '',
  url: '',
  buttonText: 'View Project',
  imageUrl: '',
  sortOrder: '0',
};

// Profile Editor Component
function ProfileEditor() {
  const { name, title, bio, avatarUrl, resumeUrl, typingRoles, updateSettings } = useSettingsStore();

  const handleBioChange = (index: number, value: string) => {
    const newBio = [...bio];
    newBio[index] = value;
    updateSettings({ bio: newBio });
  };

  const handleRolesChange = (value: string) => {
    updateSettings({ typingRoles: value.split(',').map(s => s.trim()) });
  };

  return (
    <div className="glass-card rounded-2xl p-6 space-y-4">
      <h2 className="font-semibold text-foreground">Profile Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-sm text-muted-foreground">Name</Label>
          <Input value={name} onChange={e => updateSettings({ name: e.target.value })} className="bg-background/50" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm text-muted-foreground">Title</Label>
          <Input value={title} onChange={e => updateSettings({ title: e.target.value })} className="bg-background/50" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm text-muted-foreground">Avatar URL</Label>
          <Input value={avatarUrl} onChange={e => updateSettings({ avatarUrl: e.target.value })} className="bg-background/50" placeholder="https://..." />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm text-muted-foreground">Resume PDF URL</Label>
          <Input value={resumeUrl} onChange={e => updateSettings({ resumeUrl: e.target.value })} className="bg-background/50" placeholder="/resume.pdf" />
        </div>
        <div className="md:col-span-2 space-y-1.5">
          <Label className="text-sm text-muted-foreground">Typing Roles (comma separated)</Label>
          <Input value={typingRoles.join(', ')} onChange={e => handleRolesChange(e.target.value)} className="bg-background/50" />
        </div>
        {bio.map((paragraph, idx) => (
          <div key={idx} className="md:col-span-2 space-y-1.5">
            <Label className="text-sm text-muted-foreground">Bio paragraph {idx + 1}</Label>
            <Textarea value={paragraph} onChange={e => handleBioChange(idx, e.target.value)} rows={3} className="bg-background/50 resize-none" />
          </div>
        ))}
      </div>
      <div className="text-xs text-muted-foreground mt-2">Changes appear immediately on the homepage.</div>
    </div>
  );
}

// Tech Stack Editor
function TechStackEditor() {
  const { items, addItem, updateItem, deleteItem } = useTechStackStore();
  const [newName, setNewName] = useState('');
  const [newIcon, setNewIcon] = useState('');

  const handleAdd = () => {
    if (!newName.trim()) return;
    addItem({ name: newName.trim(), icon: newIcon.trim() || 'SiCode' });
    setNewName('');
    setNewIcon('');
  };

  return (
    <div className="glass-card rounded-2xl p-6 space-y-4">
      <h2 className="font-semibold text-foreground">Tech Stack</h2>
      <div className="flex gap-2 flex-wrap">
        <Input placeholder="Tech name (e.g., React)" value={newName} onChange={e => setNewName(e.target.value)} className="flex-1 bg-background/50" />
        <Input placeholder="Icon (e.g., SiReact)" value={newIcon} onChange={e => setNewIcon(e.target.value)} className="w-40 bg-background/50" />
        <Button onClick={handleAdd} className="bg-primary">Add</Button>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-2 p-2 rounded-lg bg-background/50">
            <GripVertical className="size-4 text-muted-foreground/40" />
            <Input value={item.name} onChange={e => updateItem(item.id, { name: e.target.value })} className="flex-1 bg-transparent" />
            <Input value={item.icon} onChange={e => updateItem(item.id, { icon: e.target.value })} className="w-32 bg-transparent" />
            <Button variant="ghost" size="sm" onClick={() => deleteItem(item.id)} className="text-red-400 hover:text-red-300"><Trash2 className="size-4" /></Button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Social Links Editor
function SocialLinksEditor() {
  const { links, addLink, updateLink, deleteLink } = useSocialLinksStore();
  const [newName, setNewName] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newIcon, setNewIcon] = useState('');

  const handleAdd = () => {
    if (!newName.trim() || !newUrl.trim()) return;
    addLink({ name: newName.trim(), url: newUrl.trim(), icon: newIcon.trim() || 'globe' });
    setNewName('');
    setNewUrl('');
    setNewIcon('');
  };

  return (
    <div className="glass-card rounded-2xl p-6 space-y-4">
      <h2 className="font-semibold text-foreground">Social Links</h2>
      <div className="flex flex-wrap gap-2">
        <Input placeholder="Name (e.g., Twitter)" value={newName} onChange={e => setNewName(e.target.value)} className="flex-1 bg-background/50" />
        <Input placeholder="URL" value={newUrl} onChange={e => setNewUrl(e.target.value)} className="flex-1 bg-background/50" />
        <Input placeholder="Icon (github, twitter...)" value={newIcon} onChange={e => setNewIcon(e.target.value)} className="w-32 bg-background/50" />
        <Button onClick={handleAdd} className="bg-primary">Add</Button>
      </div>
      <div className="space-y-2">
        {links.map((link) => (
          <div key={link.id} className="flex items-center gap-2 p-2 rounded-lg bg-background/50 flex-wrap">
            <Input value={link.name} onChange={e => updateLink(link.id, { name: e.target.value })} className="flex-1 min-w-[100px] bg-transparent" />
            <Input value={link.url} onChange={e => updateLink(link.id, { url: e.target.value })} className="flex-1 min-w-[150px] bg-transparent" />
            <Input value={link.icon} onChange={e => updateLink(link.id, { icon: e.target.value })} className="w-28 bg-transparent" />
            <Button variant="ghost" size="sm" onClick={() => deleteLink(link.id)} className="text-red-400"><Trash2 className="size-4" /></Button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Site Settings Editor
function SiteSettingsEditor() {
  const { yearsActiveStart, totalCommits, footerText, copyrightName, siteEmail, timezone, updateSettings } = useSettingsStore();

  return (
    <div className="glass-card rounded-2xl p-6 space-y-4">
      <h2 className="font-semibold text-foreground">Site Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-sm text-muted-foreground">Years Active Start (e.g., 2021)</Label>
          <Input type="number" value={yearsActiveStart} onChange={e => updateSettings({ yearsActiveStart: parseInt(e.target.value) || 2021 })} className="bg-background/50" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm text-muted-foreground">Total Commits Count</Label>
          <Input type="number" value={totalCommits} onChange={e => updateSettings({ totalCommits: parseInt(e.target.value) || 0 })} className="bg-background/50" />
        </div>
        <div className="md:col-span-2 space-y-1.5">
          <Label className="text-sm text-muted-foreground">Footer Text</Label>
          <Textarea value={footerText} onChange={e => updateSettings({ footerText: e.target.value })} rows={3} className="bg-background/50" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm text-muted-foreground">Copyright Name</Label>
          <Input value={copyrightName} onChange={e => updateSettings({ copyrightName: e.target.value })} className="bg-background/50" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm text-muted-foreground">Contact Email</Label>
          <Input type="email" value={siteEmail} onChange={e => updateSettings({ siteEmail: e.target.value })} className="bg-background/50" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm text-muted-foreground">Timezone</Label>
          <Input value={timezone} onChange={e => updateSettings({ timezone: e.target.value })} className="bg-background/50" />
        </div>
      </div>
    </div>
  );
}

// Main Dashboard
export default function Dashboard() {
  const { projects, addProject, updateProject, deleteProject } = useProjectStore();
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<ProjectFormData>(EMPTY_PROJECT_FORM);
  const [activeTab, setActiveTab] = useState('projects');

  const sorted = [...projects].sort((a, b) => a.sortOrder - b.sortOrder);

  const resetForm = () => {
    setForm(EMPTY_PROJECT_FORM);
    setEditingId(null);
    setShowForm(false);
  };

  const startEdit = (project: Project) => {
    setForm({
      title: project.title,
      description: project.description,
      techs: project.techs.join(', '),
      url: project.url,
      buttonText: project.buttonText,
      imageUrl: project.imageUrl,
      sortOrder: String(project.sortOrder),
    });
    setEditingId(project.id);
    setShowForm(true);
  };

  const handleSaveProject = () => {
    if (!form.title.trim()) {
      toast.error('Title is required');
      return;
    }
    const data = {
      title: form.title.trim(),
      description: form.description.trim(),
      techs: form.techs.split(',').map((t) => t.trim()).filter(Boolean),
      url: form.url.trim(),
      buttonText: form.buttonText.trim() || 'View Project',
      imageUrl: form.imageUrl.trim(),
      sortOrder: parseInt(form.sortOrder) || 0,
    };

    if (editingId) {
      updateProject(editingId, data);
      toast.success('Project updated');
    } else {
      addProject(data);
      toast.success('Project added');
    }
    resetForm();
  };

  const handleDeleteProject = (id: string, title: string) => {
    deleteProject(id);
    toast.success(`"${title}" deleted`);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const updateProjectField = (field: keyof ProjectFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="relative min-h-screen">
      <VantaGlobeBackground />
      <MenuButton />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link to="/" className="glass-card size-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="size-4" />
            </Link>
            <div className="flex items-center gap-2">
              <LayoutDashboard className="size-5 text-primary" />
              <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
            </div>
          </div>
          <Button onClick={handleLogout} variant="ghost" size="sm" className="text-muted-foreground hover:text-red-400">
            Logout
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="glass-card w-full justify-start mb-6 overflow-x-auto flex-nowrap">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="profile">Profile & Bio</TabsTrigger>
            <TabsTrigger value="tech">Tech Stack</TabsTrigger>
            <TabsTrigger value="social">Social Links</TabsTrigger>
            <TabsTrigger value="settings">Site Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <div className="mb-4 flex justify-end">
              <Button onClick={() => { setShowForm(true); setEditingId(null); setForm(EMPTY_PROJECT_FORM); }} className="bg-primary text-primary-foreground hover:brightness-110 text-sm font-semibold" size="sm">
                <Plus className="size-4 mr-1.5" /> Add Project
              </Button>
            </div>

            {showForm && (
              <div className="glass-card rounded-2xl p-6 mb-6 animate-fade-in-up">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-foreground">{editingId ? 'Edit Project' : 'New Project'}</h2>
                  <button onClick={resetForm} className="text-muted-foreground hover:text-foreground"><X className="size-5" /></button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-sm text-muted-foreground">Title *</Label>
                    <Input value={form.title} onChange={(e) => updateProjectField('title', e.target.value)} placeholder="Project title" className="bg-background/50 border-border/60" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm text-muted-foreground">URL</Label>
                    <Input value={form.url} onChange={(e) => updateProjectField('url', e.target.value)} placeholder="https://..." className="bg-background/50 border-border/60" />
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label className="text-sm text-muted-foreground">Description</Label>
                    <Textarea value={form.description} onChange={(e) => updateProjectField('description', e.target.value)} placeholder="Project description" rows={3} className="bg-background/50 border-border/60 resize-none" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm text-muted-foreground">Techs (comma‑separated)</Label>
                    <Input value={form.techs} onChange={(e) => updateProjectField('techs', e.target.value)} placeholder="React, TypeScript, Node.js" className="bg-background/50 border-border/60" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm text-muted-foreground">Button Text</Label>
                    <Input value={form.buttonText} onChange={(e) => updateProjectField('buttonText', e.target.value)} placeholder="View Project" className="bg-background/50 border-border/60" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm text-muted-foreground">Image URL</Label>
                    <Input value={form.imageUrl} onChange={(e) => updateProjectField('imageUrl', e.target.value)} placeholder="https://..." className="bg-background/50 border-border/60" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm text-muted-foreground">Sort Order</Label>
                    <Input type="number" value={form.sortOrder} onChange={(e) => updateProjectField('sortOrder', e.target.value)} className="bg-background/50 border-border/60" />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-5">
                  <Button variant="ghost" onClick={resetForm} className="text-muted-foreground">Cancel</Button>
                  <Button onClick={handleSaveProject} className="bg-primary text-primary-foreground hover:brightness-110 font-semibold">
                    <Save className="size-4 mr-1.5" /> {editingId ? 'Update' : 'Create'}
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {sorted.length === 0 ? (
                <div className="glass-card rounded-2xl p-12 text-center">
                  <Plus className="size-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground mb-4">No projects yet. Add your first one!</p>
                  <Button onClick={() => { setShowForm(true); setEditingId(null); setForm(EMPTY_PROJECT_FORM); }} className="bg-primary">Add Project</Button>
                </div>
              ) : (
                sorted.map((project) => (
                  <div key={project.id} className="glass-card-hover rounded-xl p-4 flex items-center gap-4">
                    <GripVertical className="size-4 text-muted-foreground/40 flex-shrink-0 hidden sm:block" />
                    {project.imageUrl && <img src={project.imageUrl} alt={project.title} className="size-14 rounded-lg object-cover flex-shrink-0 hidden sm:block" />}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-semibold text-foreground text-sm truncate">{project.title}</h3>
                        <span className="text-xs text-muted-foreground tabular-nums">#{project.sortOrder}</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{project.techs.join(' • ')}</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="size-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/5"><ExternalLink className="size-3.5" /></a>}
                      <button onClick={() => startEdit(project)} className="size-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-white/5"><Pencil className="size-3.5" /></button>
                      <button onClick={() => handleDeleteProject(project.id, project.title)} className="size-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-red-400 hover:bg-white/5"><Trash2 className="size-3.5" /></button>
                    </div>
                  </div>
                ))
              )}
            </div>
            {sorted.length > 0 && (
              <div className="mt-6 text-center text-xs text-muted-foreground">
                {sorted.length} project{sorted.length !== 1 ? 's' : ''} total
              </div>
            )}
          </TabsContent>

          <TabsContent value="profile"><ProfileEditor /></TabsContent>
          <TabsContent value="tech"><TechStackEditor /></TabsContent>
          <TabsContent value="social"><SocialLinksEditor /></TabsContent>
          <TabsContent value="settings"><SiteSettingsEditor /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}