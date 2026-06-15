export type Language = 'RU' | 'KG';

export type ProductType = 'all' | 'fresh' | 'dried' | 'wholesale';

export interface Product {
  id: string;
  nameKg: string;
  nameRu: string;
  descriptionKg: string;
  descriptionRu: string;
  price: number; // in Kyrgyz Soms (KGS)
  wholesalePrice?: number; // wholesale price per unit/kg (for orders above min wholesale qty)
  minWholesaleQty?: number; // minimum quantity to get wholesale price
  volumeKg: string; // e.g. "1 л", "500 г"
  volumeRu: string; // e.g. "1 л", "500 г"
  category: 'fresh' | 'dried' | 'butter';
  isWholesaleAvailable: boolean;
  image: string; // image path or fallback SVG/gradient
  rating: number; // e.g. 4.9
  availability: 'in_stock' | 'limited' | 'out_of_stock';
}

export interface CartItem {
  product: Product;
  quantity: number;
  isWholesaleOrder: boolean; // whether individual item meets wholesale minimums and gets bulk pricing
}

export interface WholesaleInquiry {
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  productInterest: string;
  quantity: string;
  message?: string;
}

export interface Dictionary {
  // Navigation & General
  brandName: string;
  brandTagline: string;
  main: string;
  products: string;
  aboutUs: string;
  forWholesalers: string;
  contacts: string;
  phoneNum: string;
  cart: string;
  emptyCart: string;
  checkout: string;
  currency: string;
  total: string;
  addToCart: string;
  added: string;
  wholesaleBadge: string;
  minQty: string;
  somSymbol: string;
  subtotal: string;
  wholesaleDiscount: string;

  // Hero Section
  heroTitle: string;
  heroSub: string;
  buyNow: string;
  wholesaleCta: string;

  // Filters
  filterAll: string;
  filterFresh: string;
  filterDried: string;
  filterWholesale: string;

  // Product Categories
  catFresh: string;
  catDried: string;
  catButter: string;

  // About Section
  aboutTitle: string;
  aboutSubtitle: string;
  aboutTextParagraph1: string;
  aboutTextParagraph2: string;
  aboutTextParagraph3: string;
  valueNatural: string;
  valueNaturalDesc: string;
  valueTraditional: string;
  valueTraditionalDesc: string;
  valueQuality: string;
  valueQualityDesc: string;

  // Wholesale Section
  wholesaleTitle: string;
  wholesaleSubtitle: string;
  wholesaleBenefit1: string;
  wholesaleBenefit1Desc: string;
  wholesaleBenefit2: string;
  wholesaleBenefit2Desc: string;
  wholesaleBenefit3: string;
  wholesaleBenefit3Desc: string;
  formCompanyName: string;
  formContactName: string;
  formPhone: string;
  formEmail: string;
  formProductInterest: string;
  formQuantity: string;
  formMessage: string;
  formSubmit: string;
  formSuccessMessage: string;
  contactManager: string;

  // Payment Section
  paymentTitle: string;
  paymentSubtitle: string;
  paymentMbank: string;
  paymentOptima: string;
  paymentVisa: string;
  paymentCash: string;
  paymentSubmit: string;
  paymentDemoSuccess: string;

  // Contact Detail Section
  contactsTitle: string;
  contactsSubtitle: string;
  contactAddress: string;
  contactAddressText: string;
  contactPhone: string;
  contactHours: string;
  contactHoursText: string;
  findUsOnMap: string;

  // Chatbot Widget
  botGreeting: string;
  botAskPrices: string;
  botAskWholesale: string;
  botWhereToBuy: string;
  botResponsePrices: string;
  botResponseWholesale: string;
  botResponseWhereToBuy: string;
  chatPlaceholder: string;
  chatSend: string;

  // Footer & Copy
  allRightsReserved: string;
}
