import React, { useState } from 'react';
import { MOCK_BRANDS } from '../data/mockGiftbitData';
import { Gift, X, Copy, Check, Sparkles, ShieldCheck, ExternalLink, QrCode } from 'lucide-react';

interface ClaimPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  claimData: {
    claimUrl?: string;
    brandCode?: string;
    brandName?: string;
    priceInCents?: number;
    cardCode?: string;
    pin?: string;
    subject?: string;
    message?: string;
  } | null;
}

export const ClaimPreviewModal: React.FC<ClaimPreviewModalProps> = ({
  isOpen,
  onClose,
  claimData
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const brand = MOCK_BRANDS.find((b) => b.brand_code === (claimData?.brandCode || 'amazonus')) || MOCK_BRANDS[0];
  const priceFormatted = claimData?.priceInCents
    ? `$${(claimData.priceInCents / 100).toFixed(2)} USD`
    : '$25.00 USD';
  const code = claimData?.cardCode || 'GFT-8819-2041-9920';
  const pin = claimData?.pin || '4920';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Top Bar */}
        <div className="px-4 py-3 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Gift className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold text-slate-200">
              Giftbit Recipient Reward Preview
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Claim Experience Body */}
        <div className="p-6 space-y-6 text-center">
          {/* Brand Banner */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 h-40 flex items-center justify-center group shadow-inner">
            <img
              src={brand.image_url}
              alt={brand.name}
              className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity"
            />
            <div className="relative z-10 space-y-1 p-4 bg-slate-950/60 backdrop-blur-xs rounded-xl border border-slate-800/80">
              <span className="text-3xs uppercase tracking-widest font-semibold text-purple-300">
                You've Received A Digital Reward!
              </span>
              <h2 className="text-lg font-extrabold text-white tracking-tight">
                {claimData?.brandName || brand.name}
              </h2>
              <p className="text-2xl font-black text-emerald-400 font-mono">
                {priceFormatted}
              </p>
            </div>
          </div>

          {/* Custom Message */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-1 text-left">
            <p className="text-xs font-semibold text-slate-300">
              {claimData?.subject || 'A gift for you from your team!'}
            </p>
            <p className="text-xs text-slate-400 italic">
              "{claimData?.message || 'Thank you for your fantastic contributions. Enjoy your gift card!'}"
            </p>
          </div>

          {/* Reveal Card Code / Code Section */}
          <div className="space-y-3">
            {!isRevealed ? (
              <button
                onClick={() => setIsRevealed(true)}
                className="w-full py-3.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-purple-950/50 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                <span>Click to Reveal Gift Card Code</span>
              </button>
            ) : (
              <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/40 space-y-3 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between text-2xs text-slate-400 font-mono uppercase">
                  <span>Gift Card Claim Code</span>
                  <span className="text-emerald-400 font-bold">STATUS: ACTIVE</span>
                </div>

                <div className="flex items-center justify-between bg-slate-900 px-4 py-3 rounded-lg border border-slate-800">
                  <span className="font-mono text-base font-extrabold text-white tracking-wider">
                    {code}
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="p-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md transition-colors"
                    title="Copy code"
                  >
                    {copiedCode ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {pin && (
                  <div className="flex items-center justify-between text-xs font-mono text-slate-300 px-2">
                    <span className="text-slate-400">Card PIN:</span>
                    <span className="font-bold text-amber-300">{pin}</span>
                  </div>
                )}

                {/* Barcode Mock */}
                <div className="pt-2 border-t border-slate-800/80 flex flex-col items-center space-y-1">
                  <QrCode className="w-12 h-12 text-slate-300" />
                  <span className="text-3xs font-mono text-slate-500">
                    Scan in-store or paste code online at checkout
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Terms & Conditions */}
          <div className="text-left bg-slate-950/40 p-3 rounded-lg border border-slate-800 space-y-1">
            <div className="flex items-center space-x-1 text-3xs font-semibold text-slate-400 uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
              <span>Card Terms & Redemption</span>
            </div>
            <p className="text-3xs text-slate-500 leading-relaxed">
              {brand.terms || 'Treat this card like cash. Redeemable online or in participating stores. No expiration fees.'}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-2xs text-slate-400">
          <span>Giftbit Delivery Network Demo</span>
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-1.5 rounded-lg transition-colors font-medium"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
