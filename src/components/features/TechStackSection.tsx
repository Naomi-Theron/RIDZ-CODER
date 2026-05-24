import { TECH_STACK } from '@/constants/config';

export default function TechStackSection() {
  return (
    <section id="tech" className="px-4 py-10 animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
      <h2 className="section-title text-center mb-6">My Tech Stack</h2>
      <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
        {TECH_STACK.map((tech) => (
          <div
            key={tech.name}
            className="glass-card-hover rounded-lg px-2 py-2 flex flex-col items-center gap-1 text-center transition-transform duration-200 hover:scale-105"
          >
            <span className="text-xl" role="img" aria-label={tech.name}>
              {tech.icon}
            </span>
            <span className="text-[10px] font-medium text-muted-foreground leading-tight">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}