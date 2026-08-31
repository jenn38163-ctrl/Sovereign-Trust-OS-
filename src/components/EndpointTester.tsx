import React, { useState, useEffect } from 'react';
import { EndpointDefinition, EnvironmentMode } from '../types';
import { MOCK_BRANDS } from '../data/mockGiftbitData';
import { MOCK_ZENDIT_BRANDS, MOCK_TOPUP_OFFERS, MOCK_ESIM_OFFERS, MOCK_VOUCHER_OFFERS } from '../data/mockZenditData';
import {
  Play,
  Copy,
  Check,
  Code2,
  SlidersHorizontal,
  FileCode,
  Sparkles,
  Info
} from 'lucide-react';

interface EndpointTesterProps {
  endpoint: EndpointDefinition;
  environment: EnvironmentMode;
  apiKey: string;
  onExecute: (options: {
    endpoint: string;
    method: 'GET' | 'POST' | 'DELETE' | 'PUT';
    pathParams: Record<string, string>;
    queryParams: Record<string, any>;
    bodyParams: Record<string, any>;
  }) => void;
  isExecuting: boolean;
}

export const EndpointTester: React.FC<EndpointTesterProps> = ({
  endpoint,
  environment,
  apiKey,
  onExecute,
  isExecuting
}) => {
  const [activeTab, setActiveTab] = useState<'form' | 'json' | 'code'>('form');
  const [pathParams, setPathParams] = useState<Record<string, string>>({});
  const [queryParams, setQueryParams] = useState<Record<string, any>>({});
  const [bodyParams, setBodyParams] = useState<Record<string, any>>({});
  const [jsonString, setJsonString] = useState<string>('');
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [codeLanguage, setCodeLanguage] = useState<'curl' | 'node' | 'python' | 'go'>('curl');
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    // Default path params
    const initialPath: Record<string, string> = {};
    if (endpoint.pathParams) {
      endpoint.pathParams.forEach((p) => {
        initialPath[p.name] = p.placeholder || '';
      });
    }
    setPathParams(initialPath);

    // Default query params
    const initialQuery: Record<string, any> = {};
    if (endpoint.queryParams) {
      endpoint.queryParams.forEach((q) => {
        if (q.default !== undefined) {
          initialQuery[q.name] = q.default;
        }
      });
    }
    setQueryParams(initialQuery);

    // Default body params
    const defaultBody = endpoint.defaultPayload ? JSON.parse(JSON.stringify(endpoint.defaultPayload)) : {};
    setBodyParams(defaultBody);
    setJsonString(Object.keys(defaultBody).length > 0 ? JSON.stringify(defaultBody, null, 2) : '');
    setJsonError(null);
  }, [endpoint]);

  const handleJsonChange = (val: string) => {
    setJsonString(val);
    try {
      if (val.trim()) {
        const parsed = JSON.parse(val);
        setBodyParams(parsed);
      } else {
        setBodyParams({});
      }
      setJsonError(null);
    } catch (err: any) {
      setJsonError(err.message || 'Invalid JSON syntax');
    }
  };

  const handleResetPayload = () => {
    const defaultBody = endpoint.defaultPayload ? JSON.parse(JSON.stringify(endpoint.defaultPayload)) : {};
    if (defaultBody.supplied_id) {
      defaultBody.supplied_id = `order_${Math.floor(1000 + Math.random() * 9000)}`;
    }
    if (defaultBody.transactionId) {
      defaultBody.transactionId = `tx_${Date.now()}_${Math.floor(100 + Math.random() * 900)}`;
    }
    setBodyParams(defaultBody);
    setJsonString(Object.keys(defaultBody).length > 0 ? JSON.stringify(defaultBody, null, 2) : '');
    setJsonError(null);
  };

  const handleRun = () => {
    if (endpoint.requiresBody && jsonError) return;
    onExecute({
      endpoint: endpoint.path,
      method: endpoint.method,
      pathParams,
      queryParams,
      bodyParams
    });
  };

  // Base URL calculation
  let resolvedPath = endpoint.path;
  Object.entries(pathParams).forEach(([k, v]) => {
    resolvedPath = resolvedPath.replace(`{${k}}`, v || `{${k}}`);
  });
  let queryString = '';
  const activeQueries = Object.entries(queryParams).filter(([_, v]) => v !== undefined && v !== '');
  if (activeQueries.length > 0) {
    queryString = '?' + new URLSearchParams(activeQueries as any).toString();
  }

  const isZendit = endpoint.provider === 'zendit';
  const baseUrl = isZendit
    ? 'https://api.zendit.io/v1'
    : environment === 'production'
    ? 'https://api.giftbit.com/papi/v1'
    : 'https://api-testbed.giftbit.com/papi/v1';

  const fullUrl = `${baseUrl}${resolvedPath}${queryString}`;

  const generateCodeSnippet = () => {
    const defaultTokenName = isZendit ? 'YOUR_ZENDIT_TOKEN' : 'YOUR_GIFTBIT_TOKEN';
    const tokenHeader = apiKey ? (apiKey.startsWith('Bearer ') ? apiKey : `Bearer ${apiKey}`) : `Bearer ${defaultTokenName}`;

    if (codeLanguage === 'curl') {
      let cmd = `curl -X ${endpoint.method} "${fullUrl}" \\\n  -H "Authorization: ${tokenHeader}" \\\n  -H "Accept: application/json"`;
      if (['POST', 'PUT'].includes(endpoint.method) && Object.keys(bodyParams).length > 0) {
        cmd += ` \\\n  -H "Content-Type: application/json" \\\n  -d '${JSON.stringify(bodyParams, null, 2)}'`;
      }
      return cmd;
    }

    if (codeLanguage === 'node') {
      return `const response = await fetch("${fullUrl}", {
  method: "${endpoint.method}",
  headers: {
    "Authorization": "${tokenHeader}",
    "Accept": "application/json",
    ${['POST', 'PUT'].includes(endpoint.method) ? '"Content-Type": "application/json"' : ''}
  }${['POST', 'PUT'].includes(endpoint.method) && Object.keys(bodyParams).length > 0 ? `,\n  body: JSON.stringify(${JSON.stringify(bodyParams, null, 4)})` : ''}
});

const data = await response.json();
console.log(data);`;
    }

    if (codeLanguage === 'python') {
      return `import requests

url = "${fullUrl}"
headers = {
    "Authorization": "${tokenHeader}",
    "Accept": "application/json"${['POST', 'PUT'].includes(endpoint.method) ? ',\n    "Content-Type": "application/json"' : ''}
}
${['POST', 'PUT'].includes(endpoint.method) && Object.keys(bodyParams).length > 0 ? `payload = ${JSON.stringify(bodyParams, null, 4)}\n\nresponse = requests.${endpoint.method.toLowerCase()}(url, headers=headers, json=payload)` : `response = requests.${endpoint.method.toLowerCase()}(url, headers=headers)`}

print(response.status_code)
print(response.json())`;
    }

    if (codeLanguage === 'go') {
      return `package main

import (
    "fmt"
    "net/http"
    "io"
    ${['POST', 'PUT'].includes(endpoint.method) && Object.keys(bodyParams).length > 0 ? '"bytes"\n    "encoding/json"' : ''}
)

func main() {
    url := "${fullUrl}"
    ${['POST', 'PUT'].includes(endpoint.method) && Object.keys(bodyParams).length > 0 ? `payload, _ := json.Marshal(${JSON.stringify(bodyParams)})\n    req, _ := http.NewRequest("${endpoint.method}", url, bytes.NewBuffer(payload))` : `req, _ := http.NewRequest("${endpoint.method}", url, nil)`}
    req.Header.Set("Authorization", "${tokenHeader}")
    req.Header.Set("Accept", "application/json")
    
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()

    body, _ := io.ReadAll(resp.Body)
    fmt.Println(string(body))
}`;
    }

    return '';
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateCodeSnippet());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-md flex flex-col">
      {/* Endpoint Header */}
      <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1 min-w-0">
          <div className="flex items-center space-x-2">
            <span
              className={`text-2xs font-mono font-bold px-2 py-0.5 rounded uppercase ${
                endpoint.method === 'POST'
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  : 'bg-sky-950 text-sky-400 border border-sky-800'
              }`}
            >
              {endpoint.method}
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
              {isZendit ? 'Zendit' : 'Giftbit'}
            </span>
            <span className="text-sm font-mono font-semibold text-slate-100 truncate">
              {endpoint.path}
            </span>
          </div>
          <p className="text-xs text-slate-400">{endpoint.description}</p>
        </div>

        {/* Primary Run Button */}
        <button
          onClick={handleRun}
          disabled={isExecuting || (endpoint.requiresBody && !!jsonError)}
          className={`text-white font-semibold text-xs px-4 py-2 rounded-lg shadow-sm transition-all flex items-center space-x-2 disabled:opacity-50 shrink-0 cursor-pointer ${
            isZendit
              ? 'bg-emerald-600 hover:bg-emerald-500'
              : 'bg-indigo-600 hover:bg-indigo-500'
          }`}
        >
          <Play className={`w-3.5 h-3.5 ${isExecuting ? 'animate-spin' : ''}`} />
          <span>{isExecuting ? 'Sending Request...' : 'Execute Request'}</span>
        </button>
      </div>

      {/* Tabs Header */}
      <div className="flex items-center justify-between bg-slate-950/60 border-b border-slate-800 px-4">
        <div className="flex items-center space-x-1 py-1">
          <button
            onClick={() => setActiveTab('form')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'form'
                ? 'bg-slate-800 text-indigo-300 border border-slate-700/80'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Visual Form</span>
          </button>

          {endpoint.requiresBody && (
            <button
              onClick={() => setActiveTab('json')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center space-x-1.5 cursor-pointer ${
                activeTab === 'json'
                  ? 'bg-slate-800 text-indigo-300 border border-slate-700/80'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Raw JSON Payload</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'code'
                ? 'bg-slate-800 text-indigo-300 border border-slate-700/80'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Code Generator</span>
          </button>
        </div>

        {endpoint.requiresBody && (
          <button
            onClick={handleResetPayload}
            className="text-2xs text-slate-400 hover:text-slate-200 flex items-center space-x-1 bg-slate-800/80 hover:bg-slate-800 px-2.5 py-1 rounded border border-slate-700 transition-colors cursor-pointer"
            title="Autofill with valid sample data"
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Load Sample Payload</span>
          </button>
        )}
      </div>

      {/* Tab Contents */}
      <div className="p-4 space-y-4">
        {activeTab === 'form' && (
          <div className="space-y-4 text-xs">
            {/* Path Parameters Section */}
            {endpoint.pathParams && endpoint.pathParams.length > 0 && (
              <div className="space-y-2 bg-slate-950/40 p-3 rounded-lg border border-slate-800">
                <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider block">
                  Path Parameters
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {endpoint.pathParams.map((p) => (
                    <div key={p.name} className="space-y-1">
                      <label className="text-2xs text-slate-400 font-mono">
                        {p.name} <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder={p.placeholder}
                        value={pathParams[p.name] || ''}
                        onChange={(e) =>
                          setPathParams({ ...pathParams, [p.name]: e.target.value })
                        }
                        className="w-full px-3 py-1.5 bg-slate-800 text-slate-200 rounded border border-slate-700 font-mono text-xs focus:outline-none focus:border-indigo-500"
                      />
                      <p className="text-3xs text-slate-500">{p.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Query Parameters Section */}
            {endpoint.queryParams && endpoint.queryParams.length > 0 && (
              <div className="space-y-2 bg-slate-950/40 p-3 rounded-lg border border-slate-800">
                <span className="text-xs font-semibold text-sky-300 uppercase tracking-wider block">
                  Query Parameters
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {endpoint.queryParams.map((q) => (
                    <div key={q.name} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="text-2xs text-slate-400 font-mono">
                          {q.name}
                        </label>
                        <span className="text-3xs text-slate-500 uppercase">{q.type}</span>
                      </div>
                      <input
                        type={q.type === 'number' ? 'number' : 'text'}
                        placeholder={q.default || ''}
                        value={queryParams[q.name] ?? ''}
                        onChange={(e) =>
                          setQueryParams({ ...queryParams, [q.name]: e.target.value })
                        }
                        className="w-full px-3 py-1.5 bg-slate-800 text-slate-200 rounded border border-slate-700 text-xs font-mono focus:outline-none focus:border-indigo-500"
                      />
                      <p className="text-3xs text-slate-500">{q.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Request Body Parameters */}
            {endpoint.requiresBody && (
              <div className="space-y-3 bg-slate-950/40 p-3 rounded-lg border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider block">
                    Request Body Parameters
                  </span>
                  <button
                    onClick={() => {
                      const newBody = { ...bodyParams };
                      if (isZendit) {
                        newBody.transactionId = `tx_${Date.now()}_${Math.floor(100 + Math.random() * 900)}`;
                      } else {
                        newBody.supplied_id = `order_${Math.floor(1000 + Math.random() * 9000)}`;
                      }
                      setBodyParams(newBody);
                      setJsonString(JSON.stringify(newBody, null, 2));
                    }}
                    className="text-3xs text-indigo-400 hover:text-indigo-300 underline cursor-pointer"
                  >
                    Refresh Idempotency Key
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Zendit Offer Selectors */}
                  {bodyParams.offerId !== undefined && isZendit && (
                    <div className="space-y-1 col-span-full">
                      <label className="text-2xs text-slate-400 font-mono">offerId</label>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {[...MOCK_TOPUP_OFFERS, ...MOCK_ESIM_OFFERS, ...MOCK_VOUCHER_OFFERS].map((o) => {
                          const isSel = bodyParams.offerId === o.offerId;
                          return (
                            <button
                              key={o.offerId}
                              onClick={() => {
                                const updated = { ...bodyParams, offerId: o.offerId };
                                setBodyParams(updated);
                                setJsonString(JSON.stringify(updated, null, 2));
                              }}
                              className={`px-2.5 py-1 rounded text-3xs font-mono font-medium transition-all cursor-pointer ${
                                isSel
                                  ? 'bg-emerald-600 text-white shadow-xs'
                                  : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'
                              }`}
                            >
                              {o.brandName} - {o.offerId}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Zendit Recipient Phone Number */}
                  {bodyParams.recipientPhoneNumber !== undefined && (
                    <div className="space-y-1">
                      <label className="text-2xs text-slate-400 font-mono">recipientPhoneNumber</label>
                      <input
                        type="text"
                        value={bodyParams.recipientPhoneNumber || ''}
                        onChange={(e) => {
                          const updated = { ...bodyParams, recipientPhoneNumber: e.target.value };
                          setBodyParams(updated);
                          setJsonString(JSON.stringify(updated, null, 2));
                        }}
                        className="w-full px-3 py-1.5 bg-slate-800 text-slate-200 rounded border border-slate-700 font-mono text-xs focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  )}

                  {/* Zendit Transaction ID */}
                  {bodyParams.transactionId !== undefined && (
                    <div className="space-y-1">
                      <label className="text-2xs text-slate-400 font-mono">transactionId</label>
                      <input
                        type="text"
                        value={bodyParams.transactionId || ''}
                        onChange={(e) => {
                          const updated = { ...bodyParams, transactionId: e.target.value };
                          setBodyParams(updated);
                          setJsonString(JSON.stringify(updated, null, 2));
                        }}
                        className="w-full px-3 py-1.5 bg-slate-800 text-slate-200 rounded border border-slate-700 font-mono text-xs focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  )}

                  {/* Giftbit Supplied ID */}
                  {bodyParams.supplied_id !== undefined && (
                    <div className="space-y-1">
                      <label className="text-2xs text-slate-400 font-mono">supplied_id (Giftbit Key)</label>
                      <input
                        type="text"
                        value={bodyParams.supplied_id || ''}
                        onChange={(e) => {
                          const updated = { ...bodyParams, supplied_id: e.target.value };
                          setBodyParams(updated);
                          setJsonString(JSON.stringify(updated, null, 2));
                        }}
                        className="w-full px-3 py-1.5 bg-slate-800 text-slate-200 rounded border border-slate-700 font-mono text-xs focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  )}

                  {/* Giftbit Price in cents */}
                  {bodyParams.price_in_cents !== undefined && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="text-2xs text-slate-400 font-mono">price_in_cents</label>
                        <span className="text-2xs font-semibold text-emerald-400">
                          ${((bodyParams.price_in_cents || 0) / 100).toFixed(2)} USD
                        </span>
                      </div>
                      <input
                        type="number"
                        step="100"
                        value={bodyParams.price_in_cents || ''}
                        onChange={(e) => {
                          const updated = { ...bodyParams, price_in_cents: Number(e.target.value) };
                          setBodyParams(updated);
                          setJsonString(JSON.stringify(updated, null, 2));
                        }}
                        className="w-full px-3 py-1.5 bg-slate-800 text-slate-200 rounded border border-slate-700 text-xs font-mono focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  )}

                  {/* Giftbit Brand Codes Quick Selector */}
                  {bodyParams.brand_codes !== undefined && (
                    <div className="space-y-1 col-span-full">
                      <label className="text-2xs text-slate-400 font-mono">brand_codes</label>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {MOCK_BRANDS.map((b) => {
                          const isSelected = (bodyParams.brand_codes || []).includes(b.brand_code);
                          return (
                            <button
                              key={b.brand_code}
                              onClick={() => {
                                let newCodes = [...(bodyParams.brand_codes || [])];
                                if (isSelected) {
                                  newCodes = newCodes.filter((c) => c !== b.brand_code);
                                } else {
                                  newCodes.push(b.brand_code);
                                }
                                const updated = { ...bodyParams, brand_codes: newCodes };
                                setBodyParams(updated);
                                setJsonString(JSON.stringify(updated, null, 2));
                              }}
                              className={`px-2.5 py-1 rounded text-3xs font-mono font-medium transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-indigo-600 text-white shadow-xs'
                                  : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'
                              }`}
                            >
                              {b.name} ({b.brand_code})
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-2 text-3xs text-slate-500 flex items-center space-x-1">
                  <Info className="w-3 h-3 text-slate-400" />
                  <span>
                    Switch to the "Raw JSON Payload" tab to edit JSON object fields directly.
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* RAW JSON TAB */}
        {activeTab === 'json' && endpoint.requiresBody && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">Raw JSON Editor</span>
              {jsonError && (
                <span className="text-2xs text-rose-400 font-semibold">{jsonError}</span>
              )}
            </div>
            <textarea
              rows={10}
              value={jsonString}
              onChange={(e) => handleJsonChange(e.target.value)}
              className={`w-full p-3 bg-slate-950 font-mono text-xs rounded-lg border ${
                jsonError ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-indigo-500'
              } text-slate-200 focus:outline-none custom-scrollbar`}
            />
          </div>
        )}

        {/* CODE GENERATOR TAB */}
        {activeTab === 'code' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {(['curl', 'node', 'python', 'go'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setCodeLanguage(lang)}
                    className={`px-2.5 py-1 rounded text-2xs font-mono font-bold uppercase transition-all cursor-pointer ${
                      codeLanguage === lang
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              <button
                onClick={handleCopyCode}
                className="flex items-center space-x-1 text-2xs text-indigo-400 hover:text-indigo-300 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-md border border-slate-700 transition-colors cursor-pointer"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-4 bg-slate-950 font-mono text-xs rounded-lg border border-slate-800 text-slate-300 overflow-x-auto whitespace-pre custom-scrollbar">
              {generateCodeSnippet()}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
