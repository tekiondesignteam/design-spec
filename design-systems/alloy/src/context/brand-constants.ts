export const BRAND_STORAGE_KEY = 'drp-brand'
export const BRANDS = ['chevrolet', 'buick', 'gmc', 'cadillac'] as const
export type Brand = typeof BRANDS[number]

export function isBrand(v: unknown): v is Brand {
  return typeof v === 'string' && (BRANDS as readonly string[]).includes(v)
}
