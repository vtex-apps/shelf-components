declare module 'vtex.product-summary/ProductSummaryCustom' {
  export const mapCatalogProductToProductSummary: (product: any) => any
}

declare module 'vtex.product-summary' {
  export const ProductSummaryList
  export const ProductSummaryListWithoutQuery
}
