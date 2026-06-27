import { lazy, Suspense, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '@/components/features/ProtectedRoute';

const Home = lazy(() => import('@/pages/Home'));
const Login = lazy(() => import('@/pages/Login'));
const ResetPassword = lazy(() => import('@/pages/ResetPassword'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Friends = lazy(() => import('@/pages/Friends'));
const Skills = lazy(() => import('@/pages/Skills'));
const Certifications = lazy(() => import('@/pages/Certifications'));
const Donation = lazy(() => import('@/pages/Donation'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// ... LoadingFallback (unchanged) ...

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
        <Route path="/skills" element={<Skills />} />   
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/donate" element={<Donation />} /> 
        {/* Catch‑all route – must be last */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}