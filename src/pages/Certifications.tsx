import { Award, CheckCircle2 } from 'lucide-react';
import MenuButton from '@/components/layout/MenuButton';
import Scene3D from '@/components/features/Scene3D';

const certifications = [
  { name: 'JavaScript Algorithms and Data Structures', issuer: 'freeCodeCamp', year: 2022, credential: 'https://freecodecamp.org/cert/...' },
  { name: 'React – The Complete Guide', issuer: 'Udemy', year: 2023 },
  { name: 'Tailwind CSS from Scratch', issuer: 'YouTube / Self', year: 2023 },
  { name: 'Node.js & Express – REST APIs', issuer: 'IBM / Coursera', year: 2024 },
];

export default function Certifications() {
  return (
    <div className="relative min-h-screen">
      <Scene3D />
      <MenuButton />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-20">
        <div className="text-center mb-10 animate-fade-in-up">
          <Award className="size-10 text-primary mx-auto mb-3" />
          <h1 className="text-3xl font-bold text-foreground">Certifications</h1>
          <p className="text-muted-foreground mt-2">Formal recognitions of my skills.</p>
        </div>

        <div className="space-y-3">
          {certifications.map((cert, idx) => (
            <div key={idx} className="glass-card rounded-xl p-4 flex items-center gap-3 transition-all hover:scale-[1.01]">
              <CheckCircle2 className="size-5 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">{cert.name}</h3>
                <p className="text-xs text-muted-foreground">{cert.issuer} • {cert.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}