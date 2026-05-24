// components/features/TechStackIcon.tsx
import * as Icons from 'react-icons/si';
import { IconType } from 'react-icons';

const iconMap: Record<string, IconType> = {
  SiReact: Icons.SiReact,
  SiTypescript: Icons.SiTypescript,
  SiNodedotjs: Icons.SiNodedotjs,
  SiPython: Icons.SiPython,
  SiTailwindcss: Icons.SiTailwindcss,
  SiMongodb: Icons.SiMongodb,
  SiPostgresql: Icons.SiPostgresql,
  SiGit: Icons.SiGit,
  SiDocker: Icons.SiDocker,
  SiFirebase: Icons.SiFirebase,
  SiNextdotjs: Icons.SiNextdotjs,
  SiSupabase: Icons.SiSupabase,
};

interface TechStackIconProps {
  iconName: string;
  className?: string;
}

export function TechStackIcon({ iconName, className = "size-5" }: TechStackIconProps) {
  const IconComponent = iconMap[iconName];
  if (!IconComponent) return <span className="text-xl">🔧</span>;
  return <IconComponent className={className} />;
}