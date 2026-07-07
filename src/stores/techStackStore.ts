import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TechItem {
  id: string;
  name: string;
  icon: string;
}

interface TechStackState {
  items: TechItem[];
  addItem: (item: Omit<TechItem, 'id'>) => void;
  updateItem: (id: string, updates: Partial<Omit<TechItem, 'id'>>) => void;
  deleteItem: (id: string) => void;
}

const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const defaultTechs: TechItem[] = [
  { id: generateId(), name: 'React', icon: 'SiReact' },
  { id: generateId(), name: 'TypeScript', icon: 'SiTypescript' },
  { id: generateId(), name: 'Node.js', icon: 'SiNodedotjs' },
  { id: generateId(), name: 'Python', icon: 'SiPython' },
  { id: generateId(), name: 'Tailwind CSS', icon: 'SiTailwindcss' },
  { id: generateId(), name: 'MongoDB', icon: 'SiMongodb' },
  { id: generateId(), name: 'PostgreSQL', icon: 'SiPostgresql' },
  { id: generateId(), name: 'Git', icon: 'SiGit' },
  { id: generateId(), name: 'Docker', icon: 'SiDocker' },
  { id: generateId(), name: 'Firebase', icon: 'SiFirebase' },
  { id: generateId(), name: 'Next.js', icon: 'SiNextdotjs' },
  { id: generateId(), name: 'Supabase', icon: 'SiSupabase' },
];

export const useTechStackStore = create<TechStackState>()(
  persist(
    (set) => ({
      items: defaultTechs,
      addItem: (item) => set((state) => ({ items: [...state.items, { ...item, id: generateId() }] })),
      updateItem: (id, updates) => set((state) => ({ items: state.items.map((i) => (i.id === id ? { ...i, ...updates } : i)) })),
      deleteItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
    }),
    { name: 'techstack-storage' }
  )
);