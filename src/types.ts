export type ApiProvider = 'zendit' | 'giftbit';

export type EnvironmentMode = 'testbed' | 'production' | 'simulator';

export interface ApiKeyConfig {
  zenditTestbedKey: string;
  zenditProductionKey: string;
  giftbitTestbedKey: string;
  giftbitProductionKey: string;
  activeProvider: ApiProvider;
  activeEnv: EnvironmentMode;
}

export type EndpointCategory = 
  | 'account'
  | 'brands'
  | 'topups'
  | 'esim'
  | 'vouchers'
  | 'transactions'
  | 'tools'
  | 'reports'
  | 'promos'
  | 'system'
  | 'email_orders'
  | 'shortlinks'
  | 'direct_links'
  | 'embedded'
  | 'funds'
  | 'rewards';

export interface EndpointDefinition {
  id: string;
  provider: ApiProvider;
  category: EndpointCategory;
  name: string;
  method: 'GET' | 'POST' | 'DELETE' | 'PUT';
  path: string;
  description: string;
  docsUrl?: string;
  requiresBody: boolean;
  queryParams?: { name: string; type: string; required: boolean; default?: string; description: string }[];
  pathParams?: { name: string; description: string; placeholder: string }[];
  defaultPayload?: Record<string, any>;
  sampleResponse: Record<string, any>;
}

export interface RequestExecutionLog {
  id: string;
  timestamp: string;
  provider: ApiProvider;
  method: 'GET' | 'POST' | 'DELETE' | 'PUT';
  endpoint: string;
  fullUrl: string;
  environment: EnvironmentMode;
  status: number;
  statusText: string;
  durationMs: number;
  requestHeaders: Record<string, string>;
  requestBody?: any;
  responseHeaders?: Record<string, string>;
  responseBody?: any;
}

// Zendit Data Types
export interface ZenditBalance {
  availableBalance: number;
  currency: string;
  currencyDivisor: number;
}

export interface ZenditBrand {
  brand: string;
  brandName: string;
  brandBigImage?: string;
  brandColor?: string;
  brandGiftImage?: string;
  brandLogo?: string;
  description?: string;
  requiredFieldsLabels?: { label: string; requiredField: string }[];
  inputMasks?: { requiredField: string; inputMask: string }[];
}

export interface ZenditTopupOffer {
  offerId: string;
  brand: string;
  brandName: string;
  country: string;
  productType: 'TOPUP';
  subTypes: string[];
  priceType: 'FIXED' | 'RANGE';
  enabled: boolean;
  cost: {
    fixed?: number;
    currency: string;
    currencyDivisor: number;
  };
  send: {
    fixed?: number;
    currency: string;
    currencyDivisor: number;
  };
  shortNotes?: string;
}

export interface ZenditESimOffer {
  offerId: string;
  brand: string;
  brandName: string;
  country: string;
  regions: string[];
  dataGB: number;
  dataUnlimited: boolean;
  durationDays: number;
  dataSpeeds: string[];
  cost: {
    fixed: number;
    currency: string;
    currencyDivisor: number;
  };
  shortNotes?: string;
}

export interface ZenditVoucherOffer {
  offerId: string;
  brand: string;
  brandName: string;
  country: string;
  productType: 'VOUCHER';
  requiredFields: string[];
  priceType: 'FIXED' | 'RANGE';
  cost: {
    fixed: number;
    currency: string;
    currencyDivisor: number;
  };
  shortNotes?: string;
}

export interface ZenditPhoneLookup {
  msisdn: string;
  country: string;
  brand: string;
  mobileCountryCode: string;
  mobileNetworkCode: string;
}

export interface ZenditPromo {
  id: string;
  brand: { brand: string; brandName: string };
  country: string;
  regions: string;
  status: 'active' | 'pending' | 'expired';
  startAt: string;
  endAt: string;
  description: { description: string; language: string; terms?: string };
  dataBonusGB?: number;
  valueMultiplier?: number;
}

// Giftbit Types
export interface GiftbitBrand {
  brand_code: string;
  name: string;
  currency: string;
  image_url: string;
  min_price_in_cents: number;
  max_price_in_cents: number;
  allowed_prices_in_cents?: number[];
  allowed_regions?: string[];
  disclaimer?: string;
  terms?: string;
  is_variable_price: boolean;
}

export interface GiftbitRegion {
  code: string;
  name: string;
  currency: string;
}

export interface GiftbitFundBalance {
  currency: string;
  available_in_cents: number;
  reserved_in_cents: number;
}

export interface GiftbitGift {
  id: string;
  supplied_id: string;
  brand_code: string;
  brand_name: string;
  price_in_cents: number;
  currency: string;
  recipient_email?: string;
  delivery_type: 'EMAIL' | 'SHORTLINK' | 'DIRECT_LINK' | 'EMBEDDED';
  status: 'DELIVERED' | 'UNCLAIMED' | 'CLAIMED' | 'CANCELLED';
  created_date: string;
  claim_url?: string;
  card_code?: string;
  pin?: string;
}
