import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  // Profile
  name: string;
  title: string;
  bio: string[];
  avatarUrl: string;
  resumeUrl: string;
  // Typing roles
  typingRoles: string[];
  // Stats
  yearsActiveStart: number;
  totalCommits: number;
  // Footer
  footerText: string;
  copyrightName: string;
  // Site
  siteEmail: string;
  timezone: string;

  // Actions
  updateSettings: (updates: Partial<SettingsState>) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      name: 'Ridz Coder',
      title: 'Developer Portfolio',
      bio: [
        "I'm a self-learned developer from Kenya. I'm still a student, currently in third year at Moi University - Eldoret, pursuing a Bachelor of Business Management.",
        "I have a passion for web development, app and software development, backend development and I love to learn new things. I'm also a tech enthusiast and I love to share my knowledge as well as collaborate with others."
      ],
      avatarUrl: '/src/assets/avatar.jpg', // or a CDN URL
      resumeUrl: '/resume.pdf',
      typingRoles: ['Developer', 'Designer', 'Creator', 'Innovator', 'Graphics Designer'],
      yearsActiveStart: 2021,
      totalCommits: 1240,
      footerText: 'This is my first portfolio website, built entirely for myself using pure TypeScript. From layout to logic, everything is hand-coded to reflect my skills and style. Hope you like it!',
      copyrightName: 'Ridz coder X Theron',
      siteEmail: 'ridzcoder@gmail.com',
      timezone: 'Africa/Kampala',

      updateSettings: (updates) => set((state) => ({ ...state, ...updates })),
    }),
    { name: 'settings-storage' }
  )
);