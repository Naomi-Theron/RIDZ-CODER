import { Download } from 'lucide-react';
import { Code2, Globe, Database, Smartphone, Share2, GraduationCap } from 'lucide-react';
import avatarImg from '@/assets/avatar.jpg';
import { useTypingEffect } from '@/hooks/useTypingEffect';
import { TYPING_ROLES } from '@/constants/config';

export default function ProfileSection() {
  const typedRole = useTypingEffect(TYPING_ROLES, 110, 70, 1800);

  const services = [
    {
      icon: <Code2 className="size-6" />,
      title: "Web Development",
      description: "I build responsive, modern, and high-performance websites using React, Tailwind CSS, and other cutting-edge technologies. From landing pages to complex web applications, I ensure seamless user experiences across all devices."
    },
    {
      icon: <Smartphone className="size-6" />,
      title: "App Development",
      description: "Creating cross-platform mobile applications that work flawlessly on both iOS and Android. I focus on intuitive interfaces, smooth animations, and efficient performance to deliver engaging mobile experiences."
    },
    {
      icon: <Database className="size-6" />,
      title: "Backend Development",
      description: "Designing and implementing robust server-side logic, RESTful APIs, and database architectures. I work with various databases and frameworks to ensure data flows securely and efficiently between frontend and backend systems."
    },
    {
      icon: <Globe className="size-6" />,
      title: "Software Development",
      description: "Building scalable desktop and web software solutions tailored to specific business needs. I write clean, maintainable code that solves real-world problems and enhances productivity for users."
    },
    {
      icon: <Share2 className="size-6" />,
      title: "Tech Collaboration & Knowledge Sharing",
      description: "I'm passionate about giving back to the tech community. I actively collaborate with other developers, share insights through discussions, and believe that collective growth makes the tech ecosystem stronger for everyone."
    },
    {
      icon: <GraduationCap className="size-6" />,
      title: "Continuous Learning & Growth",
      description: "Technology evolves rapidly, and so do I. I'm constantly exploring new frameworks, tools, and best practices. From AI to cloud computing, I love expanding my skillset and staying ahead of industry trends."
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
          I'm a self-learned developer from Uganda.Don't Ask For My Age Am Old Enough        </p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-5 rounded-xl border border-border bg-card/50 hover:bg-card transition-all duration-300 hover:scale-105 hover:shadow-lg text-center"
            >
              <div className="flex justify-center mb-3">
                <div className="text-primary group-hover:scale-110 transition-transform duration-200">
                  {service.icon}
                </div>
              </div>
              <h3 className="font-semibold text-foreground text-base mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
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