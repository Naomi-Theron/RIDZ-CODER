import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import GLOBE from 'vanta/dist/vanta.globe.min';

interface VantaGlobeBackgroundProps {
  className?: string;
}

export default function VantaGlobeBackground({ className = '' }: VantaGlobeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Vanta Globe
    vantaEffect.current = GLOBE({
      el: containerRef.current,
      THREE: THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0x1729bc,        // Deep blue – matches your theme
      size: 0.50,
      backgroundColor: 0x0a0e1a, // Dark background (match your dark theme)
    });

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}