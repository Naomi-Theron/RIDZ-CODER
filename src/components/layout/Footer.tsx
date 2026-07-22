import { KeyRound, QrCode, Github, CheckCircle2, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleString('en-US', {
        timeZone: 'Africa/Kampala',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      setCurrentTime(formatted);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="px-4 pt-12 pb-8">
      <div className="glass-card rounded-2xl p-8 max-w-lg mx-auto text-center space-y-6">
        <h2 className="text-2xl font-bold text-foreground tracking-tight">RIDZ CODER</h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
          This is my first portfolio website, built entirely for myself using pure TypeScript. 
          From layout to logic, everything is hand-coded to reflect my skills and style. Hope you like it!
        </p>


        {/* System Status + Live Clock */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 border-t border-border/50">
          <div className="flex items-center gap-2 text-xs bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
            <CheckCircle2 className="size-3.5 text-emerald-400" />
            <span className="text-emerald-400 font-medium">All systems operational</span>
          </div>
          <div className="flex items-center gap-2 text-xs bg-primary/5 px-3 py-1.5 rounded-full border border-primary/10">
            <Clock className="size-3.5 text-primary" />
            <span className="text-muted-foreground">
              EAT {currentTime} • <span className="text-primary/80">Live</span>
            </span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          © 2026 Ridz Coder Website • Built 🧨 by{' '}
          <a
            href="https://github.com/ridzcoder"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-medium hover:underline"
          >
            Ridz coder X Theron
          </a>
        </p>
      </div>
    </footer>
  );
}