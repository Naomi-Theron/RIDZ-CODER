import { useMemo } from 'react';
import type { Particle } from '@/types';

const PARTICLE_COUNT = 50;

function generateParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    duration: Math.random() * 8 + 4,
    delay: Math.random() * 6,
    opacity: Math.random() * 0.4 + 0.1,
    // Deep blue variants
    color: Math.random() > 0.6 ? '#3b82f6' : 'rgba(255,255,255,0.6)',
  }));
}

const STATIC_PARTICLES = generateParticles();

export default function Scene3D() {
  const particles = useMemo(() => STATIC_PARTICLES, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />

      {/* Blue glow top-right */}
      <div
        className="absolute -top-32 -right-32 size-96 rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #3b82f6, transparent 70%)' }}
      />

      {/* Deep blue glow bottom-left */}
      <div
        className="absolute -bottom-48 -left-48 size-[500px] rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #1e3a8a, transparent 70%)' }}
      />

      {/* Bright blue glow center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full opacity-[0.04] blur-3xl"
        style={{ background: 'radial-gradient(circle, #3b82f6, transparent 70%)' }}
      />

      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-particle-float"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            opacity: p.opacity,
            boxShadow: p.color === '#3b82f6' ? `0 0 6px ${p.color}` : 'none',
            animationDelay: `${p.delay}s`,
            '--duration': `${p.duration}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* Wireframe Icosahedron-like shape */}
      <div
        className="absolute top-[15%] right-[18%] size-24 animate-spin-slow opacity-20"
        style={{
          border: '1px solid #3b82f6',
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.15)',
        }}
      />

      {/* Wireframe Octahedron-like shape */}
      <div
        className="absolute top-[60%] left-[12%] size-16 animate-drift opacity-15"
        style={{
          border: '1px solid #1e3a8a',
          transform: 'rotate(45deg)',
          boxShadow: '0 0 16px rgba(30, 58, 138, 0.1)',
        }}
      />

      {/* Wireframe Torus-like shape */}
      <div
        className="absolute bottom-[22%] right-[10%] w-20 h-10 rounded-full animate-float opacity-15"
        style={{
          border: '1px solid #3b82f6',
          boxShadow: '0 0 14px rgba(59, 130, 246, 0.1)',
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}