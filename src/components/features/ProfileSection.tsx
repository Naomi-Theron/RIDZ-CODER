import { Download } from 'lucide-react';
import avatarImg from '@/assets/avatar.jpg'; // fallback
import { useTypingEffect } from '@/hooks/useTypingEffect';
import { useSettingsStore } from '@/stores/settingsStore';

export default function ProfileSection() {
  const { name, bio, avatarUrl, typingRoles, resumeUrl } = useSettingsStore();
  const typedRole = useTypingEffect(typingRoles, 110, 70, 1800);

  // fallback to default avatar if none provided
  const avatarSrc = avatarUrl || avatarImg;

  return (
    <section id="home" className="flex flex-col items-center pt-28 pb-10 px-4 animate-fade-in-up">
      {/* Avatar */}
      <div className="relative mb-6">
        <div
          className="absolute -inset-1 rounded-full animate-color-shift opacity-80"
          style={{
            background: 'conic-gradient(from 0deg, #1e3a8a, #3b82f6, #1e40af, #1e3a8a)',
            filter: 'blur(3px)',
          }}
        />
        <div className="relative size-28 rounded-full overflow-hidden border-2 border-background">
          <img src={avatarSrc} alt={name} className="size-full object-cover" />
        </div>
      </div>

      {/* Name with glass background */}
      <div className="mb-2">
        <div className="glass-card inline-block px-6 py-2 rounded-full">
          <h1 className="text-3xl font-bold text-foreground text-balance">{name}</h1>
        </div>
      </div>

      {/* Typing effect */}
      <div className="flex items-center gap-0.5 font-mono text-lg text-primary h-7">
        <span>{typedRole}</span>
        <span className="animate-blink text-primary font-light">|</span>
      </div>

      {/* Bio Section */}
      <div className="max-w-2xl mt-6 text-center space-y-3">
        {bio.map((paragraph, idx) => (
          <p key={idx} className="text-muted-foreground text-sm leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Resume download */}
      <a
        href={resumeUrl}
        download
        className="mt-6 glow-button inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold transition-all duration-200 hover:brightness-110"
      >
        <Download className="size-4" />
        Download Resume
      </a>
    </section>
  );
}