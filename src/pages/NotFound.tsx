import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, AlertTriangle } from 'lucide-react';
import MenuButton from '@/components/layout/MenuButton';
import Scene3D from '@/components/features/Scene3D';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen">
      <Scene3D />
      <MenuButton />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <AlertTriangle className="size-16 text-primary mb-4" />
        <h1 className="text-6xl font-bold text-foreground mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="glass-card inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-primary hover:text-primary/80 transition-colors"
        >
          <Home className="size-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;