import { Code2, FolderGit2, Calendar, Coffee, Sparkles } from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';
import { useProjectStore } from '@/stores/projectStore';
import { useSettingsStore } from '@/stores/settingsStore';

// ... StatCard component same as before, but imported

export default function StatsSection() {
  const projects = useProjectStore((s) => s.projects);
  const { yearsActiveStart, totalCommits } = useSettingsStore();

  const uniqueTechs = new Set(projects.flatMap((p) => p.techs));
  const currentYear = new Date().getFullYear();
  const yearsActive = currentYear - yearsActiveStart;

  return (
    <section className="px-4 pb-6 animate-fade-in-up">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <StatCard icon={<FolderGit2 className="size-3.5" />} value={projects.length} label="Projects" />
        <StatCard icon={<Code2 className="size-3.5" />} value={uniqueTechs.size} label="Technologies" />
        <StatCard icon={<Calendar className="size-3.5" />} value={yearsActive} suffix="+" label="Years Active" />
        <StatCard icon={<Coffee className="size-3.5" />} value={totalCommits} suffix="+" label="Commits" />
      </div>
    </section>
  );
}