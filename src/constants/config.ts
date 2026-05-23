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

export const TECH_STACK: TechItem[] = [
  { name: 'React', icon: '🌋' },
  { name: 'TypeScript', icon: '🏔️' },
  { name: 'Node.js', icon: '🪀' },
  { name: 'Python', icon: '🧚' },
  { name: 'Tailwind CSS', icon: '🍂' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'PostgreSQL', icon: '❄️' },
  { name: 'Git', icon: '☄️' },
  { name: 'Docker', icon: '🐳' },
  { name: 'Firebase', icon: '🔥' },
  { name: 'Next.js', icon: '🦁' },
  { name: 'Supabase', icon: '⚡' },
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
