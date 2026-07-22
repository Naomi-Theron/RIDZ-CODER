import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Declare VANTA on window
declare global {
  interface Window {
    VANTA: any;
  }
}

interface VantaGlobeBackgroundProps {
  className?: string;
}

export default function VantaGlobeBackground({ className = '' }: VantaGlobeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    // Load VANTA script from CDN if not already loaded
    if (!window.VANTA) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.globe.min.js';
      script.async = true;
      script.onload = () => {
        initializeVanta();
      };
      document.head.appendChild(script);
    } else {
      initializeVanta();
    }

    function initializeVanta() {
      if (!containerRef.current || !window.VANTA) return;
      vantaEffect.current = window.VANTA.GLOBE({
        el: containerRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0xFFD700,        // Gold
        size: 0.50,
        backgroundColor: 0x353839, // Dark gray
      });
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
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