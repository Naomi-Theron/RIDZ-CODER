import { useProjectStore } from '@/stores/projectStore';
import ProjectCard from '@/components/features/ProjectCard';
import { FolderOpen } from 'lucide-react';

export default function ProjectsSection() {
  const projects = useProjectStore((s) => s.projects);
  const sorted = [...projects].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section id="projects" className="px-4 py-10">
      <h2 className="section-title text-center mb-6">My Projects</h2>

      {sorted.length === 0 ? (
        <div className="glass-card rounded-2xl p-10 text-center max-w-sm mx-auto">
          <FolderOpen className="size-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">No projects yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-5 max-w-lg mx-auto">
          {sorted.map((project, i) => (
            <div
              key={project.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${0.1 * i}s` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
