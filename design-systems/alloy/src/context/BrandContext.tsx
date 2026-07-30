import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { BRANDS, BRAND_STORAGE_KEY, isBrand, type Brand } from './brand-constants'

type BrandContextValue = {
  brand: Brand
  setBrand: (b: Brand) => void
  BRANDS: readonly Brand[]
}

const BrandContext = createContext<BrandContextValue | null>(null)

export function BrandProvider({ children }: { children: ReactNode }) {
  // useState(init) reads localStorage exactly once on mount. External storage
  // changes won't be reflected until remount — matches current behavior.
  const [brand, setBrand] = useState<Brand>(() => {
    const stored = localStorage.getItem(BRAND_STORAGE_KEY)
    return isBrand(stored) ? stored : 'chevrolet'
  })

  useEffect(() => {
    document.documentElement.dataset.brand = brand
    localStorage.setItem(BRAND_STORAGE_KEY, brand)
  }, [brand])

  return (
    <BrandContext.Provider value={{ brand, setBrand, BRANDS }}>
      {children}
    </BrandContext.Provider>
  )
}

export function useBrand(): BrandContextValue {
  const ctx = useContext(BrandContext)
  if (!ctx) throw new Error('useBrand must be used inside <BrandProvider>')
  return ctx
}
