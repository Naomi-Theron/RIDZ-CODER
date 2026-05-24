import { Github, Send, MessageCircle, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';
import { SOCIAL_LINKS } from '@/constants/config';

const ICON_MAP: Record<string, React.ElementType> = {
  github: Github,
  send: Send,
  messageCircle: MessageCircle,
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  youtube: Youtube,
};

export default function SocialLinks() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 py-6 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
      {SOCIAL_LINKS.map((link) => {
        const Icon = ICON_MAP[link.icon];
        // Fallback to a generic link icon if not found
        if (!Icon) return null;
        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.name}
            className="glass-card-hover flex items-center justify-center size-10 rounded-full text-muted-foreground transition-all duration-200 hover:text-primary hover:scale-110"
          >
            <Icon className="size-4" />
          </a>
        );
      })}
    </div>
  );
}