import { GiftbitBrand, GiftbitRegion, GiftbitFundBalance, GiftbitGift, EndpointDefinition } from '../types';

export const MOCK_BRANDS: GiftbitBrand[] = [
  {
    brand_code: 'amazonus',
    name: 'Amazon.com Gift Card',
    currency: 'USD',
    image_url: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=300&q=80',
    min_price_in_cents: 100,
    max_price_in_cents: 200000,
    allowed_regions: ['US'],
    is_variable_price: true,
    terms: 'Treat this card like cash. Cannot be redeemed for cash except as required by law.',
    disclaimer: 'Amazon.com is not a sponsor of this promotion.'
  },
  {
    brand_code: 'starbucksus',
    name: 'Starbucks eGift Card',
    currency: 'USD',
    image_url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=300&q=80',
    min_price_in_cents: 500,
    max_price_in_cents: 50000,
    allowed_prices_in_cents: [500, 1000, 1500, 2500, 5000, 10000],
    allowed_regions: ['US', 'CA'],
    is_variable_price: false,
    terms: 'Valid at participating Starbucks locations. Cannot be reloaded.',
    disclaimer: 'Starbucks is a registered trademark of Starbucks Corporation.'
  },
  {
    brand_code: 'appleus',
    name: 'Apple Gift Card',
    currency: 'USD',
    image_url: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=300&q=80',
    min_price_in_cents: 1000,
    max_price_in_cents: 500000,
    allowed_regions: ['US'],
    is_variable_price: true,
    terms: 'For use on Apple products, accessories, apps, games, music, movies, TV shows, and iCloud+.',
    disclaimer: 'Apple is not a participant in or sponsor of this promotion.'
  },
  {
    brand_code: 'targetus',
    name: 'Target GiftCard',
    currency: 'USD',
    image_url: 'https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?auto=format&fit=crop&w=300&q=80',
    min_price_in_cents: 500,
    max_price_in_cents: 100000,
    allowed_regions: ['US'],
    is_variable_price: true,
    terms: 'Redeemable in stores and online at Target.com.',
    disclaimer: 'The Bullseye Design and Target GiftCard are registered trademarks of Target Brands, Inc.'
  },
  {
    brand_code: 'ubereatsus',
    name: 'Uber Eats Gift Card',
    currency: 'USD',
    image_url: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=300&q=80',
    min_price_in_cents: 1500,
    max_price_in_cents: 20000,
    allowed_regions: ['US'],
    is_variable_price: true,
    terms: 'Valid for food and grocery delivery via Uber Eats app.',
    disclaimer: 'Uber is not a sponsor.'
  },
  {
    brand_code: 'sephoraus',
    name: 'Sephora eGift Card',
    currency: 'USD',
    image_url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=300&q=80',
    min_price_in_cents: 1000,
    max_price_in_cents: 25000,
    allowed_regions: ['US', 'CA'],
    is_variable_price: true,
    terms: 'Redeemable for merchandise sold at Sephora stores and online.',
    disclaimer: 'Sephora USA, Inc. all rights reserved.'
  },
  {
    brand_code: 'nikeus',
    name: 'Nike Gift Card',
    currency: 'USD',
    image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80',
    min_price_in_cents: 2500,
    max_price_in_cents: 50000,
    allowed_regions: ['US'],
    is_variable_price: true,
    terms: 'Redeemable at Nike.com, Converse.com, and Nike-owned retail stores.',
    disclaimer: 'Nike, Inc.'
  },
  {
    brand_code: 'walmartus',
    name: 'Walmart eGift Card',
    currency: 'USD',
    image_url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=300&q=80',
    min_price_in_cents: 500,
    max_price_in_cents: 100000,
    allowed_regions: ['US'],
    is_variable_price: true,
    terms: 'Redeemable at Walmart.com and Sam\'s Club.',
    disclaimer: 'Walmart is not affiliated with this incentive.'
  }
];

export const MOCK_REGIONS: GiftbitRegion[] = [
  { code: 'US', name: 'United States', currency: 'USD' },
  { code: 'CA', name: 'Canada', currency: 'CAD' },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP' },
  { code: 'EU', name: 'European Union', currency: 'EUR' },
  { code: 'AU', name: 'Australia', currency: 'AUD' }
];

export const MOCK_FUND_BALANCES: GiftbitFundBalance[] = [
  { currency: 'USD', available_in_cents: 250000, reserved_in_cents: 0 },
  { currency: 'CAD', available_in_cents: 75000, reserved_in_cents: 0 }
];

export const MOCK_GIFTS: GiftbitGift[] = [
  {
    id: 'gft_99182',
    supplied_id: 'campaign_order_1001',
    brand_code: 'amazonus',
    brand_name: 'Amazon.com Gift Card',
    price_in_cents: 2500,
    currency: 'USD',
    recipient_email: 'alex.smith@example.com',
    delivery_type: 'EMAIL',
    status: 'DELIVERED',
    created_date: '2026-08-01T14:22:00Z',
    claim_url: 'https://giftbit.com/claim/gft_99182_a82k',
    card_code: 'AMZN-8839-1092-4910',
    pin: '9012'
  },
  {
    id: 'gft_99183',
    supplied_id: 'direct_link_batch_50',
    brand_code: 'starbucksus',
    brand_name: 'Starbucks eGift Card',
    price_in_cents: 1000,
    currency: 'USD',
    delivery_type: 'DIRECT_LINK',
    status: 'UNCLAIMED',
    created_date: '2026-08-02T09:15:30Z',
    claim_url: 'https://giftbit.com/claim/dl_99183_sbx',
    card_code: 'SBX-4019-3382-1920',
    pin: '1284'
  },
  {
    id: 'gft_99184',
    supplied_id: 'in_app_reward_user_88',
    brand_code: 'targetus',
    brand_name: 'Target GiftCard',
    price_in_cents: 5000,
    currency: 'USD',
    delivery_type: 'EMBEDDED',
    status: 'CLAIMED',
    created_date: '2026-08-02T16:40:11Z',
    claim_url: 'https://giftbit.com/embed/emb_99184_tgt',
    card_code: 'TGT-9018-2234-7711',
    pin: '7721'
  }
];

export const ENDPOINT_DEFINITIONS: EndpointDefinition[] = [
  // Ping
  {
    id: 'ping',
    provider: 'giftbit',
    category: 'system',
    name: 'Ping API Health',
    method: 'GET',
    path: '/ping',
    description: 'Test your authentication credentials and verify API connectivity and server health.',
    requiresBody: false,
    sampleResponse: {
      status: 200,
      ping: 'pong',
      environment: 'testbed',
      timestamp: '2026-08-03T03:19:34Z'
    }
  },

  // Brands
  {
    id: 'list-brands',
    provider: 'giftbit',
    category: 'brands',
    name: 'List Brands',
    method: 'GET',
    path: '/brands',
    description: 'Returns available reward brands with pricing limits, allowed regions, and brand codes.',
    requiresBody: false,
    queryParams: [
      { name: 'price_in_cents', type: 'number', required: false, description: 'Filter brands available at this exact price in cents (e.g., 2500)' },
      { name: 'currency', type: 'string', required: false, default: 'USD', description: 'Filter by currency code (USD, CAD, GBP, EUR)' },
      { name: 'region', type: 'string', required: false, default: 'US', description: 'Filter by region code (US, CA, GB, EU)' },
      { name: 'search', type: 'string', required: false, description: 'Search brand names or codes (e.g. amazon)' },
      { name: 'limit', type: 'number', required: false, default: '20', description: 'Number of results per page' },
      { name: 'offset', type: 'number', required: false, default: '0', description: 'Pagination offset' }
    ],
    sampleResponse: {
      status: 200,
      brands: MOCK_BRANDS.slice(0, 4),
      total_count: MOCK_BRANDS.length,
      limit: 20,
      offset: 0
    }
  },
  {
    id: 'get-brand-by-code',
    provider: 'giftbit',
    category: 'brands',
    name: 'Get Brand Details',
    method: 'GET',
    path: '/brands/{brand_code}',
    description: 'Retrieve extended brand details including terms of service and pricing tiers.',
    requiresBody: false,
    pathParams: [
      { name: 'brand_code', description: 'Unique Giftbit brand code (e.g., amazonus, starbucksus)', placeholder: 'amazonus' }
    ],
    sampleResponse: {
      status: 200,
      brand: MOCK_BRANDS[0]
    }
  },

  // Regions
  {
    id: 'list-regions',
    provider: 'giftbit',
    category: 'brands',
    name: 'List Regions',
    method: 'GET',
    path: '/regions',
    description: 'List geographic regions available for catalog filtering and full-catalog orders.',
    requiresBody: false,
    sampleResponse: {
      status: 200,
      regions: MOCK_REGIONS
    }
  },

  // Email Orders
  {
    id: 'create-email-order',
    provider: 'giftbit',
    category: 'email_orders',
    name: 'Create Email Order',
    method: 'POST',
    path: '/campaign',
    description: 'Places an order for digital gift cards delivered directly to recipient emails by Giftbit.',
    requiresBody: true,
    defaultPayload: {
      supplied_id: 'order_emp_bonus_' + Math.floor(1000 + Math.random() * 9000),
      delivery_type: 'EMAIL',
      subject: 'Congratulations on your work anniversary!',
      message: 'Thank you for your dedication and hard work! Enjoy your reward card.',
      price_in_cents: 2500,
      brand_codes: ['amazonus', 'starbucksus', 'targetus'],
      contacts: [
        {
          email: 'recipient@example.com',
          firstname: 'Jane',
          lastname: 'Doe'
        }
      ],
      expiry: '2026-12-31'
    },
    sampleResponse: {
      status: 200,
      campaign: {
        id: 'cmp_882910',
        supplied_id: 'order_emp_bonus_1042',
        delivery_type: 'EMAIL',
        created_date: '2026-08-03T03:20:00Z',
        total_price_in_cents: 2500,
        currency: 'USD',
        status: 'PROCESSING',
        contacts_count: 1,
        brand_codes: ['amazonus', 'starbucksus', 'targetus']
      }
    }
  },
  {
    id: 'get-order-by-id',
    provider: 'giftbit',
    category: 'email_orders',
    name: 'Get Campaign Order',
    method: 'GET',
    path: '/campaign/{id}',
    description: 'Retrieve current status and recipient fulfillment metrics for an existing campaign order.',
    requiresBody: false,
    pathParams: [
      { name: 'id', description: 'Campaign ID or supplied_id', placeholder: 'cmp_882910' }
    ],
    sampleResponse: {
      status: 200,
      campaign: {
        id: 'cmp_882910',
        supplied_id: 'order_emp_bonus_1042',
        delivery_type: 'EMAIL',
        status: 'COMPLETED',
        created_date: '2026-08-03T03:20:00Z',
        total_price_in_cents: 2500,
        delivered_count: 1,
        claimed_count: 0
      }
    }
  },

  // Shortlinks
  {
    id: 'create-shortlink-order',
    provider: 'giftbit',
    category: 'shortlinks',
    name: 'Create Shortlink Order',
    method: 'POST',
    path: '/campaign',
    description: 'Generate customizable landing page reward shortlinks for delivery via SMS, custom email, or internal chat.',
    requiresBody: true,
    defaultPayload: {
      supplied_id: 'shortlink_promo_' + Math.floor(1000 + Math.random() * 9000),
      delivery_type: 'SHORTLINK',
      message: 'Thanks for participating in our survey! Click below to choose your gift card.',
      price_in_cents: 1500,
      brand_codes: ['starbucksus', 'sephoraus'],
      contacts: [
        {
          email: 'user.test@example.com',
          firstname: 'Sam'
        }
      ]
    },
    sampleResponse: {
      status: 200,
      campaign: {
        id: 'cmp_short_77391',
        supplied_id: 'shortlink_promo_8492',
        delivery_type: 'SHORTLINK',
        status: 'READY',
        total_price_in_cents: 1500,
        link_count: 1
      }
    }
  },
  {
    id: 'get-link-urls',
    provider: 'giftbit',
    category: 'shortlinks',
    name: 'Retrieve Link URLs',
    method: 'GET',
    path: '/links/{id}',
    description: 'Retrieves generated URLs for Shortlink or Direct Link orders.',
    requiresBody: false,
    pathParams: [
      { name: 'id', description: 'Order Campaign ID or Direct Link ID', placeholder: 'cmp_short_77391' }
    ],
    sampleResponse: {
      status: 200,
      links: [
        {
          id: 'lnk_99182',
          url: 'https://giftbit.com/claim/sl_77391_x91',
          status: 'READY',
          price_in_cents: 1500,
          recipient_email: 'user.test@example.com'
        }
      ]
    }
  },

  // Direct Links
  {
    id: 'create-direct-link',
    provider: 'giftbit',
    category: 'direct_links',
    name: 'Create Direct Links',
    method: 'POST',
    path: '/direct_links',
    description: 'Instantly generate direct links bypassing custom landing pages for immediate distribution.',
    requiresBody: true,
    defaultPayload: {
      supplied_id: 'direct_batch_' + Math.floor(1000 + Math.random() * 9000),
      price_in_cents: 2000,
      brand_codes: ['amazonus'],
      link_count: 2,
      expiry: '2026-11-30'
    },
    sampleResponse: {
      status: 200,
      direct_links: [
        {
          id: 'dl_10293_1',
          url: 'https://giftbit.com/claim/dl_10293_1_amz',
          price_in_cents: 2000,
          brand_code: 'amazonus',
          status: 'UNCLAIMED',
          expiry: '2026-11-30'
        },
        {
          id: 'dl_10293_2',
          url: 'https://giftbit.com/claim/dl_10293_2_amz',
          price_in_cents: 2000,
          brand_code: 'amazonus',
          status: 'UNCLAIMED',
          expiry: '2026-11-30'
        }
      ]
    }
  },

  // Embedded Rewards
  {
    id: 'create-embedded-reward',
    provider: 'giftbit',
    category: 'embedded',
    name: 'Create Embedded Reward',
    method: 'POST',
    path: '/embedded',
    description: 'Instant single-brand reward order for in-app reveal. Returns immediate card code, PIN, and claim URL.',
    requiresBody: true,
    defaultPayload: {
      supplied_id: 'inapp_claim_' + Math.floor(1000 + Math.random() * 9000),
      price_in_cents: 5000,
      brand_code: 'amazonus'
    },
    sampleResponse: {
      status: 200,
      embedded: {
        id: 'emb_551920',
        supplied_id: 'inapp_claim_4819',
        price_in_cents: 5000,
        currency: 'USD',
        brand_code: 'amazonus',
        brand_name: 'Amazon.com Gift Card',
        claim_url: 'https://giftbit.com/embed/emb_551920_amz',
        card_code: 'AMZN-9912-4029-7811',
        pin: '4410',
        status: 'CLAIMED'
      }
    }
  },

  // Funds
  {
    id: 'get-funds',
    provider: 'giftbit',
    category: 'funds',
    name: 'Get Account Funds',
    method: 'GET',
    path: '/funds',
    description: 'Retrieve real-time account balances and currency breakdown.',
    requiresBody: false,
    sampleResponse: {
      status: 200,
      funds: {
        USD: { available_in_cents: 250000, reserved_in_cents: 0 },
        CAD: { available_in_cents: 75000, reserved_in_cents: 0 }
      }
    }
  },
  {
    id: 'add-funds',
    provider: 'giftbit',
    category: 'funds',
    name: 'Add Funds (Credit Card)',
    method: 'POST',
    path: '/funds',
    description: 'Top up virtual balance or charge credit card on file in Testbed/Production.',
    requiresBody: true,
    defaultPayload: {
      currency: 'USD',
      amount_in_cents: 100000
    },
    sampleResponse: {
      status: 200,
      message: 'Funds added successfully',
      updated_funds: {
        USD: { available_in_cents: 350000, reserved_in_cents: 0 },
        CAD: { available_in_cents: 75000, reserved_in_cents: 0 }
      }
    }
  },

  // Rewards Management
  {
    id: 'list-gifts',
    provider: 'giftbit',
    category: 'rewards',
    name: 'List Reward Gifts',
    method: 'GET',
    path: '/gifts',
    description: 'Retrieve details, claim statuses, and resend history for previously ordered rewards.',
    requiresBody: false,
    queryParams: [
      { name: 'status', type: 'string', required: false, description: 'Filter status (UNCLAIMED, DELIVERED, CLAIMED, CANCELLED)' },
      { name: 'limit', type: 'number', required: false, default: '20', description: 'Max records returned' }
    ],
    sampleResponse: {
      status: 200,
      gifts: MOCK_GIFTS,
      count: MOCK_GIFTS.length
    }
  },
  {
    id: 'get-gift-by-id',
    provider: 'giftbit',
    category: 'rewards',
    name: 'Get Reward Gift Detail',
    method: 'GET',
    path: '/gifts/{id}',
    description: 'Fetch detailed single reward gift status and delivery log.',
    requiresBody: false,
    pathParams: [
      { name: 'id', description: 'Unique Gift ID', placeholder: 'gft_99182' }
    ],
    sampleResponse: {
      status: 200,
      gift: MOCK_GIFTS[0]
    }
  },
  {
    id: 'resend-gift',
    provider: 'giftbit',
    category: 'rewards',
    name: 'Resend Email Reward',
    method: 'POST',
    path: '/gifts/{id}/resend',
    description: 'Trigger another email delivery attempt for a gift delivered by Giftbit.',
    requiresBody: false,
    pathParams: [
      { name: 'id', description: 'Gift ID to resend', placeholder: 'gft_99182' }
    ],
    sampleResponse: {
      status: 200,
      success: true,
      message: 'Gift resend triggered successfully'
    }
  },
  {
    id: 'cancel-gift',
    provider: 'giftbit',
    category: 'rewards',
    name: 'Cancel Unredeemed Reward',
    method: 'POST',
    path: '/gifts/{id}/cancel',
    description: 'Cancel an unclaimed reward and refund the gift value back to your account balance.',
    requiresBody: false,
    pathParams: [
      { name: 'id', description: 'Unclaimed Gift ID to cancel', placeholder: 'gft_99183' }
    ],
    sampleResponse: {
      status: 200,
      success: true,
      message: 'Reward cancelled successfully',
      refunded_in_cents: 1000
    }
  }
];
