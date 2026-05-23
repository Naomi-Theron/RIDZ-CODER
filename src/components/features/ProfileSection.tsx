import { Download } from 'lucide-react';
import { Code2, Globe, Database, Smartphone, Share2, GraduationCap } from 'lucide-react';
import avatarImg from '@/assets/avatar.jpg';
import { useTypingEffect } from '@/hooks/useTypingEffect';
import { TYPING_ROLES } from '@/constants/config';

export default function ProfileSection() {
  const typedRole = useTypingEffect(TYPING_ROLES, 110, 70, 1800);

  const services = [
    {
      icon: <Code2 className="size-5" />,
      title: "Web Development",
      description: "Building responsive, modern websites with React, Tailwind, and modern tech stacks"
    },
    {
      icon: <Smartphone className="size-5" />,
      title: "App Development",
      description: "Creating cross-platform mobile applications with great user experiences"
    },
    {
      icon: <Database className="size-5" />,
      title: "Backend Development",
      description: "Developing robust APIs, databases, and server-side logic"
    },
    {
      icon: <Globe className="size-5" />,
      title: "Software Development",
      description: "Building scalable desktop and web software solutions"
    },
    {
      icon: <Share2 className="size-5" />,
      title: "Tech Collaboration",
      description: "Sharing knowledge, collaborating on projects, and contributing to the dev community"
    },
    {
      icon: <GraduationCap className="size-5" />,
      title: "Continuous Learning",
      description: "Always exploring new technologies and improving my skills"
    }
  ];

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
                   I'm a self-learned developer from Uganda.Don't Ask For My Age Am Old Enough
        </p>
        <p className="text-muted-foreground text-sm leading-relaxed">
          I have a passion for web development, app and software development, backend development 
          and I love to learn new things. I'm also a tech enthusiast and I love to share my knowledge 
          as well as collaborate with others.
        </p>
      </div>

      {/* What I Do Section */}
      <div className="max-w-4xl w-full mt-10">
        <h2 className="text-xl font-semibold text-foreground text-center mb-6">
          What I Do
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-4 rounded-xl border border-border bg-card/50 hover:bg-card transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="text-primary group-hover:scale-110 transition-transform duration-200">
                  {service.icon}
                </div>
                <h3 className="font-semibold text-foreground text-sm">
                  {service.title}
                </h3>
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Resume download */}
      <a
        href="/resume.pdf"
        download
        className="mt-10 glow-button inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold transition-all duration-200 hover:brightness-110"
      >
        <Download className="size-4" />
        Download Resume
      </a>
    </section>
  );
}