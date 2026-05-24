import { Github, Send, MessageCircle, Twitter, Linkedin, Instagram, Youtube, Globe } from 'lucide-react';
import { useSocialLinksStore } from '@/stores/socialLinksStore';

const ICON_MAP: Record<string, React.ElementType> = {
  github: Github,
  send: Send,
  messageCircle: MessageCircle,
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  youtube: Youtube,
  globe: Globe,
};

export default function SocialLinks() {
  const { links } = useSocialLinksStore();

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 py-6 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
      {links.map((link) => {
        const Icon = ICON_MAP[link.icon.toLowerCase()];
        if (!Icon) return null;
        return (
          <a
            key={link.id}
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