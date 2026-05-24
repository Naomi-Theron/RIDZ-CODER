import type { TechItem, SocialLink } from '@/types';

export const SITE_CONFIG = {
  name: 'Ridz Coder',
  title: 'Ridz Coder — Developer Portfolio',
  description: 'Full-stack developer portfolio. React, TypeScript, Node.js, and more.',
  email: 'ridzcoder@gmail.com',
  timezone: 'Africa/Kampala',
} as const;

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/ridzcoder', icon: 'github' },
  { name: 'Telegram', url: 'https://t.me/ridzcoder', icon: 'send' },
  { name: 'WhatsApp', url: 'https://wa.me/+237678687593', icon: 'messageCircle' },
];

// Updated: store icon names (camelCase as used by lucide-react)
export const TECH_STACK: TechItem[] = [
  { name: 'React', icon: 'react' },
  { name: 'TypeScript', icon: 'fileCode' },
  { name: 'Node.js', icon: 'node' },
  { name: 'Python', icon: 'python' },
  { name: 'Tailwind CSS', icon: 'tailwind' },
  { name: 'MongoDB', icon: 'database' },
  { name: 'PostgreSQL', icon: 'database' },
  { name: 'Git', icon: 'gitBranch' },
  { name: 'Docker', icon: 'docker' },
  { name: 'Firebase', icon: 'flame' },
  { name: 'Next.js', icon: 'next' },
  { name: 'Supabase', icon: 'zap' },
];

export const TYPING_ROLES = ['Developer', 'Designer', 'Creator', 'Innovator','Graphics Desiger'];

export const AUTH_CREDENTIALS = {
  email: 'ridzcoder@gmail.com',
  password: 'Ridzcoder@19',
} as const;

export const NAV_SECTIONS = [
  { label: 'Home', href: '#home' },
  { label: 'Tech Stack', href: '#tech' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
] as const;