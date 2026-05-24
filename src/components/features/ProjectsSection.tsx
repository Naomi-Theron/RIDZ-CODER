import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  sortOrder: number;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="glass-card rounded-2xl overflow-hidden bg-card/50 hover:bg-card transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      {/* Project Image (if available) */}
      {project.imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      
      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {project.title}
        </h3>
        
        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {project.description}
        </p>
        
        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.techStack.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="text-xs bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              {tech}
            </Badge>
          ))}
        </div>
        
        {/* Action Buttons - Centered */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {project.liveUrl && (
            <Button
              onClick={() => window.open(project.liveUrl, '_blank')}
              className="gap-2 bg-primary text-primary-foreground hover:brightness-110"
              size="default"
            >
              <ExternalLink className="size-4" />
              View Project
            </Button>
          )}
          
          {project.githubUrl && (
            <Button
              onClick={() => window.open(project.githubUrl, '_blank')}
              variant="outline"
              className="gap-2"
              size="default"
            >
              <Github className="size-4" />
              GitHub
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}