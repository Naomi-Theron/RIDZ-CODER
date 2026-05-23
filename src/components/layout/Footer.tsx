import { KeyRound, QrCode, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="px-4 pt-12 pb-8">
      <div className="glass-card rounded-2xl p-8 max-w-lg mx-auto text-center space-y-6">
        <h2 className="text-2xl font-bold text-foreground tracking-tight">RIDZ CODER </h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
     This is my first portfolio website, built entirely for myself using pure TypeScript. From layout to logic, everything is hand-coded to reflect my skills and style. Hope you like it! 
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
   
          <a
            href="https://ridzcoder.zone.id/login"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary/10 border border-primary/20 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
          >
            <QrCode className="size-4" />
            Ridz Only 
          </a>
          <a
            href="https://github.com/ridzcoder/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary/10 border border-primary/20 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
          >
            <Github className="size-4" />
            Source Code
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
          <a
            href="https://github.com/ridzcoder/NEMESIS-MD/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Report Issues
          </a>
          <span className="text-border">•</span>
          <a
            href="https://wa.me/255611199851"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            WhatsApp Support
          </a>
          <span className="text-border">•</span>
          <a
            href="https://whatsapp.com/channel/0029Vb73EYZFXUujAoHFor1i"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Channel
          </a>
        </div>

        <p className="text-xs text-muted-foreground">
          © 2026 Ridz Coder Website• Built 🌋 by{' '}
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
