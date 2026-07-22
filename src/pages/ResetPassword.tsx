import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import MenuButton from '@/components/layout/MenuButton';
import VantaGlobeBackground from '@/components/features/VantaGlobeBackground';
import { toast } from 'sonner';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      // Send password reset request to your backend
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSent(true);
        toast.success('Password reset link sent to your email.');
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to send reset link');
      }
    } catch {
      toast.error('Network error. Please try again.');
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
              <Mail className="size-6" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Reset Password</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {sent 
                ? 'Check your email for the reset link' 
                : 'Enter your email to receive a reset link'}
            </p>
          </div>

          {sent ? (
            <div className="space-y-4">
              <div className="glass-card rounded-xl p-4 text-center">
                <p className="text-sm text-muted-foreground">
                  We've sent a password reset link to <strong className="text-foreground">{email}</strong>
                </p>
              </div>
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-primary text-primary-foreground font-semibold py-2.5 rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft className="size-4" />
                Back to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground block mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-background/50 border border-border/60 rounded-lg pl-10 pr-4 py-2.5 text-foreground text-sm focus:border-primary focus:outline-none"
                    autoFocus
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground font-semibold py-2.5 rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send className="size-4" />
                )}
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>

              <button
                type="button"
                onClick={() => navigate('/login')}
                className="w-full text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                ← Back to Login
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}