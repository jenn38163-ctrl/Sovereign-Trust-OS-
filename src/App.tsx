import React, { useState } from 'react';
import { ApiProvider, EnvironmentMode, RequestExecutionLog } from './types';
import { ALL_ENDPOINTS, getEndpointsByProvider } from './data/allEndpoints';
import { executeApiRequest } from './services/apiService';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { EndpointTester } from './components/EndpointTester';
import { ResponseViewer } from './components/ResponseViewer';
import { ClaimPreviewModal } from './components/ClaimPreviewModal';
import { LogsInspector } from './components/LogsInspector';
import { ApiReferenceGuide } from './components/ApiReferenceGuide';
import { Rc3HardeningConsole } from './components/Rc3HardeningConsole';
import { Activity, Tag, Phone, Radio, Receipt, Mail, Smartphone, ArrowRight, Wallet, Search } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'api-explorer' | 'rc3-hardening'>('rc3-hardening');
  const [activeProvider, setActiveProvider] = useState<ApiProvider>('zendit');
  const [environment, setEnvironment] = useState<EnvironmentMode>('testbed');
  const [apiKey, setApiKey] = useState<string>('');
  const [selectedEndpointId, setSelectedEndpointId] = useState<string>('zendit-balance');
  const [simulateRateLimit, setSimulateRateLimit] = useState<boolean>(false);

  const [pingStatus, setPingStatus] = useState<{
    status: 'idle' | 'loading' | 'success' | 'error';
    latency?: number;
    message?: string;
  }>({ status: 'idle' });

  const [logs, setLogs] = useState<RequestExecutionLog[]>([]);
  const [currentExecutionLog, setCurrentExecutionLog] = useState<RequestExecutionLog | null>(null);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  // Modals
  const [isLogsOpen, setIsLogsOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [isClaimPreviewOpen, setIsClaimPreviewOpen] = useState(false);
  const [activeClaimData, setActiveClaimData] = useState<any>(null);

  const providerEndpoints = getEndpointsByProvider(activeProvider);

  // Current active endpoint
  const activeEndpoint =
    providerEndpoints.find((ep) => ep.id === selectedEndpointId) || providerEndpoints[0] || ALL_ENDPOINTS[0];

  const handleProviderChange = (newProvider: ApiProvider) => {
    setActiveProvider(newProvider);
    if (newProvider === 'zendit') {
      setSelectedEndpointId('zendit-balance');
    } else {
      setSelectedEndpointId('ping');
    }
  };

  // Ping API function
  const handlePing = async () => {
    setPingStatus({ status: 'loading' });
    const startTime = Date.now();
    try {
      const pingEndpoint = activeProvider === 'zendit' ? '/balance' : '/ping';
      const log = await executeApiRequest({
        provider: activeProvider,
        endpoint: pingEndpoint,
        method: 'GET',
        environment,
        token: apiKey,
        simulateRateLimit
      });

      const latency = Date.now() - startTime;
      setLogs((prev) => [log, ...prev]);
      setCurrentExecutionLog(log);

      if (log.status >= 200 && log.status < 300) {
        setPingStatus({
          status: 'success',
          latency,
          message: `Connected to ${activeProvider === 'zendit' ? 'Zendit' : 'Giftbit'} API successfully`
        });
      } else {
        setPingStatus({
          status: 'error',
          latency,
          message: `HTTP ${log.status}: ${log.statusText}`
        });
      }
    } catch (err: any) {
      setPingStatus({
        status: 'error',
        message: err?.message || 'Health check failed'
      });
    }
  };

  // Run Endpoint Request
  const handleExecuteEndpoint = async (options: {
    endpoint: string;
    method: 'GET' | 'POST' | 'DELETE' | 'PUT';
    pathParams: Record<string, string>;
    queryParams: Record<string, any>;
    bodyParams: Record<string, any>;
  }) => {
    setIsExecuting(true);
    try {
      const log = await executeApiRequest({
        provider: activeProvider,
        endpoint: options.endpoint,
        method: options.method,
        environment,
        token: apiKey,
        pathParams: options.pathParams,
        queryParams: options.queryParams,
        bodyParams: options.bodyParams,
        simulateRateLimit
      });

      setLogs((prev) => [log, ...prev]);
      setCurrentExecutionLog(log);

      // Auto-open claim preview if embedded or direct links or esim purchase created successfully
      const resp = log.responseBody;
      if (resp) {
        if (resp.embedded) {
          setActiveClaimData({
            claimUrl: resp.embedded.claim_url,
            brandCode: resp.embedded.brand_code,
            brandName: resp.embedded.brand_name,
            priceInCents: resp.embedded.price_in_cents,
            cardCode: resp.embedded.card_code,
            pin: resp.embedded.pin
          });
        } else if (resp.direct_links && resp.direct_links.length > 0) {
          const dl = resp.direct_links[0];
          setActiveClaimData({
            claimUrl: dl.url,
            brandCode: dl.brand_code,
            priceInCents: dl.price_in_cents,
            cardCode: 'CARD-8819-2091-1102',
            pin: '3910'
          });
        } else if (resp.productType === 'ESIM' && resp.confirmation) {
          setActiveClaimData({
            brandName: resp.brandName || 'Airalo Global eSIM',
            cardCode: resp.confirmation.activationCode,
            pin: resp.confirmation.smdpAddress,
            subject: 'Your Travel eSIM Data Activation',
            message: resp.confirmation.redemptionInstructions
          });
        } else if (resp.productType === 'VOUCHER' && resp.receipt) {
          setActiveClaimData({
            brandName: resp.brandName || 'Digital Voucher',
            cardCode: resp.receipt.epin || resp.receipt.voucherId,
            claimUrl: resp.receipt.redemptionUrl,
            subject: 'Your Zendit Voucher Receipt',
            message: resp.receipt.terms
          });
        }
      }
    } catch (err: any) {
      console.error('Execution error:', err);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleOpenClaimPreviewWithData = (data: any) => {
    setActiveClaimData(data);
    setIsClaimPreviewOpen(true);
  };

  const handleReplayLog = (log: RequestExecutionLog) => {
    if (log.provider && log.provider !== activeProvider) {
      setActiveProvider(log.provider);
    }
    const match = ALL_ENDPOINTS.find(
      (ep) => (ep.provider || 'giftbit') === (log.provider || 'giftbit') &&
        (ep.path === log.endpoint || ep.path.startsWith(log.endpoint.split('?')[0]))
    );
    if (match) {
      setSelectedEndpointId(match.id);
    }
    setCurrentExecutionLog(log);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Header */}
      <Header
        activeProvider={activeProvider}
        setActiveProvider={handleProviderChange}
        environment={environment}
        setEnvironment={setEnvironment}
        apiKey={apiKey}
        setApiKey={setApiKey}
        onPing={handlePing}
        pingStatus={pingStatus}
        simulateRateLimit={simulateRateLimit}
        setSimulateRateLimit={setSimulateRateLimit}
        logsCount={logs.length}
        onOpenLogs={() => setIsLogsOpen(true)}
        onOpenDocs={() => setIsDocsOpen(true)}
        onOpenClaimPreview={() => setIsClaimPreviewOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Workspace Layout or RC3 Hardening Control Plane */}
      {activeTab === 'api-explorer' ? (
        <div className="flex-1 flex overflow-hidden">
          {/* Left Endpoint Sidebar */}
          <Sidebar
            endpoints={providerEndpoints}
            selectedEndpointId={selectedEndpointId}
            onSelectEndpoint={setSelectedEndpointId}
            activeProvider={activeProvider}
          />

          {/* Right Main Testing Area */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar">
            {/* Active Provider Quick Switch Shortcuts */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {activeProvider === 'zendit' ? [
                { id: 'zendit-balance', label: 'Wallet Balance', icon: <Wallet className="w-4 h-4 text-emerald-400" />, desc: 'GET /balance' },
                { id: 'zendit-topup-purchase', label: 'Mobile TopUp', icon: <Phone className="w-4 h-4 text-emerald-400" />, desc: 'POST /topups/purchases' },
                { id: 'zendit-esim-purchase', label: 'eSIM Purchase', icon: <Radio className="w-4 h-4 text-cyan-400" />, desc: 'POST /esim/purchases' },
                { id: 'zendit-phone-lookup', label: 'MSISDN Lookup', icon: <Search className="w-4 h-4 text-purple-400" />, desc: 'GET /tools/phonenumberlookup' }
              ].map((card) => {
                const isSelected = selectedEndpointId === card.id;
                return (
                  <button
                    key={card.id}
                    onClick={() => setSelectedEndpointId(card.id)}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between group cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-950/60 border-emerald-500/60 shadow-md ring-1 ring-emerald-500/30'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="space-y-1 min-w-0 pr-2">
                      <div className="flex items-center space-x-2">
                        {card.icon}
                        <span className="text-xs font-semibold text-slate-200 truncate">
                          {card.label}
                        </span>
                      </div>
                      <p className="text-3xs font-mono text-slate-400 truncate">{card.desc}</p>
                    </div>
                    <ArrowRight
                      className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                        isSelected ? 'text-emerald-400 translate-x-0.5' : 'text-slate-600 group-hover:text-slate-400'
                      }`}
                    />
                  </button>
                );
              }) : [
                { id: 'ping', label: 'Ping API', icon: <Activity className="w-4 h-4 text-emerald-400" />, desc: 'GET /ping' },
                { id: 'list-brands', label: 'Reward Brands', icon: <Tag className="w-4 h-4 text-sky-400" />, desc: 'GET /brands' },
                { id: 'create-email-order', label: 'Email Order', icon: <Mail className="w-4 h-4 text-indigo-400" />, desc: 'POST /campaign' },
                { id: 'create-embedded-reward', label: 'Embedded Reward', icon: <Smartphone className="w-4 h-4 text-pink-400" />, desc: 'POST /embedded' }
              ].map((card) => {
                const isSelected = selectedEndpointId === card.id;
                return (
                  <button
                    key={card.id}
                    onClick={() => setSelectedEndpointId(card.id)}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between group cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-950/60 border-indigo-500/60 shadow-md ring-1 ring-indigo-500/30'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="space-y-1 min-w-0 pr-2">
                      <div className="flex items-center space-x-2">
                        {card.icon}
                        <span className="text-xs font-semibold text-slate-200 truncate">
                          {card.label}
                        </span>
                      </div>
                      <p className="text-3xs font-mono text-slate-400 truncate">{card.desc}</p>
                    </div>
                    <ArrowRight
                      className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                        isSelected ? 'text-indigo-400 translate-x-0.5' : 'text-slate-600 group-hover:text-slate-400'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Interactive Request Tester */}
            <EndpointTester
              endpoint={activeEndpoint}
              environment={environment}
              apiKey={apiKey}
              onExecute={handleExecuteEndpoint}
              isExecuting={isExecuting}
            />

            {/* Response Viewer */}
            <ResponseViewer
              log={currentExecutionLog}
              onPreviewClaim={handleOpenClaimPreviewWithData}
            />
          </main>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-950">
          <Rc3HardeningConsole />
        </div>
      )}

      {/* Modals & Drawers */}
      <ClaimPreviewModal
        isOpen={isClaimPreviewOpen}
        onClose={() => setIsClaimPreviewOpen(false)}
        claimData={activeClaimData}
      />

      <LogsInspector
        isOpen={isLogsOpen}
        onClose={() => setIsLogsOpen(false)}
        logs={logs}
        onClearLogs={() => {
          setLogs([]);
          setCurrentExecutionLog(null);
        }}
        onReplayLog={handleReplayLog}
      />

      <ApiReferenceGuide
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
        activeProvider={activeProvider}
      />
    </div>
  );
}
