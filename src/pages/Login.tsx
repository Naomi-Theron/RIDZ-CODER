import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User, LogIn } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import MenuButton from '@/components/layout/MenuButton';
import Scene3D from '@/components/features/Scene3D';
import { toast } from 'sonner';

// Validation helpers
const validateUsername = (username: string) => {
  // Alphanumeric only, no special chars, at least 3 chars
  const regex = /^[A-Za-z0-9]{3,}$/;
  return regex.test(username);
};

const validateEmail = (email: string) => {
  // Simple email format check
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validatePassword = (password: string) => {
  // At least 8 chars, one uppercase, one lowercase, one number, one special char
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};:'",.<>?/\\|`~])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};:'",.<>?/\\|`~]{8,}$/;
  return regex.test(password);
};

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect to dashboard
  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate fields
    if (!username.trim()) {
      toast.error('Username is required.');
      setLoading(false);
      return;
    }
    if (!validateUsername(username)) {
      toast.error('Username must be at least 3 characters and contain only letters and numbers (no special chars).');
      setLoading(false);
      return;
    }
    if (!email.trim()) {
      toast.error('Email is required.');
      setLoading(false);
      return;
    }
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address (e.g., user@domain.com).');
      setLoading(false);
      return;
    }
    if (!password.trim()) {
      toast.error('Password is required.');
      setLoading(false);
      return;
    }
    if (!validatePassword(password)) {
      toast.error(
        'Password must be at least 8 characters and include: uppercase, lowercase, a number, and a special character (!@#$%^&* etc.).'
      );
      setLoading(false);
      return;
    }

    // Attempt login
    const success = login(username, email, password);
    if (success) {
      toast.success('Welcome back, ' + username + '!');
      navigate('/dashboard');
    } else {
      toast.error('Invalid credentials. Please check your username, email, and password.');
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <Scene3D />
      <MenuButton />

      <div className="relative z-10 w-full max-w-sm px-4 py-8">
        <div className="glass-card rounded-2xl p-6 space-y-6 animate-fade-in-up">
          <div className="text-center">
            <div className="inline-flex items-center justify-center size-12 rounded-full bg-primary/10 text-primary mb-3">
              <Lock className="size-6" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
            <p className="text-sm text-muted-foreground mt-1">Sign in to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="text-sm text-muted-foreground block mb-1">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g., RidzCoder"
                  className="w-full bg-background/50 border border-border/60 rounded-lg pl-10 pr-4 py-2.5 text-foreground text-sm focus:border-primary focus:outline-none"
                  autoFocus
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-muted-foreground block mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-background/50 border border-border/60 rounded-lg pl-10 pr-4 py-2.5 text-foreground text-sm focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-muted-foreground block mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-background/50 border border-border/60 rounded-lg pl-10 pr-12 py-2.5 text-foreground text-sm focus:border-primary focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground font-semibold py-2.5 rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <LogIn className="size-4" />
              )}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="text-center text-xs text-muted-foreground">
            <p>
              Forgot your password?{' '}
              <Link to="/reset-password" className="text-primary hover:underline">
                Reset it here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}