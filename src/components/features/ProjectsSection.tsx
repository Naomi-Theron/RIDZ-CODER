import { useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Github, Sparkles } from 'lucide-react';
import { useProjectStore } from '@/stores/projectStore';

export default function ProjectSection() {
  const projects = useProjectStore((s) => s.projects);
  const sorted = Array.isArray(projects) ? [...projects].sort((a, b) => a.sortOrder - b.sortOrder) : [];
  const [currentIndex, setCurrentIndex] = useState(0);

  if (sorted.length === 0) {
    return (
      <section id="projects" className="px-4 py-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Featured Projects
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">My Projects</h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto">No projects yet. Check back soon!</p>
        </div>
      </section>
    );
  }

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % sorted.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + sorted.length) % sorted.length);

  const getCardStyle = (index: number) => {
    const total = sorted.length;
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const isActive = diff === 0;
    const isLeft = diff === -1 || (diff > 0 && total > 2 && diff === total - 1);
    const isRight = diff === 1 || (diff < 0 && total > 2 && diff === -(total - 1));

    if (isActive) {
      return {
        transform: "translateX(0%) translateZ(60px) rotateY(0deg) scale(1)",
        zIndex: 10,
        opacity: 1,
        pointerEvents: "auto" as const,
        filter: "blur(0px)",
      };
    } else if (isLeft) {
      return {
        transform: "translateX(-35%) translateZ(0px) rotateY(25deg) scale(0.75)",
        zIndex: 5,
        opacity: 0.35,
        pointerEvents: "auto" as const,
        filter: "blur(1.5px)",
      };
    } else if (isRight) {
      return {
        transform: "translateX(35%) translateZ(0px) rotateY(-25deg) scale(0.75)",
        zIndex: 5,
        opacity: 0.35,
        pointerEvents: "auto" as const,
        filter: "blur(1.5px)",
      };
    } else {
      return {
        transform: "translateX(0%) translateZ(-100px) rotateY(0deg) scale(0.55)",
        zIndex: 1,
        opacity: 0,
        pointerEvents: "none" as const,
        filter: "blur(4px)",
      };
    }
  };

  return (
    <section id="projects" className="relative w-full max-w-5xl mx-auto py-8 px-4 select-none">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono uppercase tracking-wider mb-2">
          <Sparkles className="w-3 h-3 animate-pulse" />
          Featured Projects
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">My Projects</h2>
        <p className="text-xs text-muted-foreground mt-1 max-w-xl mx-auto">
          Explore my projects – built with modern technologies.
        </p>
      </div>

      <div 
        className="relative h-[300px] md:h-[320px] w-full overflow-visible flex items-center justify-center"
        style={{ perspective: "900px" }}
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {sorted.map((project, index) => {
            const style = getCardStyle(index);
            const isActive = index === currentIndex;

            return (
              <div
                key={project.id}
                onClick={() => { if (!isActive) setCurrentIndex(index); }}
                className="absolute w-[85%] max-w-[260px] h-[240px] rounded-xl border border-white/10 bg-card/80 backdrop-blur-xl transition-all duration-700 ease-out flex flex-col overflow-hidden group cursor-pointer shadow-[0_0_40px_-10px_rgba(255,215,0,0.1)] pointer-events-auto"
                style={{
                  transform: style.transform,
                  zIndex: style.zIndex,
                  opacity: style.opacity,
                  pointerEvents: style.pointerEvents,
                  filter: style.filter,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Image */}
                <div className="relative h-20 overflow-hidden border-b border-white/5">
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/25 to-transparent z-10" />
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/20 flex items-center justify-center text-2xl">🚀</div>
                  )}
                  <div className="absolute bottom-1.5 left-2 z-20 flex items-center gap-1 px-1.5 py-0.5 rounded border border-primary/30 bg-primary/10 text-[8px] font-mono uppercase tracking-wider text-primary">
                    {project.techs?.[0] || 'Project'}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-3 flex flex-col justify-between" style={{ transform: "translateZ(15px)" }}>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                      {project.title}
                    </h3>
                    <p className="text-[10px] text-muted-foreground line-clamp-2 mt-0.5 leading-snug">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.techs?.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-[8px] font-mono text-muted-foreground px-1 py-0.5 rounded bg-white/5 border border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-1.5 border-t border-white/5">
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[9px] font-mono text-muted-foreground hover:text-foreground transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="w-2.5 h-2.5" />
                          Code
                        </a>
                      )}

                      <a
                        href={project.url || '#'}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg border border-primary/20 bg-primary/10 hover:bg-primary hover:border-primary text-[9px] font-mono text-primary hover:text-black transition-all duration-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-2.5 h-2.5" />
                        {project.buttonText || 'View'}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-2 relative z-10">
        <button
          onClick={handlePrev}
          className="p-1.5 rounded-full border border-white/10 bg-card/40 hover:bg-primary/20 hover:border-primary/40 text-muted-foreground hover:text-primary transition-all cursor-pointer backdrop-blur-md"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <span className="text-[10px] font-mono text-muted-foreground">
          <span className="text-primary">{currentIndex + 1}</span> / {sorted.length}
        </span>

        <button
          onClick={handleNext}
          className="p-1.5 rounded-full border border-white/10 bg-card/40 hover:bg-primary/20 hover:border-primary/40 text-muted-foreground hover:text-primary transition-all cursor-pointer backdrop-blur-md"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
}