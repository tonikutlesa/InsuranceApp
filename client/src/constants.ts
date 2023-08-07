export const API_URL = import.meta.env.VITE_API_URL || '';

export const DISCOUNTS = {
  COMMERCIAL_DISCOUNT: 'Commercial discount',
  ADVISER_DISCOUNT: 'Adviser discount',
  VIP_DISCOUNT: 'VIP discount'
};

export const SURCHARGES = {
  STRONG_CAR_SURCHARGE: 'Strong car surcharge'
};

export const COVERAGES = {
  BONUS_PROTECTION: 'Bonus protection',
  AO_PLUS: 'AO+',
  GLASS_PROTECTION: 'Glass protection'
};

export const DISCOUNT_CHECKBOX_LABELS = [{ label: DISCOUNTS.COMMERCIAL_DISCOUNT }, { label: DISCOUNTS.ADVISER_DISCOUNT }, { label: DISCOUNTS.VIP_DISCOUNT }];
export const SURCHARGE_CHECKBOX_LABELS = [{ label: SURCHARGES.STRONG_CAR_SURCHARGE }];
export const COVERAGE_CHECKBOX_LABELS = [{ label: COVERAGES.BONUS_PROTECTION }, { label: COVERAGES.AO_PLUS }, { label: COVERAGES.GLASS_PROTECTION }];
