import {
  ZenditBalance,
  ZenditBrand,
  ZenditTopupOffer,
  ZenditESimOffer,
  ZenditVoucherOffer,
  ZenditPhoneLookup,
  ZenditPromo,
  EndpointDefinition
} from '../types';

export const MOCK_ZENDIT_BALANCE: ZenditBalance = {
  availableBalance: 48500, // $485.00
  currency: 'USD',
  currencyDivisor: 100
};

export const MOCK_ZENDIT_BRANDS: ZenditBrand[] = [
  {
    brand: 'verizon_us',
    brandName: 'Verizon Wireless US',
    brandLogo: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=300&q=80',
    brandColor: '#CD040B',
    description: 'Nationwide US carrier prepaid refills, airtime, and high speed 5G mobile data refills.'
  },
  {
    brand: 'att_us',
    brandName: 'AT&T Prepaid US',
    brandLogo: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80',
    brandColor: '#00A8E0',
    description: 'AT&T prepaid airtime refill and instant monthly plan topups across the United States.'
  },
  {
    brand: 'tmobile_us',
    brandName: 'T-Mobile US',
    brandLogo: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=300&q=80',
    brandColor: '#E20074',
    description: 'T-Mobile US prepaid refills and high-speed nationwide 5G data packages.'
  },
  {
    brand: 'airalo_us',
    brandName: 'Airalo eSIM United States',
    brandLogo: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=300&q=80',
    brandColor: '#10B981',
    description: 'Travel eSIM data plans designed specifically for high-speed coverage across the United States.'
  },
  {
    brand: 'amazon_us',
    brandName: 'Amazon US Gift Card',
    brandLogo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=300&q=80',
    brandColor: '#FF9900',
    description: 'Universal e-commerce digital gift voucher for Amazon United States.'
  },
  {
    brand: 'target_us',
    brandName: 'Target US eGift',
    brandLogo: 'https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?auto=format&fit=crop&w=300&q=80',
    brandColor: '#CC0000',
    description: 'Target US eGift Card valid online at Target.com and in US retail stores.'
  },
  {
    brand: 'walmart_us',
    brandName: 'Walmart US eGift Card',
    brandLogo: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=300&q=80',
    brandColor: '#0071DC',
    description: 'Digital gift card redeemable at Walmart US stores and online.'
  },
  {
    brand: 'apple_us',
    brandName: 'Apple US Gift Card',
    brandLogo: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=300&q=80',
    brandColor: '#555555',
    description: 'Apple United States gift card for products, apps, subscriptions, and services.'
  }
];

export const MOCK_TOPUP_OFFERS: ZenditTopupOffer[] = [
  {
    offerId: 'topup_verizon_us_2500',
    brand: 'verizon_us',
    brandName: 'Verizon Wireless US',
    country: 'US',
    productType: 'TOPUP',
    subTypes: ['Mobile Top Up'],
    priceType: 'FIXED',
    enabled: true,
    cost: { fixed: 2500, currency: 'USD', currencyDivisor: 100 },
    send: { fixed: 2500, currency: 'USD', currencyDivisor: 100 },
    shortNotes: 'Verizon Wireless US $25.00 Prepaid Refill Plan'
  },
  {
    offerId: 'topup_att_us_3000',
    brand: 'att_us',
    brandName: 'AT&T Prepaid US',
    country: 'US',
    productType: 'TOPUP',
    subTypes: ['Mobile Top Up', 'Mobile Data'],
    priceType: 'FIXED',
    enabled: true,
    cost: { fixed: 3000, currency: 'USD', currencyDivisor: 100 },
    send: { fixed: 3000, currency: 'USD', currencyDivisor: 100 },
    shortNotes: 'AT&T Prepaid US $30.00 Refill + 5GB 5G High Speed Data'
  },
  {
    offerId: 'topup_tmobile_us_5000',
    brand: 'tmobile_us',
    brandName: 'T-Mobile US',
    country: 'US',
    productType: 'TOPUP',
    subTypes: ['Mobile Top Up', 'Mobile Data'],
    priceType: 'FIXED',
    enabled: true,
    cost: { fixed: 5000, currency: 'USD', currencyDivisor: 100 },
    send: { fixed: 5000, currency: 'USD', currencyDivisor: 100 },
    shortNotes: 'T-Mobile US $50.00 Unlimited Talk, Text & 5G Data Refill'
  }
];

export const MOCK_ESIM_OFFERS: ZenditESimOffer[] = [
  {
    offerId: 'esim_us_1gb_7d',
    brand: 'airalo_us',
    brandName: 'Airalo eSIM United States',
    country: 'US',
    regions: ['United States', 'North America'],
    dataGB: 1,
    dataUnlimited: false,
    durationDays: 7,
    dataSpeeds: ['4G', '5G'],
    cost: { fixed: 450, currency: 'USD', currencyDivisor: 100 },
    shortNotes: '1GB United States High-Speed Travel Data Plan for 7 Days'
  },
  {
    offerId: 'esim_us_5gb_30d',
    brand: 'airalo_us',
    brandName: 'Airalo eSIM United States',
    country: 'US',
    regions: ['United States', 'North America'],
    dataGB: 5,
    dataUnlimited: false,
    durationDays: 30,
    dataSpeeds: ['4G', '5G'],
    cost: { fixed: 1600, currency: 'USD', currencyDivisor: 100 },
    shortNotes: '5GB United States High-Speed 5G Data Plan valid for 30 Days'
  },
  {
    offerId: 'esim_us_unlimited_15d',
    brand: 'airalo_us',
    brandName: 'Airalo eSIM United States',
    country: 'US',
    regions: ['United States'],
    dataGB: 0,
    dataUnlimited: true,
    durationDays: 15,
    dataSpeeds: ['5G'],
    cost: { fixed: 2900, currency: 'USD', currencyDivisor: 100 },
    shortNotes: '15 Days Unlimited 5G Data across all 50 US States'
  }
];

export const MOCK_VOUCHER_OFFERS: ZenditVoucherOffer[] = [
  {
    offerId: 'vch_amazon_us_25',
    brand: 'amazon_us',
    brandName: 'Amazon US Gift Card',
    country: 'US',
    productType: 'VOUCHER',
    requiredFields: [],
    priceType: 'FIXED',
    cost: { fixed: 2500, currency: 'USD', currencyDivisor: 100 },
    shortNotes: '$25 Amazon US Digital Gift Voucher ePIN code'
  },
  {
    offerId: 'vch_target_us_50',
    brand: 'target_us',
    brandName: 'Target US eGift',
    country: 'US',
    productType: 'VOUCHER',
    requiredFields: [],
    priceType: 'FIXED',
    cost: { fixed: 5000, currency: 'USD', currencyDivisor: 100 },
    shortNotes: '$50 Target United States eGift Card voucher'
  },
  {
    offerId: 'vch_walmart_us_100',
    brand: 'walmart_us',
    brandName: 'Walmart US eGift Card',
    country: 'US',
    productType: 'VOUCHER',
    requiredFields: [],
    priceType: 'FIXED',
    cost: { fixed: 10000, currency: 'USD', currencyDivisor: 100 },
    shortNotes: '$100 Walmart US Digital Gift Voucher'
  }
];

export const MOCK_PROMOS: ZenditPromo[] = [
  {
    id: 'prm_verizon_us_bonus',
    brand: { brand: 'verizon_us', brandName: 'Verizon Wireless US' },
    country: 'US',
    regions: 'United States',
    status: 'active',
    startAt: '2026-08-01T00:00:00Z',
    endAt: '2026-08-31T23:59:59Z',
    description: {
      description: 'Double Data Bonus on Verizon Wireless US $25+ Refills.',
      language: 'en',
      terms: 'Valid on US prepaid account refills of $25.00 USD or more.'
    },
    valueMultiplier: 2
  },
  {
    id: 'prm_esim_us_summer',
    brand: { brand: 'airalo_us', brandName: 'Airalo eSIM United States' },
    country: 'US',
    regions: 'United States',
    status: 'active',
    startAt: '2026-08-01T00:00:00Z',
    endAt: '2026-08-31T23:59:59Z',
    description: {
      description: '+1GB Bonus Data on 5GB+ US eSIM purchases.',
      language: 'en'
    },
    dataBonusGB: 1
  }
];

export const MOCK_LOOKUPS: Record<string, ZenditPhoneLookup> = {
  '+50230001122': {
    msisdn: '+50230001122',
    country: 'GT',
    brand: 'claro_gt',
    mobileCountryCode: '704',
    mobileNetworkCode: '01'
  },
  '+50255551234': {
    msisdn: '+50255551234',
    country: 'GT',
    brand: 'tigo_gt',
    mobileCountryCode: '704',
    mobileNetworkCode: '02'
  },
  '+15551234567': {
    msisdn: '+15551234567',
    country: 'US',
    brand: 'verizon_us',
    mobileCountryCode: '310',
    mobileNetworkCode: '004'
  }
};

export const ZENDIT_ENDPOINTS: EndpointDefinition[] = [
  // Account
  {
    id: 'zendit-balance',
    provider: 'zendit',
    category: 'account',
    name: 'Get Account Balance',
    method: 'GET',
    path: '/balance',
    description: 'Fetch real-time available prepaid wallet balance and currency divisor from Zendit.',
    docsUrl: 'https://developers.zendit.io/zendit-concepts/zendit-wallets/',
    requiresBody: false,
    sampleResponse: {
      availableBalance: 48500,
      currency: 'USD',
      currencyDivisor: 100
    }
  },

  // Brands
  {
    id: 'zendit-list-brands',
    provider: 'zendit',
    category: 'brands',
    name: 'List Catalog Brands',
    method: 'GET',
    path: '/brands',
    description: 'Retrieve catalog brands filtered by limit, offset, or 2-letter ISO country code.',
    docsUrl: 'https://developers.zendit.io/zendit-concepts/zendit-catalog/',
    requiresBody: false,
    queryParams: [
      { name: '_limit', type: 'number', required: true, default: '20', description: 'Number of items to return (1 - 1024)' },
      { name: '_offset', type: 'number', required: true, default: '0', description: 'Items offset for pagination' },
      { name: 'country', type: 'string', required: false, default: 'US', description: '2-letter ISO country code (e.g. US)' }
    ],
    sampleResponse: {
      limit: 20,
      offset: 0,
      total: MOCK_ZENDIT_BRANDS.length,
      list: MOCK_ZENDIT_BRANDS
    }
  },
  {
    id: 'zendit-get-brand',
    provider: 'zendit',
    category: 'brands',
    name: 'Get Brand Details',
    method: 'GET',
    path: '/brands/{brand}',
    description: 'Retrieve single brand assets, required fields labels, and redemption instructions links.',
    requiresBody: false,
    pathParams: [
      { name: 'brand', description: 'Short brand identifier (e.g., verizon_us)', placeholder: 'verizon_us' }
    ],
    sampleResponse: MOCK_ZENDIT_BRANDS[0]
  },
  {
    id: 'zendit-redemption-instructions',
    provider: 'zendit',
    category: 'brands',
    name: 'Get Redemption Instructions',
    method: 'GET',
    path: '/brands/{brand}/redemptionInstructions',
    description: 'Fetch brand redemption instructions HTML and Terms & Conditions.',
    requiresBody: false,
    pathParams: [
      { name: 'brand', description: 'Brand key', placeholder: 'amazon_us' }
    ],
    queryParams: [
      { name: 'country', type: 'string', required: true, default: 'US', description: '2-letter country code' },
      { name: 'deliveryType', type: 'string', required: true, default: 'EPIN', description: 'Delivery type string' },
      { name: 'language', type: 'string', required: false, default: 'en', description: 'Language ISO code' }
    ],
    sampleResponse: {
      country: 'US',
      deliveryType: 'EPIN',
      language: 'en',
      redemptionInstructions: '<ol><li>Visit Amazon.com/redeem</li><li>Enter your claim code during checkout</li></ol>',
      terms: 'Valid for US Amazon accounts only. No expiration date or service fees.'
    }
  },

  // Mobile Top Up
  {
    id: 'zendit-topup-offers',
    provider: 'zendit',
    category: 'topups',
    name: 'List Mobile Topup Offers',
    method: 'GET',
    path: '/topups/offers',
    description: 'Search mobile topup, bundle, and data plan offers filtered by country, brand, or region.',
    requiresBody: false,
    queryParams: [
      { name: '_limit', type: 'number', required: true, default: '20', description: 'Limit' },
      { name: '_offset', type: 'number', required: true, default: '0', description: 'Offset' },
      { name: 'brand', type: 'string', required: false, default: 'verizon_us', description: 'Filter by carrier brand key (e.g. verizon_us)' },
      { name: 'country', type: 'string', required: false, default: 'US', description: 'Country ISO code (e.g. US)' },
      { name: 'subType', type: 'string', required: false, description: 'Mobile Top Up, Mobile Bundle, Mobile Data' }
    ],
    sampleResponse: {
      limit: 20,
      offset: 0,
      total: MOCK_TOPUP_OFFERS.length,
      list: MOCK_TOPUP_OFFERS
    }
  },
  {
    id: 'zendit-topup-purchase',
    provider: 'zendit',
    category: 'topups',
    name: 'Create Topup Purchase',
    method: 'POST',
    path: '/topups/purchases',
    description: 'Submit an asynchronous mobile topup transaction for a recipient e.164 phone number.',
    docsUrl: 'https://developers.zendit.io/zendit-concepts/transaction-processing/',
    requiresBody: true,
    defaultPayload: {
      offerId: 'topup_verizon_us_2500',
      recipientPhoneNumber: '+15551234567',
      transactionId: 'tx_mtu_' + Date.now(),
      sender: {
        country: 'US',
        phoneNumber: '+15559876543'
      }
    },
    sampleResponse: {
      status: 'DONE',
      transactionId: 'tx_mtu_1782910381',
      brand: 'verizon_us',
      brandName: 'Verizon Wireless US',
      recipientPhoneNumber: '+15551234567',
      statusMessage: 'Transaction fulfilled successfully',
      cost: 2500,
      costCurrency: 'USD',
      costCurrencyDivisor: 100,
      confirmation: {
        confirmationNumber: 'CONF-8829102',
        transactionTime: new Date().toISOString()
      }
    }
  },

  // eSIM
  {
    id: 'zendit-esim-offers',
    provider: 'zendit',
    category: 'esim',
    name: 'List eSIM Offers',
    method: 'GET',
    path: '/esim/offers',
    description: 'Browse digital travel eSIM catalog for country-specific, regional, or global data plans.',
    requiresBody: false,
    queryParams: [
      { name: '_limit', type: 'number', required: true, default: '20', description: 'Limit' },
      { name: '_offset', type: 'number', required: true, default: '0', description: 'Offset' },
      { name: 'country', type: 'string', required: false, default: 'US', description: 'Destination country ISO code (e.g. US)' },
      { name: 'regions', type: 'string', required: false, default: 'United States', description: 'Region name (United States, North America)' }
    ],
    sampleResponse: {
      limit: 20,
      offset: 0,
      total: MOCK_ESIM_OFFERS.length,
      list: MOCK_ESIM_OFFERS
    }
  },
  {
    id: 'zendit-esim-purchase',
    provider: 'zendit',
    category: 'esim',
    name: 'Purchase eSIM Data Plan',
    method: 'POST',
    path: '/esim/purchases',
    description: 'Order a new digital eSIM profile or add a top-up data package to an existing ICCID.',
    requiresBody: true,
    defaultPayload: {
      offerId: 'esim_us_1gb_7d',
      transactionId: 'tx_esim_' + Date.now()
    },
    sampleResponse: {
      status: 'DONE',
      transactionId: 'tx_esim_17290128',
      brand: 'airalo_us',
      brandName: 'Airalo eSIM United States',
      cost: 450,
      costCurrency: 'USD',
      costCurrencyDivisor: 100,
      confirmation: {
        iccid: '89012402100029381029',
        smdpAddress: 'rsp.globalesim.net',
        activationCode: 'LPA:1$rsp.globalesim.net$US-ESIM-8891'
      }
    }
  },
  {
    id: 'zendit-esim-qrcode',
    provider: 'zendit',
    category: 'esim',
    name: 'Get eSIM QR Code',
    method: 'GET',
    path: '/esim/purchases/{transactionId}/qrcode',
    description: 'Generates a PNG binary stream or base64 QR Code image for scanning & installing the eSIM.',
    requiresBody: false,
    pathParams: [
      { name: 'transactionId', description: 'Zendit eSIM purchase transaction ID', placeholder: 'tx_esim_17290128' }
    ],
    sampleResponse: {
      imageBase64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
    }
  },
  {
    id: 'zendit-esim-plans',
    provider: 'zendit',
    category: 'esim',
    name: 'Get eSIM Usage & Active Plans',
    method: 'GET',
    path: '/esim/{iccId}/plans',
    description: 'Retrieve real-time data balance and status for active or queued plans on an eSIM ICCID.',
    requiresBody: false,
    pathParams: [
      { name: 'iccId', description: 'ICCID identifier of the eSIM device profile', placeholder: '89012402100029381029' }
    ],
    sampleResponse: {
      total: 1,
      firstInstalledAt: '2026-08-01T10:00:00Z',
      list: [
        {
          iccid: '89012402100029381029',
          offerId: 'esim_global_1gb_7d',
          description: '1GB Global Data Plan',
          initialDataGB: 1.0,
          remainingDataGB: 0.72,
          status: 'ACTIVE',
          unlimited: false,
          startAt: '2026-08-01T10:00:00Z',
          endAt: '2026-08-08T10:00:00Z'
        }
      ]
    }
  },

  // Vouchers / Gift Cards
  {
    id: 'zendit-voucher-offers',
    provider: 'zendit',
    category: 'vouchers',
    name: 'List Voucher Offers',
    method: 'GET',
    path: '/vouchers/offers',
    description: 'Browse Digital Gift Cards and Prepaid Utility Payment offers.',
    requiresBody: false,
    queryParams: [
      { name: '_limit', type: 'number', required: true, default: '20', description: 'Limit' },
      { name: '_offset', type: 'number', required: true, default: '0', description: 'Offset' },
      { name: 'country', type: 'string', required: false, default: 'US', description: '2-letter ISO country code (e.g. US)' }
    ],
    sampleResponse: {
      limit: 20,
      offset: 0,
      total: MOCK_VOUCHER_OFFERS.length,
      list: MOCK_VOUCHER_OFFERS
    }
  },
  {
    id: 'zendit-voucher-purchase',
    provider: 'zendit',
    category: 'vouchers',
    name: 'Purchase Digital Voucher',
    method: 'POST',
    path: '/vouchers/purchases',
    description: 'Purchase a digital gift card ePIN or complete a prepaid utility bill payment with required parameters.',
    requiresBody: true,
    defaultPayload: {
      offerId: 'vch_amazon_us_25',
      transactionId: 'tx_vch_' + Date.now(),
      fields: []
    },
    sampleResponse: {
      status: 'DONE',
      transactionId: 'tx_vch_9918201',
      brand: 'amazon_us',
      brandName: 'Amazon US Gift Card',
      cost: 2500,
      costCurrency: 'USD',
      receipt: {
        deliveryType: 'EPIN',
        epin: 'AMZN-VOUCHER-9920-1102',
        voucherId: 'VCH-881920',
        redemptionUrl: 'https://amazon.com/gc/redeem',
        terms: 'Treat like cash. Redeemable at Amazon.com.'
      }
    }
  },

  // Tools - MSISDN Phone Lookup
  {
    id: 'zendit-phone-lookup',
    provider: 'zendit',
    category: 'tools',
    name: 'MSISDN Phone Lookup (Beta)',
    method: 'GET',
    path: '/tools/phonenumberlookup/{msisdn}',
    description: 'Lookup mobile phone carrier, country ISO code, MCC, and MNC for e.164 MSISDN numbers (e.g. +15551234567).',
    docsUrl: 'https://developers.zendit.io/zendit-concepts/phone-number-lookup',
    requiresBody: false,
    pathParams: [
      { name: 'msisdn', description: 'e.164 formatted phone number (+15551234567)', placeholder: '+15551234567' }
    ],
    sampleResponse: {
      msisdn: '+15551234567',
      country: 'US',
      brand: 'verizon_us',
      mobileCountryCode: '310',
      mobileNetworkCode: '004'
    }
  },

  // Transactions Status
  {
    id: 'zendit-list-transactions',
    provider: 'zendit',
    category: 'transactions',
    name: 'List Transactions',
    method: 'GET',
    path: '/transactions',
    description: 'Query historical transactions with status filters, productType, and RFC 3339 date prefixes (e.g. gte2026-08-01T00:00:00Z).',
    requiresBody: false,
    queryParams: [
      { name: '_limit', type: 'number', required: true, default: '20', description: 'Limit' },
      { name: '_offset', type: 'number', required: true, default: '0', description: 'Offset' },
      { name: 'productType', type: 'string', required: false, description: 'TOPUP, VOUCHER, ESIM' },
      { name: 'status', type: 'string', required: false, description: 'DONE, FAILED, PENDING, IN_PROGRESS' },
      { name: 'createdAt', type: 'string', required: false, description: 'RFC 3339 date filter (e.g., gte2026-08-01T00:00:00Z)' }
    ],
    sampleResponse: {
      limit: 20,
      offset: 0,
      total: 2,
      list: [
        {
          transactionId: 'tx_mtu_1782910381',
          productType: 'TOPUP',
          status: 'DONE',
          amount: 500,
          currency: 'USD',
          currencyDivisor: 100,
          createdAt: '2026-08-02T14:10:00Z'
        },
        {
          transactionId: 'tx_esim_17290128',
          productType: 'ESIM',
          status: 'DONE',
          amount: 450,
          currency: 'USD',
          currencyDivisor: 100,
          createdAt: '2026-08-03T02:22:00Z'
        }
      ]
    }
  },

  // Promotions
  {
    id: 'zendit-list-promos',
    provider: 'zendit',
    category: 'promos',
    name: 'List Active Promotions',
    method: 'GET',
    path: '/promos',
    description: 'Retrieve active carrier promotional bonuses, multipliers, and bonus data campaigns.',
    requiresBody: false,
    queryParams: [
      { name: '_limit', type: 'number', required: true, default: '10', description: 'Limit' },
      { name: '_offset', type: 'number', required: true, default: '0', description: 'Offset' },
      { name: 'country', type: 'string', required: false, description: 'Country code filter' },
      { name: 'status', type: 'string', required: false, default: 'active', description: 'active, pending, expired' }
    ],
    sampleResponse: {
      limit: 10,
      offset: 0,
      total: MOCK_PROMOS.length,
      list: MOCK_PROMOS
    }
  },

  // Reports
  {
    id: 'zendit-generate-report',
    provider: 'zendit',
    category: 'reports',
    name: 'Generate CSV Transaction Report',
    method: 'POST',
    path: '/reports/transactions',
    description: 'Request an asynchronous CSV download report for transactions within a specified UTC date range.',
    requiresBody: true,
    defaultPayload: {
      startGte: '2026-08-01T00:00:00Z',
      endLt: '2026-08-03T00:00:00Z'
    },
    sampleResponse: {
      reportId: 'rpt_991204',
      status: 'READY',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      file: {
        name: 'transactions_20260801_20260803.csv',
        downloadUrl: 'https://api.zendit.io/v1/reports/transactions/rpt_991204/transactions_20260801_20260803.csv'
      },
      log: [
        { message: 'Report requested', recordedAt: new Date().toISOString(), status: 'REQUESTED' },
        { message: 'Report generation finished', recordedAt: new Date().toISOString(), status: 'READY' }
      ]
    }
  }
];
