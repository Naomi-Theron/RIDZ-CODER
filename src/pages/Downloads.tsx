import { useState } from 'react';
import { 
  Download, File, Folder, FileArchive, FileCode, FileJson, 
  Search, Filter, ChevronDown, ChevronRight
} from 'lucide-react';
import MenuButton from '@/components/layout/MenuButton';
import Scene3D from '@/components/features/Scene3D';
import Footer from '@/components/layout/Footer';
import { toast } from 'sonner';

interface DownloadItem {
  id: string;
  name: string;
  description: string;
  category: string;
  fileSize: string;
  downloadUrl: string;
  icon: React.ReactNode;
  fileType: string;
}

const downloadItems: DownloadItem[] = [
  // Minibot
  {
    id: 'minibot-v1',
    name: 'Minibot v1.0',
    description: 'Lightweight WhatsApp bot with basic automation features.',
    category: 'Minibot',
    fileSize: '2.4 MB',
    downloadUrl: '/files/minibot-v1.zip',
    icon: <FileArchive className="size-5" />,
    fileType: '.zip',
  },
  {
    id: 'minibot-v2',
    name: 'Minibot v2.0',
    description: 'Enhanced version with multi-device support and custom commands.',
    category: 'Minibot',
    fileSize: '3.1 MB',
    downloadUrl: '/files/minibot-v2.zip',
    icon: <FileArchive className="size-5" />,
    fileType: '.zip',
  },
  // Bugbot
  {
    id: 'bugbot-beta',
    name: 'Bugbot Beta',
    description: 'Automated bug reporting and tracking tool for GitHub issues.',
    category: 'Bugbot',
    fileSize: '1.8 MB',
    downloadUrl: '/files/bugbot-beta.zip',
    icon: <FileCode className="size-5" />,
    fileType: '.zip',
  },
  {
    id: 'bugbot-stable',
    name: 'Bugbot Stable',
    description: 'Production-ready bug tracking bot with webhook support.',
    category: 'Bugbot',
    fileSize: '2.2 MB',
    downloadUrl: '/files/bugbot-stable.zip',
    icon: <FileCode className="size-5" />,
    fileType: '.zip',
  },
  // Nomoral Bat
  {
    id: 'nomoral-bat-v1',
    name: 'Nomoral Bat v1.0',
    description: 'Batch automation scripts for repetitive tasks on Windows.',
    category: 'Nomoral Bat',
    fileSize: '0.8 MB',
    downloadUrl: '/files/nomoral-bat-v1.zip',
    icon: <File className="size-5" />,
    fileType: '.bat',
  },
  {
    id: 'nomoral-bat-v2',
    name: 'Nomoral Bat v2.0',
    description: 'Advanced batch scripts with error handling and logging.',
    category: 'Nomoral Bat',
    fileSize: '1.2 MB',
    downloadUrl: '/files/nomoral-bat-v2.zip',
    icon: <File className="size-5" />,
    fileType: '.bat',
  },
  // Others
  {
    id: 'wa-automation',
    name: 'WhatsApp Automation Tool',
    description: 'Python script for scheduling WhatsApp messages.',
    category: 'Others',
    fileSize: '0.9 MB',
    downloadUrl: '/files/wa-automation.zip',
    icon: <FileJson className="size-5" />,
    fileType: '.py',
  },
  {
    id: 'server-monitor',
    name: 'Server Monitor Script',
    description: 'Bash script for monitoring server uptime and sending alerts.',
    category: 'Others',
    fileSize: '0.5 MB',
    downloadUrl: '/files/server-monitor.zip',
    icon: <File className="size-5" />,
    fileType: '.sh',
  },
];

const categories = ['All', 'Minibot', 'Bugbot', 'Nomoral Bat', 'Others'];

export default function Downloads() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredItems = downloadItems.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (item: DownloadItem) => {
    toast.success(`Downloading ${item.name}...`);
    // You can add analytics or tracking here
  };

  return (
    <div className="relative min-h-screen">
      <Scene3D />
      <MenuButton />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-1.5 mb-4">
            <Download className="size-4 text-primary" />
            <span className="text-xs text-muted-foreground font-mono">downloads</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">File Downloads</h1>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            Download scripts, bots, and tools I've built. Choose your favorite file.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search files..."
              className="w-full bg-background/50 border border-border/60 rounded-lg pl-10 pr-4 py-2 text-foreground text-sm focus:border-primary"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'glass-card text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Downloads List */}
        <div className="space-y-3">
          {filteredItems.length === 0 ? (
            <div className="glass-card rounded-2xl p-12 text-center">
              <Folder className="size-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No files found. Try adjusting your search.</p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="glass-card rounded-xl p-4 transition-all hover:scale-[1.01] hover:border-primary/30"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="text-primary mt-1">
                    {item.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-foreground text-sm truncate">{item.name}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-[10px] text-muted-foreground bg-background/50 px-2 py-0.5 rounded-full">
                          {item.category}
                        </span>
                        <span className="text-[10px] text-muted-foreground">{item.fileSize}</span>
                        <a
                          href={item.downloadUrl}
                          download
                          onClick={() => handleDownload(item)}
                          className="glass-card px-3 py-1.5 rounded-lg text-xs font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                        >
                          <Download className="size-3.5" />
                          Download
                        </a>
                      </div>
                    </div>
                    {/* Expandable details (optional) */}
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="mt-1 text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                    >
                      {expanded[item.id] ? (
                        <ChevronDown className="size-3" />
                      ) : (
                        <ChevronRight className="size-3" />
                      )}
                      {expanded[item.id] ? 'Hide details' : 'Show details'}
                    </button>
                    {expanded[item.id] && (
                      <div className="mt-2 p-2 bg-background/30 rounded-lg text-xs text-muted-foreground">
                        <p><strong>File type:</strong> {item.fileType}</p>
                        <p><strong>Size:</strong> {item.fileSize}</p>
                        <p><strong>MD5:</strong> <span className="font-mono">d41d8cd98f00b204e9800998ecf8427e</span></p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Stats Footer */}
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>{downloadItems.length} files available across 4 categories.</p>
          <p className="mt-1">All files are provided as-is. Use responsibly.</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}