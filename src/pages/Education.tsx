import { GraduationCap, BookOpen, Award, Calendar, MapPin } from 'lucide-react';
import MenuButton from '@/components/layout/MenuButton';
import Scene3D from '@/components/features/Scene3D';

const educationData = [
  {
    degree: 'Bachelor of Business Management',
    institution: 'Moi University – Eldoret',
    period: '2024 – Present (3rd Year)',
    description: 'Focus on entrepreneurship, project management, and business analytics.',
    icon: <GraduationCap className="size-5" />,
  },
  {
    degree: 'Full-Stack Web Development',
    institution: 'Self‑taught / Online Courses',
    period: '2021 – Present',
    description: 'React, TypeScript, Node.js, Tailwind CSS, MongoDB, PostgreSQL, and more.',
    icon: <Code className="size-5" />,
  },
  {
    degree: 'The Complete JavaScript Course',
    institution: 'Udemy',
    period: '2022',
    description: 'Advanced JavaScript, ES6+, asynchronous programming, and APIs.',
    icon: <BookOpen className="size-5" />,
  },
  {
    degree: 'Node.js & Express Masterclass',
    institution: 'freeCodeCamp / YouTube',
    period: '2023',
    description: 'Building REST APIs, authentication, real‑time apps with Socket.io.',
    icon: <Code className="size-5" />,
  },
];

export default function Education() {
  return (
    <div className="relative min-h-screen">
      <Scene3D />
      <MenuButton />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-20">
        <div className="text-center mb-10 animate-fade-in-up">
          <GraduationCap className="size-10 text-primary mx-auto mb-3" />
          <h1 className="text-3xl font-bold text-foreground">Education & Learning</h1>
          <p className="text-muted-foreground mt-2">My academic background and continuous learning journey.</p>
        </div>

        <div className="relative border-l-2 border-primary/30 ml-4 space-y-8">
          {educationData.map((item, idx) => (
            <div key={idx} className="relative pl-6 animate-fade-in-up" style={{ animationDelay: `${0.1 * idx}s` }}>
              <div className="absolute -left-3 top-1 p-1 rounded-full bg-primary/20 border border-primary/40">
                {item.icon}
              </div>
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-foreground text-lg">{item.degree}</h3>
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-1 mb-2">
                  <span className="flex items-center gap-1">{item.institution}</span>
                  <span className="flex items-center gap-1"><Calendar className="size-3" /> {item.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <div className="glass-card rounded-full px-4 py-2 text-xs text-primary flex items-center gap-2">
            <Award className="size-4" /> Always learning, always growing.
          </div>
        </div>
      </div>
    </div>
  );
}