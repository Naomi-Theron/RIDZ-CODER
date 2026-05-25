import { useState } from 'react';
import { 
  Menu, X, Home, Code2, FolderKanban, Mail, LogIn, LayoutDashboard, LogOut, Code,
  Users, GraduationCap, Award
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuthStore } from '@/stores/authStore';
import { ALL_ROUTES } from '@/constants/config';

// Map route labels to icons
const ROUTE_ICONS: Record<string, React.ElementType> = {
  Home: Home,
  'Tech Stack': Code2,
  Projects: FolderKanban,
  Contact: Mail,
  Friends: Users,
  Education: GraduationCap,
  Certifications: Award,
};

export default function MenuButton() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, logout } = useAuthStore();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const handleNavClick = (href: string, isAnchor: boolean) => {
    setOpen(false);
    if (isHome && isAnchor) {
      const hash = href.split('#')[1];
      if (hash) {
        const el = document.querySelector(`#${hash}`);
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Logo - only show on home page */}
      {isHome && (
        <div className="fixed top-5 left-5 z-50">
          <div className="glass-card inline-flex items-center gap-2 px-3 py-1.5 rounded-full">
            <Code className="size-4 text-primary" />
            <span className="text-sm font-extrabold tracking-wide text-foreground">
              RIDZ CODER
            </span>
          </div>
        </div>
      )}

      {/* Hamburger button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="fixed top-5 right-5 z-50 glass-card size-11 rounded-full flex items-center justify-center text-foreground transition-colors hover:text-primary"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-72 glass-card z-40 p-6 pt-20 flex flex-col gap-1"
              style={{ background: 'hsla(0, 0%, 8%, 0.95)', backdropFilter: 'blur(20px)' }}
            >
              {/* All routes from config */}
              {ALL_ROUTES.map((route) => {
                const Icon = ROUTE_ICONS[route.label];
                return (
                  <Link
                    key={route.label}
                    to={route.href}
                    onClick={() => handleNavClick(route.href, route.isAnchor)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-white/5"
                  >
                    {Icon && <Icon className="size-4" />}
                    {route.label}
                  </Link>
                );
              })}

              <div className="border-t border-border/40 my-3" />

              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-white/5"
                  >
                    <LayoutDashboard className="size-4" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 transition-colors hover:text-red-300 hover:bg-white/5"
                  >
                    <LogOut className="size-4" />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-white/5"
                >
                  <LogIn className="size-4" />
                  Login
                </Link>
              )}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}