import { EnvironmentMode, RequestExecutionLog } from '../types';

export interface ExecuteRequestOptions {
  endpoint: string;
  method: 'GET' | 'POST' | 'DELETE' | 'PUT';
  environment: EnvironmentMode;
  token?: string;
  queryParams?: Record<string, any>;
  pathParams?: Record<string, string>;
  bodyParams?: Record<string, any>;
  simulateRateLimit?: boolean;
}

export async function executeGiftbitRequest(options: ExecuteRequestOptions): Promise<RequestExecutionLog> {
  const {
    endpoint,
    method,
    environment,
    token,
    queryParams,
    pathParams,
    bodyParams,
    simulateRateLimit
  } = options;

  // Substitute path parameters like {brand_code} or {id}
  let resolvedEndpoint = endpoint;
  if (pathParams) {
    Object.entries(pathParams).forEach(([paramKey, paramVal]) => {
      resolvedEndpoint = resolvedEndpoint.replace(`{${paramKey}}`, encodeURIComponent(paramVal || ''));
    });
  }

  try {
    const response = await fetch('/api/giftbit/proxy', {
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

    return {
      id: 'log_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      timestamp: new Date().toISOString(),
      provider: 'giftbit',
      method,
      endpoint: resolvedEndpoint,
      fullUrl: data.fullUrl || `https://api-${environment}.giftbit.com/papi/v1${resolvedEndpoint}`,
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
    return {
      id: 'log_' + Date.now(),
      timestamp: new Date().toISOString(),
      provider: 'giftbit',
      method,
      endpoint: resolvedEndpoint,
      fullUrl: `https://api-${environment}.giftbit.com/papi/v1${resolvedEndpoint}`,
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
