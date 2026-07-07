import { useState } from 'react';
import { 
  Menu, X, Home,Package,Download, Code2, FolderKanban, Mail, LogIn, LayoutDashboard, LogOut, Code,
  Users, Award, Heart, BookOpen, Gift, UserPlus
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuthStore } from '@/stores/authStore';
import { ALL_ROUTES } from '@/constants/config';

const ROUTE_ICONS: Record<string, React.ElementType> = {
  Home: Home,
  'Tech Stack': Code2,
  Projects: FolderKanban,
  Contact: Mail, 
Downloads: Download,
Services: Package,
  Friends: Users,          
  Certifications: Award, 
  Donate: Heart,
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
      {/* Permanent top bar with glass background */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl">
        <div className="glass-card rounded-2xl px-4 py-2 flex items-center justify-between">
          {/* Left: Icon */}
          <div className="flex items-center gap-2">
            <Code className="size-4 text-primary" />
          </div>

          {/* Center: Site Name */}
          <span className="text-sm font-extrabold tracking-wide text-foreground">
            RIDZ CODER
          </span>

          {/* Right: Hamburger menu button */}
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="glass-card size-9 rounded-full flex items-center justify-center text-foreground transition-colors hover:text-primary"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Drawer */}
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
              {ALL_ROUTES.map((route) => {
                const Icon = ROUTE_ICONS[route.label] || Home;
                return (
                  <Link
                    key={route.label}
                    to={route.href}
                    onClick={() => handleNavClick(route.href, route.isAnchor || false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-white/5"
                  >
                    <Icon className="size-4" />
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