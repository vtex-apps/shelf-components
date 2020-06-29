import React from 'react'
import {
  ProductSummaryList,
  ProductSummaryListWithQuery,
} from 'vtex.product-summary'

interface ShelfProps {
  children: any
  products?: any[]
  category?: string
  specificationFilters?: any[]
  collection?: string
  orderBy?: string
  hideUnavailableItems?: boolean
  maxItems?: number
  skusFilter?: string
  installmentCriteria?: string
}

const ORDER_BY_OPTIONS: Array<{ name: string; value: string }> = [
  {
    name: 'admin/editor.productSummaryList.orderType.relevance',
    value: 'OrderByScoreDESC',
  },
  {
    name: 'admin/editor.productSummaryList.orderType.sales',
    value: 'OrderByTopSaleDESC',
  },
  {
    name: 'admin/editor.productSummaryList.orderType.priceDesc',
    value: 'OrderByPriceDESC',
  },
  {
    name: 'admin/editor.productSummaryList.orderType.priceAsc',
    value: 'OrderByPriceASC',
  },
  {
    name: 'admin/editor.productSummaryList.orderType.nameAsc',
    value: 'OrderByNameASC',
  },
  {
    name: 'admin/editor.productSummaryList.orderType.nameDesc',
    value: 'OrderByNameDESC',
  },
  {
    name: 'admin/editor.productSummaryList.orderType.releaseDate',
    value: 'OrderByReleaseDateDESC',
  },
  {
    name: 'admin/editor.productSummaryList.orderType.discount',
    value: 'OrderByBestDiscountDESC',
  },
]

function getOrdinationProp(attribute: string) {
  if (attribute === 'value') {
    return ORDER_BY_OPTIONS.map(option => option.value)
  }
  return ORDER_BY_OPTIONS.map(option => option.name)
}

const Shelf: StorefrontFunctionComponent<ShelfProps> = ({
  children,
  products,
  ...props
}) => {
  if (products) {
    return (
      <ProductSummaryList products={products}>{children}</ProductSummaryList>
    )
  }
  return (
    <ProductSummaryListWithQuery {...props}>
      {children}
    </ProductSummaryListWithQuery>
  )
}

Shelf.getSchema = () => ({
  title: 'admin/editor.shelf.title',
  description: 'admin/editor.shelf.description',
  type: 'object',
  properties: {
    category: {
      title: 'admin/editor.productSummaryList.category.title',
      description: 'admin/editor.productSummaryList.category.description',
      type: 'string',
      isLayout: false,
    },
    specificationFilters: {
      title: 'admin/editor.productSummaryList.specificationFilters.title',
      type: 'array',
      items: {
        title:
          'admin/editor.productSummaryList.specificationFilters.item.title',
        type: 'object',
        properties: {
          id: {
            type: 'string',
            title:
              'admin/editor.productSummaryList.specificationFilters.item.id.title',
          },
          value: {
            type: 'string',
            title:
              'admin/editor.productSummaryList.specificationFilters.item.value.title',
          },
        },
      },
    },
    collection: {
      title: 'admin/editor.productSummaryList.collection.title',
      type: 'string',
      isLayout: false,
    },
    orderBy: {
      title: 'admin/editor.productSummaryList.orderBy.title',
      type: 'string',
      enum: getOrdinationProp('value'),
      enumNames: getOrdinationProp('name'),
      default: ORDER_BY_OPTIONS[1].value,
      isLayout: false,
    },
    hideUnavailableItems: {
      title: 'admin/editor.productSummaryList.hideUnavailableItems',
      type: 'boolean',
      default: false,
      isLayout: false,
    },
    maxItems: {
      title: 'admin/editor.productSummaryList.maxItems.title',
      type: 'number',
      isLayout: false,
      default: 10,
    },
    skusFilter: {
      title: 'admin/editor.productSummaryList.skusFilter.title',
      description: 'admin/editor.productSummaryList.skusFilter.description',
      type: 'string',
      default: 'ALL_AVAILABLE',
      enum: ['ALL_AVAILABLE', 'ALL', 'FIRST_AVAILABLE'],
      enumNames: [
        'admin/editor.productSummaryList.skusFilter.all-available',
        'admin/editor.productSummaryList.skusFilter.none',
        'admin/editor.productSummaryList.skusFilter.first-available',
      ],
    },
    installmentCriteria: {
      title: 'admin/editor.productSummaryList.installmentCriteria.title',
      description:
        'admin/editor.productSummaryList.installmentCriteria.description',
      type: 'string',
      default: 'MAX_WITHOUT_INTEREST',
      enum: ['MAX_WITHOUT_INTEREST', 'MAX_WITH_INTEREST'],
      enumNames: [
        'admin/editor.productSummaryList.installmentCriteria.max-without-interest',
        'admin/editor.productSummaryList.installmentCriteria.max-with-interest',
      ],
    },
  },
})

export default Shelf
