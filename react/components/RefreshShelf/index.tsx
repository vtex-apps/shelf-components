import React, { useState, useEffect } from 'react'
import { useLazyQuery } from 'react-apollo'
import { QueryProducts as productsQuery } from 'vtex.store-resources'

import productsByIdentifier from '../../queries/productsByIdentifier.gql'
import RefreshProductSummary from './RefreshProductSummary'
import SuggestedProducts from './SuggestedProducts'
import styles from './styles.css'

interface SpecificationFilter {
  id: string
  value: string
}

enum ProductUniqueIdentifierField {
  id,
  slug,
  ean,
  reference,
  sku,
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

interface RefreshShelfProps {
  baseProductTitle?: string
  suggestedProductsTitle?: string
  suggestedLists?: SuggestedProductsList[]
  baseProducts?: string[]
  recommendedProducts?: any[]
  sliderLayout: {
    showNavigationArrows: string
    showPaginationDots: string
  }
}

const parseFilters = ({ id, value }: SpecificationFilter) =>
  `specificationFilter_${id}:${value}`

const RefreshShelf: StorefrontFunctionComponent<RefreshShelfProps> = ({
  baseProductTitle,
  suggestedProductsTitle,
  suggestedLists,
  ...props
}) => {
  const [current, setCurrent] = useState(0)
  const [queryProducts, { data: productsData, loading }] = useLazyQuery(
    productsQuery
  )

  const [queryBaseProductsByID, { data: baseProductsData }] = useLazyQuery(
    productsByIdentifier
  )

  const [
    querySuggestedProductsByID,
    { data: suggestedProductsData },
  ] = useLazyQuery(productsByIdentifier)

  const [suggestedProducts, setSuggestedProducts] = useState(
    suggestedProductsData?.products ?? productsData?.products
  )
  const [baseProducts, setBaseProducts] = useState(
    baseProductsData ?? productsData?.products?.[0]
      ? [productsData?.products?.[0]]
      : []
  )

  useEffect(() => {
    if (suggestedProductsData?.products) {
      setSuggestedProducts(suggestedProductsData.products)
      return
    }
    if (productsData?.products) {
      setSuggestedProducts(productsData.products)
    }
  }, [productsData, suggestedProductsData])

  useEffect(() => {
    if (baseProductsData?.products) {
      setBaseProducts(baseProductsData.products)
      return
    }
    if (productsData?.products && productsData.products[0]) {
      setBaseProducts([productsData.products[0]])
    }
  }, [productsData, baseProductsData])

  // console.log(baseError, 'base error', suggestedError, 'suggestex error')

  useEffect(() => {
    if (!suggestedLists) {
      return
    }

    const baseIds = suggestedLists.map(list => list.baseProductId)

    if (baseIds.length === 0) {
      return
    }
    // console.log(baseIds, 'vai p query by id')

    queryBaseProductsByID({
      variables: {
        field: ProductUniqueIdentifierField.id,
        values: baseIds,
      },
    })
  }, [queryBaseProductsByID, suggestedLists])

  useEffect(() => {
    // console.log(suggestedLists, 'suggested lists')
    if (!suggestedLists || suggestedLists.length === 0) {
      queryProducts({
        variables: {
          category: '',
          collection: '',
          specificationFilters: [],
          orderBy: 'OrderByTopSaleDESC',
          from: 0,
          to: 9,
          hideUnavailableItems: false,
          skusFilter: 'ALL_AVAILABLE',
          installmentCriteria: 'MAX_WITHOUT_INTEREST',
        },
      })
      return
    }

    const currentList = suggestedLists?.[current]

    if (currentList?.suggestedProductsIds) {
      const suggestedIds = currentList.suggestedProductsIds.split(',')
      querySuggestedProductsByID({
        variables: {
          field: ProductUniqueIdentifierField.id,
          values: suggestedIds,
        },
      })
    } else {
      const {
        category = '',
        collection,
        hideUnavailableItems = false,
        orderBy = 'OrderByTopSaleDESC',
        specificationFilters = [],
        maxItems = 10,
        skusFilter,
        installmentCriteria,
      } = currentList

      queryProducts({
        variables: {
          category,
          ...(collection != null
            ? {
                collection,
              }
            : {}),
          specificationFilters: specificationFilters.map(parseFilters),
          orderBy,
          from: 0,
          to: maxItems - 1,
          hideUnavailableItems,
          skusFilter,
          installmentCriteria,
        },
      })
    }
  }, [current, queryProducts, querySuggestedProductsByID, suggestedLists])

  const handleChangeProduct = (index: number) => {
    setCurrent(index)
    // query suggested[index]
  }

  return (
    <div
      className={`flex flex-wrap flex-nowrap-ns justify-around ${styles.refreshShelf}`}
    >
      <RefreshProductSummary
        title={baseProductTitle}
        loading={loading}
        products={baseProducts}
        onChangeProduct={handleChangeProduct}
      />
      <SuggestedProducts
        title={suggestedProductsTitle}
        loading={loading ?? true}
        products={suggestedProducts}
        sliderProps={props.sliderLayout}
      />
    </div>
  )
}

RefreshShelf.schema = {
  title: 'admin/editor.refresh-shelf.title',
}

export default RefreshShelf
