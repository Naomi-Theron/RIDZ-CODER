import {
  ReactIcon, // Note: Lucide doesn't have a "react" icon, we'll use a different approach
  FileCode,
  Terminal,
  Python,
  Tailwind,
  Database,
  GitBranch,
  Docker,
  Flame,
  Box, // placeholder for Next.js (or use a custom icon)
  Zap,
} from 'lucide-react';
import { TECH_STACK } from '@/constants/config';

// Create a mapping from icon name to Lucide component
// (Lucide doesn't have all brand icons; you might need to use `lucide-react/icons` or `react-icons` library for better brand support)
const iconMap: Record<string, any> = {
  react: () => <span className="text-2xl text-cyan-400">⚛️</span>, // Fallback emoji, but better use react-icons
  fileCode: FileCode,
  node: Terminal,
  python: Python,
  tailwind: Tailwind,
  database: Database,
  gitBranch: GitBranch,
  docker: Docker,
  flame: Flame,
  next: Box,
  zap: Zap,
};

export default function TechStackSection() {
  return (
    <section id="tech" className="px-4 py-10 animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
      <h2 className="section-title text-center mb-6">My Tech Stack</h2>
      <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
        {TECH_STACK.map((tech) => {
          const IconComponent = iconMap[tech.icon];
          return (
            <div
              key={tech.name}
              className="glass-card-hover rounded-lg px-2 py-2 flex flex-col items-center gap-1 text-center transition-transform duration-200 hover:scale-105"
            >
              {IconComponent ? (
                <IconComponent className="size-5 text-primary" strokeWidth={1.5} />
              ) : (
                <span className="text-xl">🔧</span>
              )}
              <span className="text-[10px] font-medium text-muted-foreground leading-tight">
                {tech.name}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}