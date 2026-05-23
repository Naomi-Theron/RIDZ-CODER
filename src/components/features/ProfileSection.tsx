import { Download } from 'lucide-react';
import avatarImg from '@/assets/avatar.jpg';
import { useTypingEffect } from '@/hooks/useTypingEffect';
import { TYPING_ROLES } from '@/constants/config';

export default function ProfileSection() {
  const typedRole = useTypingEffect(TYPING_ROLES, 110, 70, 1800);

  return (
    <section id="home" className="flex flex-col items-center pt-28 pb-10 px-4 animate-fade-in-up">
      {/* Avatar with animated gradient border */}
      <div className="relative mb-6">
        <div
          className="absolute -inset-1 rounded-full animate-color-shift opacity-80"
          style={{
            background: 'conic-gradient(from 0deg, #ff1744, #9c27b0, #00bcd4, #ff1744)',
            filter: 'blur(3px)',
          }}
        />
        <div className="relative size-28 rounded-full overflow-hidden border-2 border-background">
          <img
            src={avatarImg}
            alt="Ridz Coder"
            className="size-full object-cover"
          />
        </div>
      </div>

      {/* Name */}
      <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">
        Ridz Coder
      </h1>

      {/* Typing effect */}
      <div className="flex items-center gap-0.5 font-mono text-lg text-primary h-7">
        <span>{typedRole}</span>
        <span className="animate-blink text-primary font-light">|</span>
      </div>

      {/* Bio Section */}
      <div className="max-w-2xl mt-6 text-center space-y-3">
        <p className="text-muted-foreground text-sm leading-relaxed">
          I'm a self-learned developer from Kenya. I'm still a student, currently in third year 
          at <span className="text-foreground font-medium">Moi University - Eldoret</span>, 
          pursuing a Bachelor of Business Management in the School of Business and Economics.
        </p>
        <p className="text-muted-foreground text-sm leading-relaxed">
          I have a passion for web development, app and software development, backend development 
          and I love to learn new things. I'm also a tech enthusiast and I love to share my knowledge 
          as well as collaborate with others.
        </p>
      </div>

      {/* Resume download */}
      <a
        href="/resume.pdf"
        download
        className="mt-6 glow-button inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold transition-all duration-200 hover:brightness-110"
      >
        <Download className="size-4" />
        Download Resume
      </a>
    </section>
  );
}