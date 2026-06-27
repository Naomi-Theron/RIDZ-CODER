import { useState, useRef, useEffect } from 'react';
import { 
  Cloud, Server, Database, Code, Terminal, GitBranch, 
  Monitor, Docker, 
} from 'lucide-react';
import MenuButton from '@/components/layout/MenuButton';
import Scene3D from '@/components/features/Scene3D';
import Footer from '@/components/layout/Footer';

interface Skill {
  name: string;
  percentage: number;
  icon: React.ReactNode;
  color: string;
}

interface SkillGroup {
  name: string;
  skills: Skill[];
}

const skillGroups: SkillGroup[] = [
  {
    name: 'Languages & Frameworks',
    skills: [
      { name: 'LangChain', percentage: 85, icon: <Code className="size-4" />, color: 'text-green-400' },
      { name: 'React', percentage: 90, icon: <Code className="size-4" />, color: 'text-cyan-400' },
      { name: 'TypeScript', percentage: 88, icon: <Code className="size-4" />, color: 'text-blue-400' },
      { name: 'Node.js', percentage: 85, icon: <Code className="size-4" />, color: 'text-green-400' },
    ]
  },
  {
    name: 'DevOps & Cloud',
    skills: [
      { name: 'AWS / Azure', percentage: 85, icon: <Cloud className="size-4" />, color: 'text-orange-400' },
      { name: 'Vercel', percentage: 90, icon: <Monitor className="size-4" />, color: 'text-white' },
      { name: 'Docker / K8s', percentage: 85, icon: <Docker className="size-4" />, color: 'text-blue-400' },
      { name: 'CI/CD', percentage: 80, icon: <GitBranch className="size-4" />, color: 'text-purple-400' },
      { name: 'Terraform', percentage: 75, icon: <Server className="size-4" />, color: 'text-purple-400' },
    ]
  },
  {
    name: 'Databases',
    skills: [
      { name: 'PostgreSQL', percentage: 90, icon: <Database className="size-4" />, color: 'text-blue-400' },
      { name: 'MongoDB', percentage: 87, icon: <Database className="size-4" />, color: 'text-green-400' },
      { name: 'Redis', percentage: 85, icon: <Database className="size-4" />, color: 'text-red-400' },
      { name: 'Elasticsearch', percentage: 80, icon: <Database className="size-4" />, color: 'text-yellow-400' },
    ]
  }
];

function SkillBar({ skill, animate, delay }: { skill: Skill; animate: boolean; delay: number }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className={skill.color}>{skill.icon}</span>
          <span className="text-foreground font-medium">{skill.name}</span>
        </div>
        <span className="text-muted-foreground font-mono tabular-nums">{skill.percentage}%</span>
      </div>
      <div className="w-full h-1.5 rounded-full bg-background/50 overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ 
            width: animate ? `${skill.percentage}%` : '0%',
            transitionDelay: `${delay}ms`,
            background: `linear-gradient(90deg, ${getColor(skill.percentage)}, ${getColor(skill.percentage + 10)})`
          }}
        />
      </div>
    </div>
  );
}

function getColor(percentage: number): string {
  if (percentage >= 90) return '#22c55e';
  if (percentage >= 80) return '#3b82f6';
  if (percentage >= 70) return '#eab308';
  return '#ef4444';
}

export default function Skills() {
  const [visibleGroups, setVisibleGroups] = useState<boolean[]>(skillGroups.map(() => false));
  const groupRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = groupRefs.current.map((ref, index) => {
      if (!ref) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleGroups((prev) => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
          }
        },
        { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
      );
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      <Scene3D />
      <MenuButton />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-10 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-1.5 mb-4">
            <Terminal className="size-4 text-primary" />
            <span className="text-xs text-muted-foreground font-mono">tech stack</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Skills & Expertise</h1>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            My technical proficiency across languages, frameworks, cloud platforms, and databases.
          </p>
        </div>

        <div className="space-y-8">
          {skillGroups.map((group, groupIdx) => (
            <div 
              key={group.name} 
              ref={(el) => (groupRefs.current[groupIdx] = el)}
              className="glass-card rounded-2xl p-6 animate-fade-in-up"
              style={{ animationDelay: `${0.1 * groupIdx}s` }}
            >
              <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
                {group.name}
              </h2>
              <div className="space-y-4">
                {group.skills.map((skill, skillIdx) => (
                  <SkillBar 
                    key={skill.name} 
                    skill={skill} 
                    animate={visibleGroups[groupIdx]} 
                    delay={skillIdx * 100}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="glass-card rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-foreground">14</p>
            <p className="text-xs text-muted-foreground">Technologies</p>
          </div>
          <div className="glass-card rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-foreground">4</p>
            <p className="text-xs text-muted-foreground">Years Active</p>
          </div>
          <div className="glass-card rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-foreground">85%</p>
            <p className="text-xs text-muted-foreground">Avg Proficiency</p>
          </div>
          <div className="glass-card rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-foreground">5</p>
            <p className="text-xs text-muted-foreground">Cloud Platforms</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}