import { useState } from 'react';
import { 
  Download, Search, Folder, ChevronDown, ChevronRight
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
  imageUrl: string;
  fileType: string;
}

const downloadItems: DownloadItem[] = [
  {
    id: 'Nemesis-mini',
    name: 'NEMESIS-MINI',
    description: 'Lightweight WhatsApp bot with basic automation features.',
    category: 'Minibot',
    fileSize: '1.4 MB',
    downloadUrl: '/files/minibot.zip',
    imageUrl: 'https://files.catbox.moe/ww35zj.png',
    fileType: '.zip',
  },
  {
    id: 'Vermilion-md',
    name: 'VERMILION MD v2.0',
    description: 'Enhanced version with multi-device support and custom commands.',
    category: 'normalbot',
    fileSize: '3.1 MB',
    downloadUrl: '/files/minibot-v2.zip',
    imageUrl: 'https://files.catbox.moe/do545q.jpg',
    fileType: '.zip',
  },
  // Bugbot
  {
    id: 'bugbot',
    name: 'Nemesis Bugbot',
    description: 'Automated bug reporting and tracking tool for Whatsapp.',
    category: 'Bugbot',
    fileSize: '1.8 MB',
    downloadUrl: '/files/bugbot-beta.zip',
    imageUrl: 'https://files.catbox.moe/qrphel.png',
    fileType: '.zip',
  },

];

const categories = ['All', 'Minibot', 'Bugbot', 'Normal Bot'];

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

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
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

        {/* Downloads Grid – cards with images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.length === 0 ? (
            <div className="col-span-full glass-card rounded-2xl p-12 text-center">
              <Folder className="size-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No files found. Try adjusting your search.</p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="glass-card rounded-2xl overflow-hidden transition-all hover:scale-[1.02] hover:border-primary/30 flex flex-col"
              >
                {/* Image */}
                <div className="w-full aspect-video overflow-hidden bg-background/50">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-foreground text-base truncate">{item.name}</h3>
                    <span className="text-[10px] text-muted-foreground bg-background/50 px-2 py-0.5 rounded-full whitespace-nowrap">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2 flex-1">
                    {item.description}
                  </p>

                  {/* Meta info */}
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="font-mono">{item.fileSize}</span>
                    <span className="opacity-50">•</span>
                    <span>{item.fileType}</span>
                  </div>

                  {/* Expandable details */}
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="mt-1 text-[10px] text-muted-foreground hover:text-foreground flex items-center gap-1 self-start"
                  >
                    {expanded[item.id] ? (
                      <ChevronDown className="size-3" />
                    ) : (
                      <ChevronRight className="size-3" />
                    )}
                    {expanded[item.id] ? 'Hide details' : 'Show details'}
                  </button>
                  {expanded[item.id] && (
                    <div className="mt-2 p-2 bg-background/30 rounded-lg text-[10px] text-muted-foreground space-y-1">
                      <p><strong>File type:</strong> {item.fileType}</p>
                      <p><strong>Size:</strong> {item.fileSize}</p>
                      <p><strong>MD5:</strong> <span className="font-mono">d41d8cd98f00b204e9800998ecf8427e</span></p>
                    </div>
                  )}

                  {/* Download button at bottom */}
                  <a
                    href={item.downloadUrl}
                    download
                    onClick={() => handleDownload(item)}
                    className="mt-4 w-full glass-card px-4 py-2 rounded-lg text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="size-4" />
                    Download {item.name}
                  </a>
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