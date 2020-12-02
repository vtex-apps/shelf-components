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
    categories?: string[]
    clusterHighlights?: Array<{ id: string; name: string }>
    categoryTree?: Array<{ slug: string }>
    description?: string
    items: SKU[]
    link: string
    linkText: string
    priceRange: ProductPriceRange
    productClusters?: Array<{ id: string; name: string }>
    productId: string
    productName: string
    productReference: string
    properties?: Array<{ name: string; values: string[] }>
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
    complementName?: string
    ean?: string
    image?: Image
    images: Image[]
    itemId: string
    measurementUnit: string
    name: string
    nameComplete?: string
    referenceId: Array<{
      Key: string
      Value: string
    }> | null
    seller?: Seller
    sellers: Seller[]
    unitMultiplier?: number
    variations: Array<{ name: string; values: string[] }>
  }

  interface Image {
    cacheId?: string
    imageId?: string
    imageLabel: string | null
    imageTag?: string
    imageUrl: string
    imageText?: string | null
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
    RewardValue?: number
    Tax: number
    discountHighlights?: Array<{ name: string }>
    spotPrice?: number
    taxPercentage: number
    teasers?: Array<{ name: string }>
  }

  interface Installment {
    InterestRate: number
    Name: string
    NumberOfInstallments: number
    PaymentSystemName?: string
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
