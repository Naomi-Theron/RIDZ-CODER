import { lazy, Suspense, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '@/components/features/ProtectedRoute';

const Home = lazy(() => import('@/pages/Home'));
const Login = lazy(() => import('@/pages/Login'));
const ResetPassword = lazy(() => import('@/pages/ResetPassword'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Friends = lazy(() => import('@/pages/Friends'));
const Certifications = lazy(() => import('@/pages/Certifications'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function LoadingFallback() {
  const [messageIndex, setMessageIndex] = useState(0);

  const bootMessages = [
    'Initializing system...',
    'Loading modules...',
    'Establishing secure connection...',
    'Preparing database...',
    'Mounting components...',
    'Starting runtime environment...',
    'Optimizing performance...',
    'Ready.',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % bootMessages.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
      </div>

      {/* Glowing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-64 rounded-full bg-primary/5 blur-3xl animate-pulse" />

      <div className="relative z-10 flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative">
          <div className="size-12 rounded-full border-2 border-primary/30 border-t-primary animate-[spin_2s_linear_infinite]" />
          <div className="absolute inset-0 size-12 rounded-full border-2 border-primary/10 animate-ping" />
        </div>

        {/* Hi‑Tech message */}
        <div className="glass-card px-5 py-2 rounded-full backdrop-blur-sm">
          <p className="font-mono text-xs text-primary/90 tracking-wider">
            {bootMessages[messageIndex]}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/friends" element={<Friends />} />
        
        <Route path="/certifications" element={<Certifications />} />
        
        {/* Catch‑all route – must be last */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}