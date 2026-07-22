import { useState } from 'react';
import { 
  Code, Smartphone, Database, Cloud, Shield, 
  Package, Send, Coffee, MessageCircle
} from 'lucide-react';
import MenuButton from '@/components/layout/MenuButton';
import VantaGlobeBackground from '@/components/features/VantaGlobeBackground';
import Footer from '@/components/layout/Footer';
import { toast } from 'sonner';

interface Service {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  price: string;
  priceLabel: string;
  popular?: boolean;
}

const services: Service[] = [
  {
    id: 'web-dev',
    title: 'Web Development',
    icon: <Code className="size-6" />,
    description: 'Full-stack web applications built with React, TypeScript, Node.js, and Tailwind CSS.',
    features: ['Responsive design', 'API integration', 'Database setup', 'Deployment & hosting'],
    price: 'UGX 15,000',
    priceLabel: 'Starting at',
    popular: true,
  },
  {
    id: 'app-dev',
    title: 'App Development',
    icon: <Smartphone className="size-6" />,
    description: 'Cross-platform mobile apps using React Native, Flutter, or web-based solutions.',
    features: ['iOS & Android support', 'Offline capability', 'Push notifications', 'App store deployment'],
    price: 'UGX 25,000',
    priceLabel: 'Starting at',
  },
  {
    id: 'whatsapp-bot',
    title: 'WhatsApp Bot',
    icon: <MessageCircle className="size-6" />,
    description: 'Automated WhatsApp bots for business, customer service, and community management.',
    features: ['Multi-device support', 'Auto-replies & commands', 'Media handling', 'Custom workflows'],
    price: 'UGX 10,000',
    priceLabel: 'Starting at',
  },
  {
    id: 'backend-api',
    title: 'Backend & API',
    icon: <Database className="size-6" />,
    description: 'Robust, scalable backend systems with RESTful APIs, WebSockets, and cloud integration.',
    features: ['REST & GraphQL APIs', 'Authentication & security', 'Database design', 'Server deployment'],
    price: 'UGX 20,000',
    priceLabel: 'Starting at',
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps',
    icon: <Cloud className="size-6" />,
    description: 'Deployment, monitoring, and infrastructure automation on AWS, Vercel, and Docker.',
    features: ['CI/CD pipelines', 'Containerization', 'Cloud migration', 'Security hardening'],
    price: 'UGX 18,000',
    priceLabel: 'Starting at',
  },
  {
    id: 'security-encryption',
    title: 'Security & Encryption',
    icon: <Shield className="size-6" />,
    description: 'Code obfuscation, encryption engines, and security audits for your applications.',
    features: ['Code obfuscation', 'Encryption tools', 'Security audits', 'Vulnerability fixes'],
    price: 'UGX 12,000',
    priceLabel: 'Starting at',
  },
];

export default function Services() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    budget: '',
    timeline: '',
  });
  const [sending, setSending] = useState(false);

  // 🔁 Replace with your Formspree endpoint
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/your-form-id';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    setSending(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || 'Not provided',
        service: selectedService ? services.find(s => s.id === selectedService)?.title : 'General Inquiry',
        budget: formData.budget || 'Not specified',
        timeline: formData.timeline || 'Not specified',
        message: formData.message,
        _subject: `New Service Order from ${formData.name}`,
        _replyto: formData.email,
      };

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success('Order request sent! I\'ll get back to you shortly.');
        setFormData({ name: '', email: '', phone: '', message: '', budget: '', timeline: '' });
        setSelectedService(null);
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to send. Please try again.');
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <VantaGlobeBackground />
      <MenuButton />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-10 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-1.5 mb-4">
            <Package className="size-4 text-primary" />
            <span className="text-xs text-muted-foreground font-mono">hire me</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">My Services</h1>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            Choose a service package or request a custom quote. I'll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service.id)}
              className={`glass-card rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:scale-[1.02] text-center ${
                selectedService === service.id 
                  ? 'border-primary/60 ring-2 ring-primary/30' 
                  : 'hover:border-primary/30'
              }`}
            >
              <div className="flex justify-center mb-3">
                <div className="text-primary">{service.icon}</div>
              </div>
              <h3 className="font-bold text-foreground text-lg mb-1">{service.title}</h3>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{service.description}</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-bold text-primary">{service.price}</span>
                <span className="text-[10px] text-muted-foreground">{service.priceLabel}</span>
              </div>
              {service.popular && (
                <span className="inline-block mt-2 text-[10px] font-semibold bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                  Popular
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="glass-card rounded-2xl p-6 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-foreground mb-2 text-center">
            {selectedService ? 'Request This Service' : 'Request a Service'}
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-6">
            {selectedService 
              ? `You're ordering: ${services.find(s => s.id === selectedService)?.title}`
              : 'Select a service above or fill in the form for a custom quote.'
            }
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground block mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className="w-full bg-background/50 border border-border/60 rounded-lg px-3 py-2 text-foreground text-sm"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className="w-full bg-background/50 border border-border/60 rounded-lg px-3 py-2 text-foreground text-sm"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground block mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+256 712 345 678"
                  className="w-full bg-background/50 border border-border/60 rounded-lg px-3 py-2 text-foreground text-sm"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-1">Budget (UGX)</label>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  placeholder="e.g., 100,000 - 500,000"
                  className="w-full bg-background/50 border border-border/60 rounded-lg px-3 py-2 text-foreground text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground block mb-1">Timeline</label>
              <select
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                className="w-full bg-background/50 border border-border/60 rounded-lg px-3 py-2 text-foreground text-sm"
              >
                <option value="">Select timeline...</option>
                <option value="1 week">1 week</option>
                <option value="2 weeks">2 weeks</option>
                <option value="1 month">1 month</option>
                <option value="2 months">2 months</option>
                <option value="3+ months">3+ months</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-muted-foreground block mb-1">Project Details *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Describe your project, requirements, and any special considerations..."
                rows={4}
                className="w-full bg-background/50 border border-border/60 rounded-lg px-3 py-2 text-foreground text-sm resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full bg-primary text-primary-foreground font-semibold py-2.5 rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              {sending ? (
                <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send className="size-4" />
              )}
              {sending ? 'Sending...' : 'Send Request'}
            </button>
          </form>

          <div className="mt-4 text-center text-xs text-muted-foreground">
            <Coffee className="size-3 inline mr-1 text-primary" />
            I respond to all inquiries within 24 hours.
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}