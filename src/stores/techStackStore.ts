import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TechItem {
  id: string;
  name: string;
  icon: string; // e.g., 'SiReact'
}

interface TechStackState {
  items: TechItem[];
  addItem: (item: Omit<TechItem, 'id'>) => void;
  updateItem: (id: string, updates: Partial<Omit<TechItem, 'id'>>) => void;
  deleteItem: (id: string) => void;
  reorderItems: (newOrder: TechItem[]) => void;
}

const defaultTechs: TechItem[] = [
  { id: '1', name: 'React', icon: 'SiReact' },
  { id: '2', name: 'TypeScript', icon: 'SiTypescript' },
  { id: '3', name: 'Node.js', icon: 'SiNodedotjs' },
  { id: '4', name: 'Python', icon: 'SiPython' },
  { id: '5', name: 'Tailwind CSS', icon: 'SiTailwindcss' },
  { id: '6', name: 'MongoDB', icon: 'SiMongodb' },
  { id: '7', name: 'PostgreSQL', icon: 'SiPostgresql' },
  { id: '8', name: 'Git', icon: 'SiGit' },
  { id: '9', name: 'Docker', icon: 'SiDocker' },
  { id: '10', name: 'Firebase', icon: 'SiFirebase' },
  { id: '11', name: 'Next.js', icon: 'SiNextdotjs' },
  { id: '12', name: 'Supabase', icon: 'SiSupabase' },
];

export const useTechStackStore = create<TechStackState>()(
  persist(
    (set) => ({
      items: defaultTechs,
      addItem: (item) =>
        set((state) => ({
          items: [...state.items, { ...item, id: crypto.randomUUID() }],
        })),
      updateItem: (id, updates) =>
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, ...updates } : i)),
        })),
      deleteItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      reorderItems: (newOrder) => set({ items: newOrder }),
    }),
    { name: 'techstack-storage' }
  )
);