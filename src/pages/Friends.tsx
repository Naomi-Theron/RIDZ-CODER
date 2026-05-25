import { 
  Github, Twitter, Linkedin, MessageCircle, Users, Code, Heart, Gamepad2, Briefcase, Plane 
} from 'lucide-react';
import MenuButton from '@/components/layout/MenuButton';
import Scene3D from '@/components/features/Scene3D';
import Footer from '@/components/layout/Footer'; // adjust path if needed

const friendsList = [
  {
    name: 'Jinx Bae',
    role: 'Creative TikTokee& Gamer',
    avatar: 'https://files.catbox.moe/6ptig7.png', // replace with actual image
    bio: 'Not into tech, but amazing at comfort and storytelling. Jinx brings creativity to every conversation.',
    icon: <Gamepad2 className="size-4" />,
    interests: 'Tiktok, gaming, music',
  },
  {
    name: 'Kevin Tech',
    role: 'Tech Enthusiast & Developer',
    avatar: 'https://files.catbox.moe/pynavf.png',
    github: 'https://github.com/kevintech-hub',
    bio: 'Full‑stack developer, open‑source contributor, and cloud architect. Always debugging something.',
    icon: <Code className="size-4" />,
    interests: 'React, JavaScript, Typescript',
  },
  {
    name: 'Marion',
    role: 'Overthinking & Strategy',
    avatar: 'https://files.catbox.moe/ifhwop.png',
    bio: 'Not a coder, but a business lady and a single mother of one and always admirable. Loves hiking and coffee.',
    icon: <Briefcase className="size-4" />,
    interests: 'Marketing, leadership, nature',
  },
  {
    name: 'sarah Feffe',
    role: 'My OG & Student of Arts',
    avatar: 'https://files.catbox.moe/0wbapt.png',
    bio: 'Always There when you need her, Funny girl first a nice voice but very talkative when with a trusted person.',
    icon: <Plane className="size-4" />,
    interests: 'Art, Tiktok, traveling',
  },
];

export default function Friends() {
  return (
    <div className="relative min-h-screen">
      <Scene3D />
      <MenuButton />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-10 animate-fade-in-up">
          <Users className="size-12 text-primary mx-auto mb-3" />
          <h1 className="text-3xl font-bold text-foreground">My Friends & Collaborators</h1>
          <p className="text-muted-foreground mt-2">A mix of tech minds and creative souls.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {friendsList.map((friend, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-6 text-center transition-all duration-300 hover:scale-[1.02] hover:border-primary/30"
            >
              {/* Centered, larger avatar */}
              <div className="flex justify-center mb-4">
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="size-24 rounded-full object-cover ring-2 ring-primary/30"
                />
              </div>
              <h3 className="font-bold text-foreground text-xl">{friend.name}</h3>
              <p className="text-sm text-primary font-mono mb-2">{friend.role}</p>
              <p className="text-sm text-muted-foreground mb-3">{friend.bio}</p>
              <div className="flex justify-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">{friend.icon} {friend.interests}</span>
              </div>
              <div className="flex justify-center gap-3 mt-4 pt-3 border-t border-border/40">
                {friend.github && <a href={friend.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Github className="size-5" /></a>}
                {friend.twitter && <a href={friend.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="size-5" /></a>}
                {friend.linkedin && <a href={friend.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="size-5" /></a>}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-xs text-muted-foreground">
          <Heart className="size-3 inline mr-1 text-primary" /> Mixed vibes, great minds
        </div>
      </div>

      {/* Shared footer */}
      <Footer />
    </div>
  );
}