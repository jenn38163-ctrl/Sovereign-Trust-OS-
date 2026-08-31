import { ApiProvider, EnvironmentMode, RequestExecutionLog } from '../types';

export interface ExecuteRequestOptions {
  provider: ApiProvider;
  endpoint: string;
  method: 'GET' | 'POST' | 'DELETE' | 'PUT';
  environment: EnvironmentMode;
  token?: string;
  queryParams?: Record<string, any>;
  pathParams?: Record<string, string>;
  bodyParams?: Record<string, any>;
  simulateRateLimit?: boolean;
}

export async function executeApiRequest(options: ExecuteRequestOptions): Promise<RequestExecutionLog> {
  const {
    provider,
    endpoint,
    method,
    environment,
    token,
    queryParams,
    pathParams,
    bodyParams,
    simulateRateLimit
  } = options;

  // Substitute path parameters like {brand}, {offerId}, {transactionId}, {msisdn}, {iccId}, {reportId}
  let resolvedEndpoint = endpoint;
  if (pathParams) {
    Object.entries(pathParams).forEach(([paramKey, paramVal]) => {
      resolvedEndpoint = resolvedEndpoint.replace(`{${paramKey}}`, encodeURIComponent(paramVal || ''));
    });
  }

  const proxyPath = provider === 'zendit' ? '/api/zendit/proxy' : '/api/giftbit/proxy';

  try {
    const response = await fetch(proxyPath, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        endpoint: resolvedEndpoint,
        method,
        environment,
        token,
        queryParams,
        bodyParams,
        simulateRateLimit
      })
    });

    const data = await response.json();

    const authHeaderValue = token ? (token.startsWith('Bearer ') ? token : `Bearer ${token}`) : 'Bearer [SIMULATED_TOKEN]';

    const baseUrl = provider === 'zendit' 
      ? 'https://api.zendit.io/v1' 
      : `https://api-${environment}.giftbit.com/papi/v1`;

    return {
      id: 'log_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      timestamp: new Date().toISOString(),
      provider,
      method,
      endpoint: resolvedEndpoint,
      fullUrl: data.fullUrl || `${baseUrl}${resolvedEndpoint}`,
      environment,
      status: data.status || response.status,
      statusText: data.statusText || (response.ok ? 'OK' : 'Error'),
      durationMs: data.durationMs || 100,
      requestHeaders: {
        'Authorization': authHeaderValue,
        'Accept': 'application/json',
        'Content-Type': ['POST', 'PUT'].includes(method) ? 'application/json' : 'none'
      },
      requestBody: bodyParams,
      responseHeaders: data.responseHeaders || { 'content-type': 'application/json' },
      responseBody: data.responseBody || data
    };
  } catch (err: any) {
    const baseUrl = provider === 'zendit' ? 'https://api.zendit.io/v1' : `https://api-${environment}.giftbit.com/papi/v1`;
    return {
      id: 'log_' + Date.now(),
      timestamp: new Date().toISOString(),
      provider,
      method,
      endpoint: resolvedEndpoint,
      fullUrl: `${baseUrl}${resolvedEndpoint}`,
      environment,
      status: 500,
      statusText: 'Client Proxy Call Error',
      durationMs: 0,
      requestHeaders: {
        'Authorization': token ? `Bearer ${token}` : 'Bearer [SIMULATED_TOKEN]',
        'Content-Type': 'application/json'
      },
      requestBody: bodyParams,
      responseHeaders: {},
      responseBody: {
        error: {
          code: 'CLIENT_FETCH_ERROR',
          name: 'Fetch Failed',
          message: err?.message || 'Failed to communicate with proxy endpoint.'
        },
        status: 500
      }
    };
  }
}

// Backward compatibility alias
export const executeGiftbitRequest = (opts: any) => executeApiRequest({ ...opts, provider: opts.provider || 'giftbit' });
