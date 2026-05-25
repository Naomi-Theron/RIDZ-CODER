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
  // New social links
  { name: 'Twitter (X)', url: 'https://twitter.com/ridzcoder', icon: 'twitter' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/ridzcoder', icon: 'linkedin' },
  { name: 'Instagram', url: 'https://instagram.com/ridzcoder', icon: 'instagram' },
  { name: 'YouTube', url: 'https://youtube.com/@ridzcoder', icon: 'youtube' },
];

export const TECH_STACK: TechItem[] = [
  { name: 'React', icon: 'SiReact' },
  { name: 'TypeScript', icon: 'SiTypescript' },
  { name: 'Node.js', icon: 'SiNodedotjs' },
  { name: 'Python', icon: 'SiPython' },
  { name: 'Tailwind CSS', icon: 'SiTailwindcss' },
  { name: 'MongoDB', icon: 'SiMongodb' },
  { name: 'PostgreSQL', icon: 'SiPostgresql' },
  { name: 'Git', icon: 'SiGit' },
  { name: 'Docker', icon: 'SiDocker' },
  { name: 'Firebase', icon: 'SiFirebase' },
  { name: 'Next.js', icon: 'SiNextdotjs' },
  { name: 'Supabase', icon: 'SiSupabase' },
];

export const TYPING_ROLES = ['Developer', 'Designer', 'Creator', 'Innovator', 'Graphics Designer'];

export const AUTH_CREDENTIALS = {
  email: 'ridzcoder@gmail.com',
  password: 'Ridzcoder@19',
} as const;

export const NAV_SECTIONS = [
  { label: 'Home', href: '#home', path: '/' },
  { label: 'Tech Stack', href: '#tech', path: '/' },
  { label: 'Projects', href: '#projects', path: '/' },
  { label: 'Contact', href: '#contact', path: '/' },
] as const;

export const ALL_ROUTES = [
  { label: 'Home', href: '/', isAnchor: false },
  { label: 'Tech Stack', href: '/#tech', isAnchor: true },
  { label: 'Projects', href: '/#projects', isAnchor: true },
  { label: 'Contact', href: '/#contact', isAnchor: true },
  { label: 'Friends', href: '/friends', isAnchor: false },

] as const;