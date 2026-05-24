import { QrCode, Github, CheckCircle2, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSettingsStore } from '@/stores/settingsStore';
import { useSocialLinksStore } from '@/stores/socialLinksStore';

export default function Footer() {
  const { footerText, copyrightName, siteEmail, timezone } = useSettingsStore();
  const { links } = useSocialLinksStore();
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleString('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      setCurrentTime(formatted);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  // Find specific social links for quick buttons
  const ridzOnlyLink = links.find(l => l.name === 'Ridz Only')?.url || 'https://ridzcoder.zone.id/login';
  const sourceCodeLink = links.find(l => l.name === 'GitHub')?.url || 'https://github.com/ridzcoder/';

  return (
    <footer className="px-4 pt-12 pb-8">
      <div className="glass-card rounded-2xl p-8 max-w-lg mx-auto text-center space-y-6">
        <h2 className="text-2xl font-bold text-foreground tracking-tight">RIDZ CODER</h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
          {footerText}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={ridzOnlyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary/10 border border-primary/20 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
          >
            <QrCode className="size-4" />
            Ridz Only
          </a>
          <a
            href={sourceCodeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary/10 border border-primary/20 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
          >
            <Github className="size-4" />
            Source Code
          </a>
        </div>

        {/* System status row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 border-t border-border/50">
          <div className="flex items-center gap-2 text-xs bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
            <CheckCircle2 className="size-3.5 text-emerald-400" />
            <span className="text-emerald-400 font-medium">All systems operational</span>
          </div>
          <div className="flex items-center gap-2 text-xs bg-primary/5 px-3 py-1.5 rounded-full border border-primary/10">
            <Clock className="size-3.5 text-primary" />
            <span className="text-muted-foreground">
              {currentTime} • <span className="text-primary/80">Live</span>
            </span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {copyrightName} • Built 🧨 by{' '}
          <a
            href={sourceCodeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-medium hover:underline"
          >
            {copyrightName}
          </a>
        </p>
      </div>
    </footer>
  );
}