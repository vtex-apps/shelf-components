import React from 'react'
import {
  ProductSummaryList,
  ProductSummaryListWithoutQuery,
} from 'vtex.product-summary'

interface ShelfProps {
  children: any
  products?: any[]
  category?: string
  specificationFilters?: Array<{ id: string; value: string }>
  collection?: string
  orderBy?: string
  hideUnavailableItems?: boolean
  maxItems?: number
  skusFilter?: string
  installmentCriteria?: string
}

const Shelf: StorefrontFunctionComponent<ShelfProps> = ({
  children,
  products,
  ...props
}) => {
  if (products) {
    return (
      <ProductSummaryListWithoutQuery products={products}>
        {children}
      </ProductSummaryListWithoutQuery>
    )
  }
  return <ProductSummaryList {...props}>{children}</ProductSummaryList>
}

Shelf.schema = {
  title: 'admin/editor.shelf.title',
}

export default Shelf
