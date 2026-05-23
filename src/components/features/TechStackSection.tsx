import { TECH_STACK } from '@/constants/config';

export default function TechStackSection() {
  return (
    <section id="tech" className="px-4 py-10 animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
      <h2 className="section-title text-center mb-6">My Tech Stack</h2>
      <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
        {TECH_STACK.map((tech) => (
          <div
            key={tech.name}
            className="glass-card-hover rounded-xl px-3 py-3 flex flex-col items-center gap-1.5 text-center transition-transform duration-200 hover:scale-105"
          >
            <span className="text-2xl" role="img" aria-label={tech.name}>
              {tech.icon}
            </span>
            <span className="text-xs font-medium text-muted-foreground">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
