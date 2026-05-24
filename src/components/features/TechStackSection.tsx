import * as Icons from 'react-icons/si';
import { IconType } from 'react-icons';
import { useTechStackStore } from '@/stores/techStackStore';

// Map icon names to actual components
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
  SiCode: Icons.SiCode,
};

export default function TechStackSection() {
  const { items } = useTechStackStore();

  return (
    <section id="tech" className="px-4 py-10 animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
      <h2 className="section-title text-center mb-6">My Tech Stack</h2>
      <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
        {items.map((tech) => {
          const IconComponent = iconMap[tech.icon];
          return (
            <div
              key={tech.id}
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