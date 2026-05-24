// src/components/features/TechStackSection.tsx
import { TECH_STACK } from '@/constants/config';
import * as Icons from 'react-icons/si';
import { IconType } from 'react-icons';

// Map icon names (strings) to actual react-icons components
const iconMap: Record<string, IconType> = {
  SiReact: Icons.SiReact,
  SiTypescript: Icons.SiTypescript,
  SiNodedotjs: Icons.SiNodedotjs,
  SiPython: Icons.SiPython,
  SiTailwindcss: Icons.SiTailwindcss,
  SiMongodb: Icons.SiMongodb,
  SiPostgresql: Icons.SiPostgresql,
  SiGit: Icons.SiGit,
  SiDocker: Icons.SiDocker,
  SiFirebase: Icons.SiFirebase,
  SiNextdotjs: Icons.SiNextdotjs,
  SiSupabase: Icons.SiSupabase,
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
                <IconComponent className="size-5 text-primary" />
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