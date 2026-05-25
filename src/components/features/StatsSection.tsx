import { useEffect, useRef, useState } from 'react';
import { Code2, FolderGit2, Calendar, Coffee, Sparkles } from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';
import { useProjectStore } from '@/stores/projectStore';

interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  suffix?: string;
  label: string;
  accentColor?: string;
}

function StatCard({ icon, value, suffix = '', label, accentColor = 'text-primary' }: StatCardProps) {
  const { count, ref } = useCountUp(value, 1800);

  return (
    <div ref={ref} className="glass-card rounded-lg p-2 text-center group hover:border-primary/30 transition-all hover:scale-[1.02]">
      <div className={`inline-flex items-center justify-center size-7 rounded-md bg-primary/10 mb-1.5 ${accentColor} group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <p className="text-lg font-bold text-foreground tabular-nums">
        {count}
        {suffix && <span className="text-primary">{suffix}</span>}
      </p>
      <p className="text-[10px] text-muted-foreground mt-0.5">{label}</p>
      <Sparkles className="absolute top-1 right-1 size-2.5 text-primary/0 group-hover:text-primary/60 transition-all" />
    </div>
  );
}

export default function StatsSection() {
  const projects = useProjectStore((s) => s.projects);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // only animate once
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const uniqueTechs = new Set(projects.flatMap((p) => p.techs));
  const currentYear = new Date().getFullYear();
  const startYear = 2021;
  const yearsActive = currentYear - startYear;

  return (
    <section ref={sectionRef} className="px-4 pb-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {/* Each card gets a class that triggers slide‑in from right when parent is visible */}
        <div
          className={`transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}
        >
          <StatCard
            icon={<FolderGit2 className="size-3.5" />}
            value={projects.length}
            label="Projects"
          />
        </div>
        <div
          className={`transition-all duration-700 ease-out delay-100 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}
        >
          <StatCard
            icon={<Code2 className="size-3.5" />}
            value={uniqueTechs.size}
            label="Technologies"
          />
        </div>
        <div
          className={`transition-all duration-700 ease-out delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}
        >
          <StatCard
            icon={<Calendar className="size-3.5" />}
            value={yearsActive}
            suffix="+"
            label="Years Active"
          />
        </div>
        <div
          className={`transition-all duration-700 ease-out delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}
        >
          <StatCard
            icon={<Coffee className="size-3.5" />}
            value={1240}
            suffix="+"
            label="Commits"
          />
        </div>
      </div>
    </section>
  );
}