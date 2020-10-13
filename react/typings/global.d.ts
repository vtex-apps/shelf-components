import { FunctionComponent } from 'react'

declare global {
  interface StorefrontFunctionComponent<P = {}> extends FunctionComponent<P> {
    schema?: object
    getSchema?(props?: P): object
  }

  interface Product {
    brand: string
    brandId: number
    cacheId: string
    categories: string[]
    categoryTree?: Array<{ slug: string }>
    description?: string
    items: SKU[]
    link: string
    linkText: string
    priceRange: ProductPriceRange
    productId: string
    productName: string
    productReference: string
    sku?: SKU
    specificationGroups: SpecificationGroup[]
  }

  interface ProductPriceRange {
    sellingPrice: PriceRange
    listPrice: PriceRange
  }

  interface PriceRange {
    highPrice: number
    lowPrice: number
  }

  interface SpecificationGroupProperty {
    originalName: string
    name: string
    values: string[]
  }

  interface SpecificationGroup {
    name?: string
    originalName?: string
    specifications?: SpecificationGroupProperty[]
  }

  interface Item {
    quantity: number
    product: Product
    selectedItem: SKU
  }

  interface CartItem {
    id: string
    productId: string
    quantity: number
    uniqueId: string
    detailUrl: string
    name: string
    brand: string
    category: string
    productRefId: string
    seller: string
    variant: string
    skuName: string
    price: number
    listPrice: number
    sellingPrice: number
    sellingPriceWithAssemblies: number
    measurementUnit: string
    skuSpecifications: any[]
    imageUrl: string
    options: any[]
    assemblyOptions: {
      added: any[]
      removed: any[]
      parentPrice: number
    }
    referenceId: Array<{
      Key: string
      Value: string
    }> | null
  }

  interface SKU {
    ean?: string
    images: Array<{
      imageId?: string
      imageLabel: string
      imageTag?: string
      imageUrl: string
      imageText?: string
    }>
    itemId: string
    measurementUnit: string
    name: string
    nameComplete?: string
    unitMultiplier?: number
    seller?: Seller
    sellers: Seller[]
    referenceId: Array<{
      Key: string
      Value: string
    }> | null
    variations: Array<{ name: string; values: string[] }>
  }

  interface Seller {
    addToCartLink?: string
    commertialOffer: CommertialOffer
    sellerId: string
    sellerDefault?: boolean
    sellerName?: string
  }

  interface CommertialOffer {
    AvailableQuantity: number
    Installments: Installment[]
    ListPrice: number
    Price: number
    PriceWithoutDiscount: number
    Tax: number
    taxPercentage: number
  }

  interface Installment {
    InterestRate: number
    Name: string
    NumberOfInstallments: number
    TotalValuePlusInterestRate: number
    Value: number
  }

  interface SpecificationFilter {
    id: string
    value: string
  }

  interface SuggestedProductsList {
    baseProductId: string
    suggestedProductsIds?: string
    category?: string
    specificationFilters?: SpecificationFilter[]
    collection?: string
    orderBy?: string
    hideUnavailableItems?: boolean
    maxItems?: number
    skusFilter?: string
    installmentCriteria?: string
  }

  interface RecommendedList {
    base: Product[]
    recommended: Product[]
  }

  interface SuggestedList {
    products: Product[]
    hidden: boolean
    current: number
  }
}
