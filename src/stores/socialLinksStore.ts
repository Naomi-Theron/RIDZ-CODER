import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
}

interface SocialLinksState {
  links: SocialLink[];
  addLink: (link: Omit<SocialLink, 'id'>) => void;
  updateLink: (id: string, updates: Partial<Omit<SocialLink, 'id'>>) => void;
  deleteLink: (id: string) => void;
}

const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const defaultLinks: SocialLink[] = [
  { id: generateId(), name: 'GitHub', url: 'https://github.com/ridzcoder', icon: 'github' },
  { id: generateId(), name: 'Telegram', url: 'https://t.me/ridzcoder', icon: 'send' },
  { id: generateId(), name: 'WhatsApp', url: 'https://wa.me/+237678687593', icon: 'messageCircle' },
  { id: generateId(), name: 'Twitter (X)', url: 'https://twitter.com/ridzcoder', icon: 'twitter' },
  { id: generateId(), name: 'LinkedIn', url: 'https://linkedin.com/in/ridzcoder', icon: 'linkedin' },
];

export const useSocialLinksStore = create<SocialLinksState>()(
  persist(
    (set) => ({
      links: defaultLinks,
      addLink: (link) => set((state) => ({ links: [...state.links, { ...link, id: generateId() }] })),
      updateLink: (id, updates) => set((state) => ({ links: state.links.map((l) => (l.id === id ? { ...l, ...updates } : l)) })),
      deleteLink: (id) => set((state) => ({ links: state.links.filter((l) => l.id !== id) })),
    }),
    { name: 'sociallinks-storage' }
  )
);