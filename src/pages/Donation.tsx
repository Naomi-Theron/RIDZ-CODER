import { useState, useEffect } from 'react';
import { Heart, Coffee, Gift, Smartphone, Wallet, Loader2 } from 'lucide-react';
import MenuButton from '@/components/layout/MenuButton';
import Scene3D from '@/components/features/Scene3D';
import Footer from '@/components/layout/Footer';
import { useAccount, useSendTransaction, useConnect } from 'wagmi';
import { parseEther } from 'viem';
import { toast } from 'sonner';

export default function Donation() {
  // M-Pesa state
  const [mpesaPhone, setMpesaPhone] = useState('');
  const [mpesaAmount, setMpesaAmount] = useState('');
  const [loadingMpesa, setLoadingMpesa] = useState(false);

  // MiniPay state
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { sendTransaction, isPending: isSendingTx } = useSendTransaction();
  const [cryptoAmount, setCryptoAmount] = useState('');

  // Auto-connect to MiniPay wallet if available
  useEffect(() => {
    if (!isConnected && typeof window !== 'undefined' && (window as any).ethereum) {
      connect({ connector: (window as any).ethereum });
    }
  }, [connect, isConnected]);

  // M-Pesa handler
  const handleMpesaDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mpesaPhone || !mpesaAmount) {
      toast.error('Please enter phone number and amount');
      return;
    }
    setLoadingMpesa(true);
    try {
      const res = await fetch('/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: mpesaPhone, amount: mpesaAmount }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || 'STK Push sent! Check your phone.');
      } else {
        toast.error(data.error || 'Failed to send STK Push');
      }
    } catch (err) {
      toast.error('Network error. Please try again.');
    } finally {
      setLoadingMpesa(false);
    }
  };

  // MiniPay send handler
  const handleCryptoDonation = async () => {
    if (!isConnected) {
      toast.error('Please connect your MiniPay wallet first');
      return;
    }
    if (!cryptoAmount || parseFloat(cryptoAmount) <= 0) {
      toast.error('Enter a valid amount in cUSD');
      return;
    }
    sendTransaction(
      {
        to: process.env.NEXT_PUBLIC_DONATION_WALLET || '0xYourWalletHere',
        value: parseEther(cryptoAmount),
      },
      {
        onSuccess: () => toast.success(`Donation of ${cryptoAmount} cUSD sent! Thank you 🙌`),
        onError: (error) => toast.error(`Transaction failed: ${error.message}`),
      }
    );
  };

  return (
    <div className="relative min-h-screen">
      <Scene3D />
      <MenuButton />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-10 animate-fade-in-up">
          <Heart className="size-12 text-primary mx-auto mb-3 fill-primary/20" />
          <h1 className="text-3xl font-bold text-foreground">Support My Work</h1>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            Your donations help me keep building, buy coffee, and support open source. 🇰🇪
          </p>
        </div>

        {/* Two columns: M-Pesa and MiniPay */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* M-Pesa card */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Smartphone className="size-6 text-primary" />
              <h2 className="text-xl font-bold text-foreground">M-Pesa Donation</h2>
            </div>
            <form onSubmit={handleMpesaDonation} className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground block mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={mpesaPhone}
                  onChange={(e) => setMpesaPhone(e.target.value)}
                  placeholder="0712345678 or 254712345678"
                  className="w-full bg-background/50 border border-border/60 rounded-lg px-3 py-2 text-foreground"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-1">Amount (KES)</label>
                <input
                  type="number"
                  value={mpesaAmount}
                  onChange={(e) => setMpesaAmount(e.target.value)}
                  placeholder="e.g., 100"
                  className="w-full bg-background/50 border border-border/60 rounded-lg px-3 py-2 text-foreground"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loadingMpesa}
                className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                {loadingMpesa ? <Loader2 className="size-4 animate-spin" /> : <Gift className="size-4" />}
                {loadingMpesa ? 'Sending prompt...' : 'Donate with M-Pesa'}
              </button>
            </form>
          </div>

          {/* MiniPay card */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Wallet className="size-6 text-primary" />
              <h2 className="text-xl font-bold text-foreground">MiniPay (cUSD)</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground block mb-1">Wallet Status</label>
                <div className="text-sm font-mono bg-background/50 p-2 rounded-lg break-all">
                  {isConnected ? address : '⚠️ Not connected – open MiniPay browser'}
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-1">Amount (cUSD)</label>
                <input
                  type="number"
                  value={cryptoAmount}
                  onChange={(e) => setCryptoAmount(e.target.value)}
                  placeholder="e.g., 5"
                  className="w-full bg-background/50 border border-border/60 rounded-lg px-3 py-2 text-foreground"
                  step="any"
                />
              </div>
              <button
                onClick={handleCryptoDonation}
                disabled={!isConnected || isSendingTx}
                className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                {isSendingTx ? <Loader2 className="size-4 animate-spin" /> : <Coffee className="size-4" />}
                {isSendingTx ? 'Confirming...' : `Donate ${cryptoAmount || '0'} cUSD`}
              </button>
            </div>
          </div>
        </div>

        {/* MiniPay connection helper */}
        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>🔹 MiniPay works inside the MiniPay browser or any wallet that supports Celo (e.g., Valora).</p>
          <p>🔹 M-Pesa STK Push is in sandbox mode – use test numbers: 254708374149 (any amount).</p>
        </div>

        <div className="mt-10 text-center text-xs text-muted-foreground">
          <p>🙏 Even if you can't donate, sharing my work or leaving a star on GitHub means a lot.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}