import { ExternalLink, Layers } from 'lucide-react';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="glass-card-hover rounded-2xl overflow-hidden group">
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
        <img
          src={project.imageUrl}
          alt={project.title}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <Layers className="size-4 text-primary flex-shrink-0" />
          <h3 className="font-semibold text-foreground text-base truncate">
            {project.title}
          </h3>
        </div>

        <div className="border-l-2 border-primary/40 pl-3 mb-4">
          <p className="text-sm text-muted-foreground line-clamp-2 text-pretty">
            {project.description}
          </p>
        </div>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.techs.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTA - Centered */}
        <div className="flex justify-center">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="glow-button inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold transition-all duration-200 hover:brightness-110"
          >
            {project.buttonText || 'View Project'}
            <ExternalLink className="size-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}