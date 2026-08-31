import React, { useState } from 'react';
import { ApiProvider, EnvironmentMode } from '../types';
import { Key, Zap, Activity, History, BookOpen, Eye, Globe, Shield } from 'lucide-react';

interface HeaderProps {
  activeProvider: ApiProvider;
  setActiveProvider: (provider: ApiProvider) => void;
  environment: EnvironmentMode;
  setEnvironment: (env: EnvironmentMode) => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  onPing: () => void;
  pingStatus: { status: 'idle' | 'loading' | 'success' | 'error'; latency?: number; message?: string };
  simulateRateLimit: boolean;
  setSimulateRateLimit: (val: boolean) => void;
  logsCount: number;
  onOpenLogs: () => void;
  onOpenDocs: () => void;
  onOpenClaimPreview: () => void;
  activeTab?: 'api-explorer' | 'rc3-hardening';
  setActiveTab?: (tab: 'api-explorer' | 'rc3-hardening') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeProvider,
  setActiveProvider,
  environment,
  setEnvironment,
  apiKey,
  setApiKey,
  onPing,
  pingStatus,
  simulateRateLimit,
  setSimulateRateLimit,
  logsCount,
  onOpenLogs,
  onOpenDocs,
  onOpenClaimPreview,
  activeTab,
  setActiveTab
}) => {
  const [showToken, setShowToken] = useState(false);

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-slate-100 sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand, Title & Provider Toggle */}
        <div className="flex items-center space-x-3 min-w-0">
          <div className="bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-500 text-white p-2 rounded-xl shadow-md flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center space-x-2">
              <h1 className="text-base font-bold text-slate-100 tracking-tight truncate">
                {activeProvider === 'zendit' ? 'Zendit REST API Studio' : 'Giftbit REST API Explorer'}
              </h1>
              <span className="bg-indigo-950 text-indigo-300 text-xs font-semibold px-2 py-0.5 rounded-full border border-indigo-800/60 shrink-0">
                v1.0
              </span>
              <span className="bg-emerald-950/80 text-emerald-300 text-xs font-medium px-2.5 py-0.5 rounded-full border border-emerald-800/80 flex items-center space-x-1 shrink-0">
                <span>🇺🇸</span>
                <span>US Items Only</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 truncate hidden sm:block">
              {activeProvider === 'zendit'
                ? 'Mobile Topup, eSIM, Vouchers, MSISDN Lookup & Utility Payments'
                : 'Reward Campaigns, Direct Links, Embedded Cards & Funds'}
            </p>
          </div>

          {/* Provider Switcher Pills */}
          <div className="hidden md:flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 ml-2">
            <button
              onClick={() => setActiveProvider('zendit')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                activeProvider === 'zendit'
                  ? 'bg-gradient-to-r from-emerald-600 to-sky-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Zendit API</span>
            </button>
            <button
              onClick={() => setActiveProvider('giftbit')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                activeProvider === 'giftbit'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Giftbit API</span>
            </button>
          </div>
        </div>

        {/* Console Tab Switcher: Developer Explorer vs RC3 Hardening Console */}
        {activeTab && setActiveTab && (
          <div className="hidden lg:flex items-center bg-slate-950 p-1 rounded-xl border border-slate-850">
            <button
              onClick={() => setActiveTab('rc3-hardening')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                activeTab === 'rc3-hardening'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-indigo-200" />
              <span>RC3 Hardening Console</span>
            </button>
            <button
              onClick={() => setActiveTab('api-explorer')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 cursor-pointer ${
                activeTab === 'api-explorer'
                  ? 'bg-slate-900 text-slate-300 shadow-sm border border-slate-800'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-sky-400" />
              <span>API Explorer</span>
            </button>
          </div>
        )}

        {/* Environment, Token & Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          {/* Mobile Console Switcher */}
          {activeTab && setActiveTab && (
            <button
              onClick={() => setActiveTab(activeTab === 'rc3-hardening' ? 'api-explorer' : 'rc3-hardening')}
              className="lg:hidden p-2 bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer"
            >
              <Shield className="w-4 h-4 text-indigo-400" />
              <span className="hidden xs:inline">
                {activeTab === 'rc3-hardening' ? 'API Explorer' : 'Hardening'}
              </span>
            </button>
          )}

          {/* Environment Switcher */}
          <div className="bg-slate-800 p-1 rounded-lg border border-slate-700/80 flex items-center text-xs font-medium">
            <button
              onClick={() => setEnvironment('testbed')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                environment === 'testbed'
                  ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Testbed
            </button>
            <button
              onClick={() => setEnvironment('production')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                environment === 'production'
                  ? 'bg-amber-600 text-white shadow-xs font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Production
            </button>
            <button
              onClick={() => setEnvironment('simulator')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                environment === 'simulator'
                  ? 'bg-emerald-600 text-white shadow-xs font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Simulator
            </button>
          </div>

          {/* Token Input */}
          <div className="hidden lg:flex items-center bg-slate-800/90 rounded-lg px-2.5 py-1 border border-slate-700 text-xs focus-within:border-indigo-500 transition-colors">
            <Key className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
            <input
              type={showToken ? 'text' : 'password'}
              placeholder={
                environment === 'simulator'
                  ? 'Simulator token active'
                  : `${activeProvider === 'zendit' ? 'Zendit' : 'Giftbit'} ${environment} Bearer Token`
              }
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              disabled={environment === 'simulator'}
              className="bg-transparent text-slate-200 placeholder-slate-500 focus:outline-none w-44 text-xs font-mono"
            />
            {apiKey && (
              <button
                onClick={() => setShowToken(!showToken)}
                className="text-slate-400 hover:text-slate-200 text-2xs uppercase tracking-wider ml-1"
              >
                {showToken ? 'Hide' : 'Show'}
              </button>
            )}
          </div>

          {/* Quick Ping Health Check */}
          <button
            onClick={onPing}
            disabled={pingStatus.status === 'loading'}
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer"
            title={`Send test request to check ${activeProvider === 'zendit' ? 'Zendit /balance' : 'Giftbit /ping'}`}
          >
            <Activity
              className={`w-3.5 h-3.5 ${
                pingStatus.status === 'loading'
                  ? 'animate-spin text-indigo-400'
                  : pingStatus.status === 'success'
                  ? 'text-emerald-400'
                  : pingStatus.status === 'error'
                  ? 'text-red-400'
                  : 'text-slate-400'
              }`}
            />
            <span className="hidden md:inline">Ping Health</span>
            {pingStatus.latency !== undefined && (
              <span className="text-2xs bg-emerald-950 text-emerald-300 font-mono px-1.5 py-0.5 rounded border border-emerald-800">
                {pingStatus.latency}ms
              </span>
            )}
          </button>

          {/* Sim Rate Limit Toggle */}
          <label className="hidden xl:flex items-center space-x-1.5 text-2xs text-slate-400 cursor-pointer select-none bg-slate-800/60 px-2.5 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700">
            <input
              type="checkbox"
              checked={simulateRateLimit}
              onChange={(e) => setSimulateRateLimit(e.target.checked)}
              className="rounded border-slate-700 text-indigo-600 focus:ring-0 bg-slate-900"
            />
            <span>Sim 429</span>
          </label>

          {/* Actions */}
          <div className="flex items-center space-x-1 border-l border-slate-800 pl-2">
            <button
              onClick={onOpenClaimPreview}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors flex items-center space-x-1 text-xs cursor-pointer"
              title="Preview Recipient Gift / eSIM Claim Card"
            >
              <Eye className="w-4 h-4 text-purple-400" />
              <span className="hidden sm:inline text-xs font-medium">Digital Receipt</span>
            </button>

            <button
              onClick={onOpenLogs}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors relative cursor-pointer"
              title="View API Execution Logs"
            >
              <History className="w-4 h-4 text-indigo-400" />
              {logsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-3xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {logsCount > 99 ? '99+' : logsCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenDocs}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="API Reference Guide"
            >
              <BookOpen className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
