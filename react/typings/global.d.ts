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
    items: SKU[]
    link: string
    linkText: string
    priceRange: ProductPriceRange
    productId: string
    productName: string
    productReference: string
    sku?: SKU
    specificationGroups: any[]
  }

  interface Item {
    product: Product
    selectedItem: SKU
  }

  interface SKU {
    ean: string
    images: Array<{
      imageId: string
      imageLabel: string
      imageTag: string
      imageUrl: string
      imageText: string
    }>
    itemId: string
    measurementUnit: string
    name: string
    nameComplete: string
    seller?: Seller
    sellers: Seller[]
    referenceId: Array<{
      Key: string
      Value: string
    }> | null
  }

  interface Seller {
    addToCartLink: string
    commertialOffer: CommertialOffer
    sellerId: string
    sellerDefault: boolean
    sellerName: string
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
}
