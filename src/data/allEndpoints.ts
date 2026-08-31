import { EndpointDefinition, ApiProvider } from '../types';
import { ZENDIT_ENDPOINTS } from './mockZenditData';
import { ENDPOINT_DEFINITIONS as GIFTBIT_ENDPOINTS } from './mockGiftbitData';

export const ALL_ENDPOINTS: EndpointDefinition[] = [
  ...ZENDIT_ENDPOINTS,
  ...GIFTBIT_ENDPOINTS
];

export function getEndpointsByProvider(provider: ApiProvider): EndpointDefinition[] {
  return ALL_ENDPOINTS.filter(ep => ep.provider === provider);
}

export function getEndpointById(id: string): EndpointDefinition | undefined {
  return ALL_ENDPOINTS.find(ep => ep.id === id);
}
