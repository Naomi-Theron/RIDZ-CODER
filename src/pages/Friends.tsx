import { Github, Twitter, Linkedin, MessageCircle, Users, Code, Heart, Sparkles, Gamepad2, Briefcase } from 'lucide-react';
import MenuButton from '@/components/layout/MenuButton';
import Scene3D from '@/components/features/Scene3D';

const friendsList = [
  {
    name: 'Jinx Or N Jesca',
    role: 'Creative TikToker& Gamer',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg', // replace with actual image
    bio: 'Not into tech, but amazing and provides good advice at times. Jinx brings creativity to every conversation.',
    icon: <Gamepad2 className="size-4" />,
    interests: 'Tiktok, gaming, music',
  },
  {
    name: 'Kevin',
    role: 'Tech Enthusiast & Developer',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    github: 'https://github.com/kevintech-hub',
    twitter: 'https://twitter.com/kevin',
    bio: 'Full‑stack developer, open‑source contributor, and cloud architect. Always debugging something.',
    icon: <Code className="size-4" />,
    interests: 'React, Nodejs, JavaScript',
  },
  {
    name: 'Marion',
    role: ' Courageous and Helpful',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    linkedin: 'https://linkedin.com/in/marion',
    bio: 'Not a coder, but a business strategist who helps tech people communicate value. Loves hiking and coffee.',
    icon: <Briefcase className="size-4" />,
    interests: 'Parting, leadership, nature',
  },
];

export default function Friends() {
  return (
    <div className="relative min-h-screen">
      <Scene3D />
      <MenuButton />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-10 animate-fade-in-up">
          <Users className="size-10 text-primary mx-auto mb-3" />
          <h1 className="text-3xl font-bold text-foreground">My Friends & Collaborators</h1>
          <p className="text-muted-foreground mt-2">A mix of tech minds and creative souls.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {friendsList.map((friend, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] hover:border-primary/30"
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="size-12 rounded-full object-cover ring-2 ring-primary/30"
                />
                <div>
                  <h3 className="font-bold text-foreground">{friend.name}</h3>
                  <p className="text-xs text-primary font-mono">{friend.role}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{friend.bio}</p>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">{friend.icon} {friend.interests}</span>
              </div>
              <div className="flex gap-2 mt-3 pt-2 border-t border-border/40">
                {friend.github && <a href={friend.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Github className="size-4" /></a>}
                {friend.twitter && <a href={friend.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Twitter className="size-4" /></a>}
                {friend.linkedin && <a href={friend.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Linkedin className="size-4" /></a>}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center text-xs text-muted-foreground">
          <Heart className="size-3 inline mr-1 text-primary" /> Mixed vibes, great minds
        </div>
      </div>
    </div>
  );
}