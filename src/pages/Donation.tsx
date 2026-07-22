import { useState } from 'react';
import { Heart, Gift, Smartphone, Wallet, Copy, Check } from 'lucide-react';
import MenuButton from '@/components/layout/MenuButton';
import VantaGlobeBackground from '@/components/features/VantaGlobeBackground';
import Footer from '@/components/layout/Footer';
import { toast } from 'sonner';

const countries = [
  { code: 'KE', name: 'Kenya', provider: 'M-PESA', phoneLength: 9, prefix: '254', currency: 'KES' },
  { code: 'UG', name: 'Uganda', provider: 'MTN', phoneLength: 9, prefix: '256', currency: 'UGX' },
  { code: 'TZ', name: 'Tanzania', provider: 'M-PESA', phoneLength: 9, prefix: '255', currency: 'TZS' },
  { code: 'RW', name: 'Rwanda', provider: 'MTN', phoneLength: 9, prefix: '250', currency: 'RWF' },
  { code: 'ZM', name: 'Zambia', provider: 'MTN', phoneLength: 9, prefix: '260', currency: 'ZMW' },
  { code: 'GH', name: 'Ghana', provider: 'MTN', phoneLength: 9, prefix: '233', currency: 'GHS' },
  { code: 'NG', name: 'Nigeria', provider: 'Airtel', phoneLength: 10, prefix: '234', currency: 'NGN' },
  { code: 'CD', name: 'DR Congo', provider: 'M-PESA', phoneLength: 9, prefix: '243', currency: 'CDF' },
];

export default function Donation() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [loadingProvider, setLoadingProvider] = useState(false);
  const [copied, setCopied] = useState(false);

  const walletAddress = import.meta.env.VITE_DONATION_WALLET || '0xYourWalletAddressHere';

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    toast.success('Wallet address copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const formatPhoneForAPI = (rawPhone: string, country: typeof selectedCountry) => {
    let cleaned = rawPhone.replace(/\D/g, '');
    if (cleaned.startsWith('0')) cleaned = cleaned.slice(1);
    if (cleaned.startsWith(country.prefix)) return cleaned;
    return `${country.prefix}${cleaned}`;
  };

  const handleMobileDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || !amount) {
      toast.error('Please enter phone number and amount');
      return;
    }
    const formattedPhone = formatPhoneForAPI(phoneNumber, selectedCountry);
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast.error('Enter a valid amount');
      return;
    }

    setLoadingProvider(true);
    let endpoint = '';
    switch (selectedCountry.provider) {
      case 'M-PESA': endpoint = '/api/donate/mpesa'; break;
      case 'Airtel': endpoint = '/api/donate/airtel'; break;
      case 'MTN': endpoint = '/api/donate/mtn'; break;
      default:
        toast.error('Provider not supported yet');
        setLoadingProvider(false);
        return;
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: formattedPhone,
          amount: numericAmount,
          countryCode: selectedCountry.code,
          currency: selectedCountry.currency,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || 'STK Push sent! Check your phone.');
        setPhoneNumber('');
        setAmount('');
      } else {
        toast.error(data.error || 'Payment initiation failed');
      }
    } catch (err) {
      toast.error('Network error. Please try again.');
    } finally {
      setLoadingProvider(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <VantaGlobeBackground />
      <MenuButton />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-20">
        <div className="text-center mb-10 animate-fade-in-up">
          <Heart className="size-12 text-primary mx-auto mb-3 fill-primary/20" />
          <h1 className="text-3xl font-bold text-foreground">Support My Work</h1>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            Choose your country and donate via mobile money or cryptocurrency.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Smartphone className="size-6 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Mobile Money</h2>
            </div>
            <form onSubmit={handleMobileDonation} className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground block mb-1">Country / Provider</label>
                <select
                  value={selectedCountry.code}
                  onChange={(e) => {
                    const country = countries.find(c => c.code === e.target.value);
                    if (country) setSelectedCountry(country);
                  }}
                  className="w-full bg-background/50 border border-border/60 rounded-lg px-3 py-2 text-foreground"
                >
                  {countries.map(c => (
                    <option key={c.code} value={c.code}>{c.name} – {c.provider}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-1">Phone Number</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-border/60 bg-background/50 text-muted-foreground">
                    +{selectedCountry.prefix}
                  </span>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder={`${selectedCountry.phoneLength} digit number`}
                    className="flex-1 bg-background/50 border border-border/60 rounded-r-lg px-3 py-2 text-foreground"
                    maxLength={selectedCountry.phoneLength}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-1">Amount ({selectedCountry.currency})</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g., 100"
                  className="w-full bg-background/50 border border-border/60 rounded-lg px-3 py-2 text-foreground"
                  step="any"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loadingProvider}
                className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                {loadingProvider ? (
                  <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Gift className="size-4" />
                )}
                {loadingProvider ? 'Sending prompt...' : `Donate with ${selectedCountry.provider}`}
              </button>
            </form>
          </div>

          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Wallet className="size-6 text-primary" />
              <h2 className="text-xl font-bold text-foreground">MiniPay (cUSD)</h2>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-white p-3 rounded-xl inline-block">
                <img 
                  src="https://files.catbox.moe/9irij4.png" 
                  alt="MiniPay QR Code"
                  className="w-40 h-40 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = 'https://placehold.co/160x160/FFD700/000?text=QR+Code';
                  }}
                />
              </div>
              <div className="w-full">
                <div className="flex items-center justify-between gap-2 bg-background/50 p-2 rounded-lg">
                  <code className="text-xs font-mono text-foreground truncate">{walletAddress}</code>
                  <button
                    onClick={copyAddress}
                    className="p-1 hover:bg-primary/20 rounded transition-colors"
                  >
                    {copied ? <Check className="size-4 text-primary" /> : <Copy className="size-4 text-muted-foreground" />}
                  </button>
                </div>
              </div>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>📱 Scan with MiniPay camera or copy address</p>
                <p className="text-primary/80">Send any amount – every contribution helps 🙌</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>🔹 MiniPay works inside the MiniPay browser or any Celo‑compatible wallet.</p>
          <p>🔹 Mobile money payments are in sandbox mode for testing – go‑live requires approved accounts.</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}