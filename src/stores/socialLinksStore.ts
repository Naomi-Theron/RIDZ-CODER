import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string; // icon name from lucide-react (e.g., 'github', 'twitter')
}

interface SocialLinksState {
  links: SocialLink[];
  addLink: (link: Omit<SocialLink, 'id'>) => void;
  updateLink: (id: string, updates: Partial<Omit<SocialLink, 'id'>>) => void;
  deleteLink: (id: string) => void;
}

const defaultLinks: SocialLink[] = [
  { id: '1', name: 'GitHub', url: 'https://github.com/ridzcoder', icon: 'github' },
  { id: '2', name: 'Telegram', url: 'https://t.me/ridzcoder', icon: 'send' },
  { id: '3', name: 'WhatsApp', url: 'https://wa.me/+237678687593', icon: 'messageCircle' },
  { id: '4', name: 'Twitter', url: 'https://twitter.com/ridzcoder', icon: 'twitter' },
  { id: '5', name: 'LinkedIn', url: 'https://linkedin.com/in/ridzcoder', icon: 'linkedin' },
];

export const useSocialLinksStore = create<SocialLinksState>()(
  persist(
    (set) => ({
      links: defaultLinks,
      addLink: (link) =>
        set((state) => ({ links: [...state.links, { ...link, id: crypto.randomUUID() }] })),
      updateLink: (id, updates) =>
        set((state) => ({
          links: state.links.map((l) => (l.id === id ? { ...l, ...updates } : l)),
        })),
      deleteLink: (id) =>
        set((state) => ({ links: state.links.filter((l) => l.id !== id) })),
    }),
    { name: 'sociallinks-storage' }
  )
);