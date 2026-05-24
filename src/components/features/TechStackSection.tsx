import { SiReact, SiTypescript, SiNodedotjs, SiPython, SiTailwindcss, SiMongodb, SiPostgresql, SiGit, SiDocker, SiFirebase, SiNextdotjs, SiSupabase } from 'react-icons/si';
import { TECH_STACK } from '@/constants/config';

const iconMap = {
  react: SiReact,
  fileCode: SiTypescript,
  node: SiNodedotjs,
  python: SiPython,
  tailwind: SiTailwindcss,
  database: SiMongodb, // you can differentiate MongoDB vs PostgreSQL later
  gitBranch: SiGit,
  docker: SiDocker,
  flame: SiFirebase,
  next: SiNextdotjs,
  zap: SiSupabase,
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
              {IconComponent && <IconComponent className="size-5 text-primary" />}
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