import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User, LogIn, ShieldCheck, Send, CheckCircle } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import MenuButton from '@/components/layout/MenuButton';
import VantaGlobeBackground from '@/components/features/VantaGlobeBackground';
import { toast } from 'sonner';

const validateUsername = (username: string) => /^[A-Za-z0-9]{3,}$/.test(username);
const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};:'",.<>?/\\|`~])[A-Za-z\d!@#$%^&*()_+\-=[\]{};:'",.<>?/\\|`~]{8,}$/.test(password);

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const [step, setStep] = useState<'credentials' | 'verify'>('credentials');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);

  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  }

  const handleSendCode = async (e: FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return toast.error('Username required');
    if (!validateUsername(username)) return toast.error('Username: 3+ chars, letters/numbers only');
    if (!email.trim()) return toast.error('Email required');
    if (!validateEmail(email)) return toast.error('Invalid email');
    if (!password.trim()) return toast.error('Password required');
    if (!validatePassword(password)) {
      return toast.error('Password must have uppercase, lowercase, number, special char, min 8 chars');
    }

    setSendingCode(true);
    try {
      const res = await fetch('/api/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Verification code sent to your email.');
        setStep('verify');
      } else {
        toast.error(data.error || 'Failed to send code');
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setSendingCode(false);
    }
  };

  const handleVerifyCode = async (e: FormEvent) => {
    e.preventDefault();
    if (!verificationCode.trim()) return toast.error('Please enter the 6‑digit code');

    setLoading(true);
    try {
      const res = await fetch('/api/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: verificationCode }),
      });
      const data = await res.json();
      if (res.ok) {
        const success = login(username, email, password);
        if (success) {
          toast.success('Welcome back, ' + username + '!');
          navigate('/dashboard');
        } else {
          toast.error('Invalid credentials. Please check your username, email, and password.');
        }
      } else {
        toast.error(data.error || 'Invalid code');
      }
    } catch {
      toast.error('Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <VantaGlobeBackground />
      <MenuButton />

      <div className="relative z-10 w-full max-w-sm px-4 py-8">
        <div className="glass-card rounded-2xl p-6 space-y-6 animate-fade-in-up">
          <div className="text-center">
            <div className="inline-flex items-center justify-center size-12 rounded-full bg-primary/10 text-primary mb-3">
              {step === 'credentials' ? <Lock className="size-6" /> : <ShieldCheck className="size-6" />}
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              {step === 'credentials' ? 'Welcome Back' : 'Verify Your Email'}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {step === 'credentials'
                ? 'Enter your credentials to continue'
                : `We sent a 6‑digit code to ${email}`}
            </p>
          </div>

          {step === 'credentials' ? (
            <form onSubmit={handleSendCode} className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground block mb-1">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="RidzCoder"
                    className="w-full bg-background/50 border border-border/60 rounded-lg pl-10 pr-4 py-2.5 text-foreground text-sm focus:border-primary focus:outline-none"
                    autoFocus
                  />
                </div>
              </div>

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
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={sendingCode}
                className="w-full bg-primary text-primary-foreground font-semibold py-2.5 rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {sendingCode ? (
                  <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send className="size-4" />
                )}
                {sendingCode ? 'Sending code...' : 'Send Code'}
              </button>

              <div className="text-center text-xs text-muted-foreground">
                <Link to="/reset-password" className="text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground block mb-1">Verification Code</label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="6‑digit code"
                  className="w-full bg-background/50 border border-border/60 rounded-lg px-4 py-2.5 text-foreground text-center text-xl tracking-widest font-mono focus:border-primary focus:outline-none"
                  maxLength={6}
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground font-semibold py-2.5 rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <CheckCircle className="size-4" />
                )}
                {loading ? 'Verifying...' : 'Verify & Sign In'}
              </button>

              <button
                type="button"
                onClick={() => setStep('credentials')}
                className="w-full text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                ← Back to credentials
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}