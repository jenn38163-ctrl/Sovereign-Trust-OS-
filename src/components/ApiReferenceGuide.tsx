import React, { useState } from 'react';
import { X, BookOpen, Key, AlertCircle, ShieldCheck, Mail, Zap, Smartphone, Link, Globe, Phone, Radio, Receipt, Search } from 'lucide-react';
import { ApiProvider } from '../types';

interface ApiReferenceGuideProps {
  isOpen: boolean;
  onClose: () => void;
  activeProvider: ApiProvider;
}

export const ApiReferenceGuide: React.FC<ApiReferenceGuideProps> = ({ isOpen, onClose, activeProvider: initialProvider }) => {
  const [guideProvider, setGuideProvider] = useState<ApiProvider>(initialProvider);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <div>
              <h2 className="text-base font-bold text-slate-100">
                API Reference & Technical Integration Manual
              </h2>
              <p className="text-2xs text-slate-400">Official REST specifications, headers, payloads & error reference</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Provider Switcher Bar */}
        <div className="bg-slate-950/70 px-6 py-2 border-b border-slate-800 flex items-center space-x-2">
          <button
            onClick={() => setGuideProvider('zendit')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 cursor-pointer ${
              guideProvider === 'zendit'
                ? 'bg-gradient-to-r from-emerald-600 to-sky-600 text-white shadow-xs'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Zendit REST API Guide</span>
          </button>

          <button
            onClick={() => setGuideProvider('giftbit')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 cursor-pointer ${
              guideProvider === 'giftbit'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xs'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Giftbit REST API Guide</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-slate-300 custom-scrollbar">
          {guideProvider === 'zendit' ? (
            /* ZENDIT GUIDE */
            <>
              {/* Environments */}
              <section className="space-y-2 bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Zendit Base URL & Authentication</span>
                </h3>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1 font-mono text-2xs">
                  <span className="text-emerald-400 font-bold uppercase block">Production Root Endpoint</span>
                  <code className="text-slate-200 font-semibold">https://api.zendit.io/v1</code>
                  <p className="text-3xs text-slate-400 font-sans pt-1">
                    Send your Zendit API key in the standard HTTP <code className="text-emerald-300 font-mono">Authorization: Bearer YOUR_ZENDIT_API_KEY</code> header.
                  </p>
                </div>
              </section>

              {/* Product Suite */}
              <section className="space-y-2 bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                <h3 className="text-sm font-bold text-white">Zendit Global Product Suite</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-2xs">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                    <div className="flex items-center space-x-1.5 font-bold text-emerald-300">
                      <Phone className="w-4 h-4 text-emerald-400" />
                      <span>1. Mobile TopUp & Airtime</span>
                    </div>
                    <p className="text-slate-400">
                      Instant mobile airtime recharge across 160+ countries and 500+ carriers via <code className="text-slate-200 font-mono">POST /topups/purchases</code>.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                    <div className="flex items-center space-x-1.5 font-bold text-cyan-300">
                      <Radio className="w-4 h-4 text-cyan-400" />
                      <span>2. eSIM Global Data</span>
                    </div>
                    <p className="text-slate-400">
                      Instant travel data plan provision with QR codes, SM-DP+ activation codes via <code className="text-slate-200 font-mono">POST /esim/purchases</code>.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                    <div className="flex items-center space-x-1.5 font-bold text-amber-300">
                      <Receipt className="w-4 h-4 text-amber-400" />
                      <span>3. Gift Cards & ePIN Vouchers</span>
                    </div>
                    <p className="text-slate-400">
                      Digital gift cards for Amazon, Google Play, Apple, Netflix, Spotify & Gaming via <code className="text-slate-200 font-mono">POST /vouchers/purchases</code>.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                    <div className="flex items-center space-x-1.5 font-bold text-purple-300">
                      <Search className="w-4 h-4 text-purple-400" />
                      <span>4. MSISDN Carrier Lookup</span>
                    </div>
                    <p className="text-slate-400">
                      Automatically identify mobile operator (MCC/MNC) by phone number via <code className="text-slate-200 font-mono">GET /tools/phonenumberlookup/&#123;msisdn&#125;</code>.
                    </p>
                  </div>
                </div>
              </section>

              {/* Zendit Error Codes */}
              <section className="space-y-2 bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span>Zendit Error Handling & Idempotency</span>
                </h3>
                <div className="space-y-1.5 text-2xs">
                  <div className="flex space-x-2">
                    <span className="font-mono text-emerald-400 font-bold">200 DONE:</span>
                    <span>Purchase processed successfully. Confirmation or receipt returned.</span>
                  </div>
                  <div className="flex space-x-2">
                    <span className="font-mono text-amber-400 font-bold">400 INVALID_PARAMETER:</span>
                    <span>Invalid offerId, missing recipient phone number or bad format.</span>
                  </div>
                  <div className="flex space-x-2">
                    <span className="font-mono text-amber-400 font-bold">401 UNAUTHORIZED:</span>
                    <span>Invalid or missing Zendit Bearer API key.</span>
                  </div>
                  <div className="flex space-x-2">
                    <span className="font-mono text-amber-400 font-bold">402 INSUFFICIENT_FUNDS:</span>
                    <span>Your Zendit wallet account balance is too low for this purchase.</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-800 text-3xs text-slate-400">
                  <span className="font-bold text-slate-300 uppercase">Idempotent Purchase Key (transactionId):</span>
                  <p className="pt-0.5">
                    Pass your client-side <code className="font-mono text-slate-200">transactionId</code> when placing topup, eSIM, or voucher orders. If a network disruption occurs, repeating the call with the same ID guarantees single execution.
                  </p>
                </div>
              </section>
            </>
          ) : (
            /* GIFTBIT GUIDE */
            <>
              {/* Environments */}
              <section className="space-y-2 bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Giftbit Environments & URLs</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-2xs font-mono">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                    <span className="text-indigo-400 font-bold uppercase block">Testbed Root URL</span>
                    <code className="text-slate-200 font-semibold">https://api-testbed.giftbit.com/papi/v1</code>
                    <p className="text-3xs text-slate-400 font-sans pt-1">
                      Includes virtual test balance and test credit cards for USD/CAD card charge simulations.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                    <span className="text-amber-400 font-bold uppercase block">Production Root URL</span>
                    <code className="text-slate-200 font-semibold">https://api.giftbit.com/papi/v1</code>
                    <p className="text-3xs text-slate-400 font-sans pt-1">
                      Live fulfillment environment. API keys generated after account verification at giftbit.com.
                    </p>
                  </div>
                </div>
              </section>

              {/* Authentication */}
              <section className="space-y-2 bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Key className="w-4 h-4 text-sky-400" />
                  <span>Giftbit Authentication</span>
                </h3>
                <p className="text-slate-400">
                  Pass your API token prefixed by <code className="text-indigo-300 font-mono">Bearer </code> in the HTTP <code className="text-indigo-300 font-mono">Authorization</code> header:
                </p>
                <pre className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-2xs text-slate-200">
                  Authorization: Bearer YOUR_GIFTBIT_API_TOKEN
                </pre>
              </section>

              {/* Delivery Options */}
              <section className="space-y-2 bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                <h3 className="text-sm font-bold text-white">Giftbit Reward Delivery Modes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-2xs">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                    <div className="flex items-center space-x-1.5 font-bold text-indigo-300">
                      <Mail className="w-4 h-4 text-indigo-400" />
                      <span>1. Email Delivery</span>
                    </div>
                    <p className="text-slate-400">
                      Delivers customized HTML emails directly to recipients via <code className="text-slate-200 font-mono">POST /campaign</code>.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                    <div className="flex items-center space-x-1.5 font-bold text-purple-300">
                      <Link className="w-4 h-4 text-purple-400" />
                      <span>2. Shortlinks</span>
                    </div>
                    <p className="text-slate-400">
                      Generates landing pages for SMS or chat distribution via <code className="text-slate-200 font-mono">POST /campaign</code> with <code className="text-slate-200 font-mono">delivery_type: SHORTLINK</code>.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                    <div className="flex items-center space-x-1.5 font-bold text-amber-300">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span>3. Direct Links</span>
                    </div>
                    <p className="text-slate-400">
                      Clean reward claim URLs generated immediately via <code className="text-slate-200 font-mono">POST /direct_links</code>.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                    <div className="flex items-center space-x-1.5 font-bold text-pink-300">
                      <Smartphone className="w-4 h-4 text-pink-400" />
                      <span>4. Embedded Rewards</span>
                    </div>
                    <p className="text-slate-400">
                      In-app claim details for immediate reveal via <code className="text-slate-200 font-mono">POST /embedded</code>.
                    </p>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-5 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
