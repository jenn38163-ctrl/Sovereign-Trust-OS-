import React, { useState } from 'react';
import { EndpointDefinition, EndpointCategory, ApiProvider } from '../types';
import {
  Activity,
  Tag,
  Mail,
  Link,
  Zap,
  Smartphone,
  Wallet,
  Gift,
  Search,
  ChevronRight,
  Sparkles,
  Phone,
  FileSpreadsheet,
  Percent,
  Receipt,
  Globe,
  Radio,
  Sliders
} from 'lucide-react';

interface SidebarProps {
  endpoints: EndpointDefinition[];
  selectedEndpointId: string;
  onSelectEndpoint: (endpointId: string) => void;
  activeProvider: ApiProvider;
}

const CATEGORY_META: Record<EndpointCategory, { label: string; icon: React.ReactNode }> = {
  account: { label: 'Account & Wallet', icon: <Wallet className="w-4 h-4 text-emerald-400" /> },
  brands: { label: 'Brands & Redemption', icon: <Tag className="w-4 h-4 text-sky-400" /> },
  topups: { label: 'Mobile Top Up & Bundles', icon: <Phone className="w-4 h-4 text-emerald-400" /> },
  esim: { label: 'Digital Travel eSIM', icon: <Radio className="w-4 h-4 text-cyan-400" /> },
  vouchers: { label: 'Gift Cards & Utilities', icon: <Receipt className="w-4 h-4 text-amber-400" /> },
  tools: { label: 'MSISDN Phone Lookup', icon: <Search className="w-4 h-4 text-purple-400" /> },
  transactions: { label: 'Transaction Logs', icon: <Activity className="w-4 h-4 text-indigo-400" /> },
  promos: { label: 'Carrier Promotions', icon: <Percent className="w-4 h-4 text-pink-400" /> },
  reports: { label: 'CSV Reports', icon: <FileSpreadsheet className="w-4 h-4 text-teal-400" /> },
  system: { label: 'System & Ping Health', icon: <Activity className="w-4 h-4 text-emerald-400" /> },
  email_orders: { label: 'Email Campaigns', icon: <Mail className="w-4 h-4 text-indigo-400" /> },
  shortlinks: { label: 'Shortlinks', icon: <Link className="w-4 h-4 text-purple-400" /> },
  direct_links: { label: 'Direct Links', icon: <Zap className="w-4 h-4 text-amber-400" /> },
  embedded: { label: 'Embedded Rewards', icon: <Smartphone className="w-4 h-4 text-pink-400" /> },
  funds: { label: 'Funds & Balances', icon: <Wallet className="w-4 h-4 text-teal-400" /> },
  rewards: { label: 'Rewards Management', icon: <Gift className="w-4 h-4 text-rose-400" /> }
};

export const Sidebar: React.FC<SidebarProps> = ({
  endpoints,
  selectedEndpointId,
  onSelectEndpoint,
  activeProvider
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEndpoints = endpoints.filter((ep) =>
    ep.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ep.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ep.method.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const zenditCategories: EndpointCategory[] = [
    'account',
    'brands',
    'topups',
    'esim',
    'vouchers',
    'tools',
    'transactions',
    'promos',
    'reports'
  ];

  const giftbitCategories: EndpointCategory[] = [
    'system',
    'brands',
    'email_orders',
    'shortlinks',
    'direct_links',
    'embedded',
    'funds',
    'rewards'
  ];

  const categoriesToRender = activeProvider === 'zendit' ? zenditCategories : giftbitCategories;

  return (
    <aside className="w-80 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 h-[calc(100vh-4rem)]">
      {/* Search Input */}
      <div className="p-3 border-b border-slate-800">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            placeholder={`Search ${activeProvider === 'zendit' ? 'Zendit' : 'Giftbit'} endpoints...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-800 text-slate-200 text-xs rounded-lg border border-slate-700/80 focus:outline-none focus:border-indigo-500 placeholder-slate-500 font-sans"
          />
        </div>
      </div>

      {/* Endpoints List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4 custom-scrollbar">
        {categoriesToRender.map((cat) => {
          const catEndpoints = filteredEndpoints.filter((ep) => ep.category === cat && ep.provider === activeProvider);
          if (catEndpoints.length === 0) return null;

          const meta = CATEGORY_META[cat] || { label: cat, icon: <Activity className="w-4 h-4" /> };

          return (
            <div key={cat} className="space-y-1">
              <div className="flex items-center space-x-2 px-2 py-1 text-2xs font-bold text-slate-400 uppercase tracking-wider">
                {meta.icon}
                <span>{meta.label}</span>
              </div>

              <div className="space-y-0.5">
                {catEndpoints.map((ep) => {
                  const isSelected = ep.id === selectedEndpointId;
                  const isPost = ep.method === 'POST';

                  return (
                    <button
                      key={ep.id}
                      onClick={() => onSelectEndpoint(ep.id)}
                      className={`w-full text-left px-2.5 py-2 rounded-lg text-xs transition-all flex items-center justify-between group cursor-pointer ${
                        isSelected
                          ? activeProvider === 'zendit'
                            ? 'bg-emerald-950/70 text-emerald-200 border border-emerald-500/50 font-medium shadow-xs'
                            : 'bg-indigo-950/70 text-indigo-200 border border-indigo-500/50 font-medium shadow-xs'
                          : 'text-slate-300 hover:bg-slate-800/80 hover:text-slate-100 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center space-x-2 min-w-0 pr-2">
                        {/* Method Badge */}
                        <span
                          className={`text-3xs font-mono font-bold px-1.5 py-0.5 rounded uppercase shrink-0 ${
                            isPost
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                              : 'bg-sky-950 text-sky-400 border border-sky-800/60'
                          }`}
                        >
                          {ep.method}
                        </span>

                        <span className="truncate text-xs">{ep.name}</span>
                      </div>

                      <ChevronRight
                        className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                          isSelected ? (activeProvider === 'zendit' ? 'text-emerald-400' : 'text-indigo-400') + ' translate-x-0.5' : 'text-slate-600 group-hover:text-slate-400'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Provider Legend Footer */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/60 text-3xs text-slate-400 space-y-1.5">
        <div className="flex items-center justify-between font-semibold text-slate-300">
          <span>{activeProvider === 'zendit' ? 'Zendit Products' : 'Giftbit Modes'}</span>
          <Sparkles className="w-3 h-3 text-amber-400" />
        </div>
        {activeProvider === 'zendit' ? (
          <div className="grid grid-cols-2 gap-1 text-slate-400">
            <div className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Mobile TopUp</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span>eSIM Global</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              <span>Gift Cards</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
              <span>MSISDN Lookup</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-1 text-slate-400">
            <div className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
              <span>Email Order</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
              <span>Shortlink</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              <span>Direct Link</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span>
              <span>Embedded</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
