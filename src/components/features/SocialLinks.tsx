import { Github, Send, MessageCircle, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';
import { SOCIAL_LINKS } from '@/constants/config';

const ICON_MAP: Record<string, React.ElementType> = {
  github: Github,
  send: Send,
  messageCircle: MessageCircle,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
};

export default function SocialLinks() {
  // Duplicate the links to create a seamless loop
  const duplicatedLinks = [...SOCIAL_LINKS, ...SOCIAL_LINKS];

  return (
    <div className="w-full overflow-hidden py-6 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
      <div className="animate-scroll-left inline-flex gap-3 whitespace-nowrap">
        {duplicatedLinks.map((link, idx) => {
          const Icon = ICON_MAP[link.icon];
          if (!Icon) return null;
          return (
            <a
              key={`${link.name}-${idx}`}
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
    </div>
  );
}