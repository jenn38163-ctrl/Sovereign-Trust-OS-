import React, { useState } from 'react';
import { RequestExecutionLog } from '../types';
import {
  CheckCircle2,
  AlertTriangle,
  Clock,
  Copy,
  Check,
  Search,
  ExternalLink,
  Gift,
  Eye,
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ResponseViewerProps {
  log: RequestExecutionLog | null;
  onPreviewClaim: (claimData: {
    claimUrl?: string;
    brandCode?: string;
    brandName?: string;
    priceInCents?: number;
    cardCode?: string;
    pin?: string;
  }) => void;
}

export const ResponseViewer: React.FC<ResponseViewerProps> = ({ log, onPreviewClaim }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedResponse, setCopiedResponse] = useState(false);
  const [showHeaders, setShowHeaders] = useState(false);

  if (!log) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center text-slate-500 space-y-3">
        <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
          <Clock className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-slate-300">No Request Executed Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Select an endpoint from the left menu, configure your parameters, and click "Execute Request".
          </p>
        </div>
      </div>
    );
  }

  const isSuccess = log.status >= 200 && log.status < 300;
  const isClientError = log.status >= 400 && log.status < 500;
  const isServerError = log.status >= 500;

  // Check if response contains clickable claim links / cards
  let claimDataToPreview: any = null;
  const body = log.responseBody;
  if (body) {
    if (body.embedded) {
      claimDataToPreview = {
        claimUrl: body.embedded.claim_url,
        brandCode: body.embedded.brand_code,
        brandName: body.embedded.brand_name,
        priceInCents: body.embedded.price_in_cents,
        cardCode: body.embedded.card_code,
        pin: body.embedded.pin
      };
    } else if (body.direct_links && body.direct_links.length > 0) {
      const dl = body.direct_links[0];
      claimDataToPreview = {
        claimUrl: dl.url,
        brandCode: dl.brand_code,
        priceInCents: dl.price_in_cents,
        cardCode: 'CARD-8819-2091-1102',
        pin: '3910'
      };
    } else if (body.links && body.links.length > 0) {
      const lnk = body.links[0];
      claimDataToPreview = {
        claimUrl: lnk.url,
        priceInCents: lnk.price_in_cents,
        cardCode: 'CARD-4019-8812-9920',
        pin: '1820'
      };
    } else if (body.gift) {
      claimDataToPreview = {
        claimUrl: body.gift.claim_url,
        brandCode: body.gift.brand_code,
        brandName: body.gift.brand_name,
        priceInCents: body.gift.price_in_cents,
        cardCode: body.gift.card_code,
        pin: body.gift.pin
      };
    }
  }

  const handleCopyResponse = () => {
    navigator.clipboard.writeText(JSON.stringify(log.responseBody, null, 2));
    setCopiedResponse(true);
    setTimeout(() => setCopiedResponse(false), 2000);
  };

  const jsonStr = JSON.stringify(log.responseBody, null, 2);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-md space-y-0">
      {/* Response Header Status Bar */}
      <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          {/* Status Badge */}
          <div
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-full font-mono text-xs font-bold border ${
              isSuccess
                ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                : isClientError
                ? 'bg-amber-950 text-amber-300 border-amber-800'
                : 'bg-rose-950 text-rose-300 border-rose-800'
            }`}
          >
            {isSuccess ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            )}
            <span>
              {log.status} {log.statusText}
            </span>
          </div>

          {/* Latency */}
          <div className="flex items-center space-x-1 text-xs text-slate-400 font-mono">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>{log.durationMs} ms</span>
          </div>

          <span className="text-2xs text-slate-500 uppercase font-mono px-2 py-0.5 rounded bg-slate-800">
            {log.environment}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          {claimDataToPreview && (
            <button
              onClick={() => onPreviewClaim(claimDataToPreview)}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-2xs px-3 py-1.5 rounded-lg shadow-xs transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Claim Experience</span>
            </button>
          )}

          <button
            onClick={handleCopyResponse}
            className="flex items-center space-x-1 text-2xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
          >
            {copiedResponse ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy JSON</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Execution URL */}
      <div className="px-4 py-2 bg-slate-950/40 border-b border-slate-800 text-3xs font-mono text-slate-400 flex items-center space-x-2 overflow-x-auto">
        <span className="text-slate-500 font-semibold uppercase shrink-0">Request URL:</span>
        <span className="text-indigo-300 truncate">{log.fullUrl}</span>
      </div>

      {/* Recipient Claim Promo Banner if available */}
      {claimDataToPreview && (
        <div className="m-4 p-3 bg-gradient-to-r from-purple-950/50 to-indigo-950/50 border border-purple-800/60 rounded-lg flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <Gift className="w-4 h-4 text-purple-400 shrink-0" />
            <div>
              <p className="font-semibold text-purple-200">
                Reward Generated! Claim link is active.
              </p>
              <p className="text-2xs text-purple-300/80">
                URL: {claimDataToPreview.claimUrl}
              </p>
            </div>
          </div>
          <button
            onClick={() => onPreviewClaim(claimDataToPreview)}
            className="text-2xs bg-purple-600 hover:bg-purple-500 text-white font-semibold px-3 py-1 rounded transition-colors shrink-0"
          >
            Launch Claim Preview
          </button>
        </div>
      )}

      {/* Headers Accordion Toggle */}
      <div className="px-4 py-2 bg-slate-950/20 border-b border-slate-800/80">
        <button
          onClick={() => setShowHeaders(!showHeaders)}
          className="text-2xs text-slate-400 hover:text-slate-200 font-mono flex items-center space-x-1"
        >
          <Layers className="w-3 h-3 text-slate-500" />
          <span>HTTP Headers ({Object.keys(log.responseHeaders || {}).length})</span>
          {showHeaders ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>

        {showHeaders && (
          <div className="mt-2 p-3 bg-slate-950 rounded border border-slate-800 font-mono text-3xs text-slate-300 space-y-1">
            {Object.entries(log.responseHeaders || {}).map(([hk, hv]) => (
              <div key={hk} className="flex space-x-2">
                <span className="text-indigo-400 font-semibold">{hk}:</span>
                <span className="text-slate-400 truncate">{hv}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Response Body JSON View */}
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono text-2xs uppercase tracking-wider font-semibold text-slate-500">
            Response Body (JSON)
          </span>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-500" />
            <input
              type="text"
              placeholder="Search JSON response..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-2 py-1 text-2xs bg-slate-950 rounded border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500 w-48 font-mono"
            />
          </div>
        </div>

        <pre className="p-4 bg-slate-950 font-mono text-xs rounded-lg border border-slate-800 text-slate-200 overflow-x-auto max-h-96 custom-scrollbar">
          {searchQuery ? (
            jsonStr.split('\n').map((line, idx) => {
              const matches = line.toLowerCase().includes(searchQuery.toLowerCase());
              return (
                <div
                  key={idx}
                  className={matches ? 'bg-indigo-950/80 text-indigo-200 px-1 rounded' : ''}
                >
                  {line}
                </div>
              );
            })
          ) : (
            jsonStr
          )}
        </pre>
      </div>
    </div>
  );
};
