import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus, Pencil, Trash2, Save, X, ArrowLeft, LayoutDashboard, GripVertical, ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useProjectStore } from '@/stores/projectStore';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'sonner';
import type { Project } from '@/types';
import MenuButton from '@/components/layout/MenuButton';
import Scene3D from '@/components/features/Scene3D';

interface ProjectFormData {
  title: string;
  description: string;
  techs: string;
  url: string;
  buttonText: string;
  imageUrl: string;
  sortOrder: string;
}

const EMPTY_FORM: ProjectFormData = {
  title: '',
  description: '',
  techs: '',
  url: '',
  buttonText: 'View Project',
  imageUrl: '',
  sortOrder: '0',
};

export default function Dashboard() {
  const { projects, addProject, updateProject, deleteProject } = useProjectStore();
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<ProjectFormData>(EMPTY_FORM);

  const sorted = [...projects].sort((a, b) => a.sortOrder - b.sortOrder);

  const resetForm = () => {
    setForm(EMPTY_FORM);
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

  const handleSave = () => {
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

  const handleDelete = (id: string, title: string) => {
    deleteProject(id);
    toast.success(`"${title}" deleted`);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const updateField = (field: keyof ProjectFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="relative min-h-screen">
      <Scene3D />
      <MenuButton />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="glass-card size-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-4" />
            </Link>
            <div className="flex items-center gap-2">
              <LayoutDashboard className="size-5 text-primary" />
              <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => { setShowForm(true); setEditingId(null); setForm(EMPTY_FORM); }}
              className="bg-primary text-primary-foreground hover:brightness-110 text-sm font-semibold"
              size="sm"
            >
              <Plus className="size-4 mr-1.5" />
              Add Project
            </Button>
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-red-400"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="glass-card rounded-2xl p-6 mb-6 animate-fade-in-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-foreground">
                {editingId ? 'Edit Project' : 'New Project'}
              </h2>
              <button onClick={resetForm} aria-label="Close form" className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="size-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm text-muted-foreground">Title *</Label>
                <Input
                  value={form.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder="Project title"
                  className="bg-background/50 border-border/60"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm text-muted-foreground">URL</Label>
                <Input
                  value={form.url}
                  onChange={(e) => updateField('url', e.target.value)}
                  placeholder="https://..."
                  className="bg-background/50 border-border/60"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label className="text-sm text-muted-foreground">Description</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="Project description"
                  rows={3}
                  className="bg-background/50 border-border/60 resize-none"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm text-muted-foreground">Techs (comma-separated)</Label>
                <Input
                  value={form.techs}
                  onChange={(e) => updateField('techs', e.target.value)}
                  placeholder="React, TypeScript, Node.js"
                  className="bg-background/50 border-border/60"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm text-muted-foreground">Button Text</Label>
                <Input
                  value={form.buttonText}
                  onChange={(e) => updateField('buttonText', e.target.value)}
                  placeholder="View Project"
                  className="bg-background/50 border-border/60"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm text-muted-foreground">Image URL</Label>
                <Input
                  value={form.imageUrl}
                  onChange={(e) => updateField('imageUrl', e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="bg-background/50 border-border/60"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm text-muted-foreground">Sort Order</Label>
                <Input
                  type="number"
                  value={form.sortOrder}
                  onChange={(e) => updateField('sortOrder', e.target.value)}
                  className="bg-background/50 border-border/60"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <Button variant="ghost" onClick={resetForm} className="text-muted-foreground">
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-primary text-primary-foreground hover:brightness-110 font-semibold"
              >
                <Save className="size-4 mr-1.5" />
                {editingId ? 'Update' : 'Create'}
              </Button>
            </div>
          </div>
        )}

        {/* Project List */}
        <div className="space-y-3">
          {sorted.length === 0 ? (
            <div className="glass-card rounded-2xl p-12 text-center">
              <Plus className="size-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground mb-4">No projects yet. Add your first one!</p>
              <Button
                onClick={() => { setShowForm(true); setEditingId(null); setForm(EMPTY_FORM); }}
                className="bg-primary text-primary-foreground hover:brightness-110"
              >
                <Plus className="size-4 mr-1.5" />
                Add Project
              </Button>
            </div>
          ) : (
            sorted.map((project) => (
              <div
                key={project.id}
                className="glass-card-hover rounded-xl p-4 flex items-center gap-4"
              >
                <GripVertical className="size-4 text-muted-foreground/40 flex-shrink-0 hidden sm:block" />

                {project.imageUrl && (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="size-14 rounded-lg object-cover flex-shrink-0 hidden sm:block"
                  />
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-semibold text-foreground text-sm truncate">
                      {project.title}
                    </h3>
                    <span className="text-xs text-muted-foreground tabular-nums">
                      #{project.sortOrder}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {project.techs.join(' • ')}
                  </p>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open project URL"
                      className="size-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                    >
                      <ExternalLink className="size-3.5" />
                    </a>
                  )}
                  <button
                    onClick={() => startEdit(project)}
                    aria-label="Edit project"
                    className="size-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-white/5 transition-colors"
                  >
                    <Pencil className="size-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id, project.title)}
                    aria-label="Delete project"
                    className="size-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-red-400 hover:bg-white/5 transition-colors"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Stats */}
        {sorted.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              {sorted.length} project{sorted.length !== 1 ? 's' : ''} total
            </p>
          </div>
        )}
      </div>
    </div>
  );
}