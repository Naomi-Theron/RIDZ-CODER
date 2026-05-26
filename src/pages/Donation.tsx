import { useState, useEffect } from 'react';
import { Heart, Coffee, Gift, Smartphone, Wallet, Loader2, Globe } from 'lucide-react';
import MenuButton from '@/components/layout/MenuButton';
import Scene3D from '@/components/features/Scene3D';
import Footer from '@/components/layout/Footer';
import { useAccount, useSendTransaction, useConnect } from 'wagmi';
import { parseEther } from 'viem';
import { toast } from 'sonner';

// Country configuration
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
  // M-Pesa / Airtel / MTN state
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [loadingProvider, setLoadingProvider] = useState(false);

  // MiniPay state
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { sendTransaction, isPending: isSendingTx } = useSendTransaction();
  const [cryptoAmount, setCryptoAmount] = useState('');

  // Auto‑connect to MiniPay if available
  useEffect(() => {
    if (!isConnected && typeof window !== 'undefined' && (window as any).ethereum) {
      connect({ connector: (window as any).ethereum });
    }
  }, [connect, isConnected]);

  // Format phone number to international (remove leading 0 or +)
  const formatPhoneForAPI = (rawPhone: string, country: typeof selectedCountry) => {
    let cleaned = rawPhone.replace(/\D/g, '');
    if (cleaned.startsWith('0')) cleaned = cleaned.slice(1);
    if (cleaned.startsWith(country.prefix)) return cleaned;
    return `${country.prefix}${cleaned}`;
  };

  // Handle mobile money donation
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
      case 'M-PESA':
        endpoint = '/api/donate/mpesa';
        break;
      case 'Airtel':
        endpoint = '/api/donate/airtel';
        break;
      case 'MTN':
        endpoint = '/api/donate/mtn';
        break;
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

 {/* MiniPay QR Code Column – using your static QR code image */}
<div className="glass-card rounded-2xl p-6 text-center">
  <div className="flex items-center justify-center gap-2 mb-4">
    <Wallet className="size-6 text-primary" />
    <h2 className="text-xl font-bold text-foreground">MiniPay (cUSD)</h2>
  </div>

  <div className="flex flex-col items-center space-y-4">
    {/* Your static QR code image */}
    <div className="bg-white p-3 rounded-xl inline-block">
      <img 
        src="https://files.catbox.moe/9irij4.png" 
        alt="MiniPay QR Code"
        className="w-40 h-40 object-contain"
      />
    </div>

    {/* Wallet Address with Copy Button */}
    <div className="w-full">
      <div className="flex items-center justify-between gap-2 bg-background/50 p-2 rounded-lg">
        <code className="text-xs font-mono text-foreground truncate">{walletAddress}</code>
        <button
          onClick={copyAddress}
          className="p-1 hover:bg-primary/20 rounded transition-colors"
          aria-label="Copy address"
        >
          {copied ? <Check className="size-4 text-primary" /> : <Copy className="size-4 text-muted-foreground" />}
        </button>
      </div>
    </div>

    {/* MiniPay environment hint */}
    <div className="text-xs text-muted-foreground space-y-1">
      <p>📱 Scan with MiniPay camera or copy address</p>
      <p className="text-primary/80">Send any amount – every contribution helps 🙌</p>
      {!isConnected && (
        <p className="text-yellow-500/80">⚠️ Open this page inside MiniPay browser for best experience</p>
      )}
    </div>
  </div>
</div>
      <Footer />
    </div>
  );
}