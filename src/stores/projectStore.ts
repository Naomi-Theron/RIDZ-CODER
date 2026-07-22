import { create } from 'zustand';
import type { Project } from '@/types';
import { DEFAULT_PROJECTS } from '@/constants/mockData';

const STORAGE_KEY = 'ridz-projects';

// ✅ Always returns an array, never undefined or null
function loadProjects(): Project[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.warn('Failed to parse projects from localStorage, using defaults.', error);
  }

  // Fallback to defaults
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROJECTS));
  return DEFAULT_PROJECTS;
}

function saveProjects(projects: Project[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

// Simple UUID fallback for older browsers
function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

interface ProjectState {
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  reorderProjects: (projects: Project[]) => void;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: loadProjects(), // ✅ guaranteed to be an array

  addProject: (data) => {
    const newProject: Project = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [...get().projects, newProject].sort(
      (a, b) => a.sortOrder - b.sortOrder
    );
    saveProjects(updated);
    set({ projects: updated });
  },

  updateProject: (id, data) => {
    const updated = get().projects
      .map((p) =>
        p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p
      )
      .sort((a, b) => a.sortOrder - b.sortOrder);
    saveProjects(updated);
    set({ projects: updated });
  },

  deleteProject: (id) => {
    const updated = get().projects.filter((p) => p.id !== id);
    saveProjects(updated);
    set({ projects: updated });
  },

  reorderProjects: (projects) => {
    saveProjects(projects);
    set({ projects });
  },
}));