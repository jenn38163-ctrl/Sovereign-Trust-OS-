import React, { useState } from 'react';
import { RequestExecutionLog } from '../types';
import {
  X,
  Trash2,
  Play,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  ChevronRight,
  ChevronDown,
  Search
} from 'lucide-react';

interface LogsInspectorProps {
  isOpen: boolean;
  onClose: () => void;
  logs: RequestExecutionLog[];
  onClearLogs: () => void;
  onReplayLog: (log: RequestExecutionLog) => void;
}

export const LogsInspector: React.FC<LogsInspectorProps> = ({
  isOpen,
  onClose,
  logs,
  onClearLogs,
  onReplayLog
}) => {
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);
  const [filterText, setFilterText] = useState('');

  if (!isOpen) return null;

  const filteredLogs = logs.filter(
    (l) =>
      l.endpoint.toLowerCase().includes(filterText.toLowerCase()) ||
      l.method.toLowerCase().includes(filterText.toLowerCase()) ||
      String(l.status).includes(filterText)
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full h-[80vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Drawer Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base font-bold text-slate-100">
              API Request Execution History ({logs.length})
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            {logs.length > 0 && (
              <button
                onClick={onClearLogs}
                className="text-2xs text-rose-400 hover:text-rose-300 flex items-center space-x-1 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Logs</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="p-4 bg-slate-950/40 border-b border-slate-800">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="Filter logs by endpoint, method or status code..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-950 text-slate-200 text-xs rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>
        </div>

        {/* Logs Table */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          {filteredLogs.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-xs">
              No matching API execution logs found.
            </div>
          ) : (
            filteredLogs.map((log) => {
              const isExpanded = expandedLogId === log.id;
              const isSuccess = log.status >= 200 && log.status < 300;

              return (
                <div
                  key={log.id}
                  className="bg-slate-950/80 border border-slate-800 rounded-xl overflow-hidden text-xs transition-all"
                >
                  {/* Summary Row */}
                  <div
                    onClick={() => setExpandedLogId(isExpanded ? null : log.id)}
                    className="p-3 flex items-center justify-between cursor-pointer hover:bg-slate-800/50 transition-colors gap-3"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-indigo-400 shrink-0" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
                      )}

                      {/* Method */}
                      <span
                        className={`text-3xs font-mono font-bold px-2 py-0.5 rounded uppercase shrink-0 ${
                          log.method === 'POST'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-sky-950 text-sky-400 border border-sky-800'
                        }`}
                      >
                        {log.method}
                      </span>

                      {/* Endpoint */}
                      <span className="font-mono text-slate-200 truncate font-medium">
                        {log.endpoint}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0">
                      {/* Latency */}
                      <span className="text-2xs font-mono text-slate-400">
                        {log.durationMs}ms
                      </span>

                      {/* Status */}
                      <span
                        className={`px-2 py-0.5 rounded-full font-mono text-3xs font-bold border ${
                          isSuccess
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                            : 'bg-rose-950 text-rose-300 border-rose-800'
                        }`}
                      >
                        {log.status}
                      </span>

                      {/* Replay */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onReplayLog(log);
                          onClose();
                        }}
                        className="p-1 text-indigo-400 hover:text-white hover:bg-indigo-600 rounded transition-colors"
                        title="Load into Tester Console"
                      >
                        <Play className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Detail View */}
                  {isExpanded && (
                    <div className="p-4 bg-slate-900 border-t border-slate-800 space-y-3 font-mono text-2xs">
                      {/* Full URL & Timestamp */}
                      <div className="text-slate-400 flex justify-between">
                        <span className="text-indigo-300 truncate">{log.fullUrl}</span>
                        <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                      </div>

                      {/* Request Body */}
                      {log.requestBody && (
                        <div className="space-y-1">
                          <span className="text-slate-400 uppercase font-bold block">
                            Request Body:
                          </span>
                          <pre className="p-2.5 bg-slate-950 rounded border border-slate-800 text-slate-300 overflow-x-auto max-h-40">
                            {JSON.stringify(log.requestBody, null, 2)}
                          </pre>
                        </div>
                      )}

                      {/* Response Body */}
                      <div className="space-y-1">
                        <span className="text-slate-400 uppercase font-bold block">
                          Response Body:
                        </span>
                        <pre className="p-2.5 bg-slate-950 rounded border border-slate-800 text-slate-200 overflow-x-auto max-h-60">
                          {JSON.stringify(log.responseBody, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-4 py-1.5 rounded-lg transition-colors font-medium"
          >
            Close History
          </button>
        </div>
      </div>
    </div>
  );
};
