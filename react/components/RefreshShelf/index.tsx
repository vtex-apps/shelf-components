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
  id = 'id',
  slug = 'slug',
  ean = 'ean',
  reference = 'reference',
  sku = 'sku',
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
  const [
    queryProducts,
    { data: productsData, loading, called, refetch },
  ] = useLazyQuery(productsQuery, {
    notifyOnNetworkStatusChange: true,
  })

  const [
    queryBaseProductsByID,
    {
      data: baseProductsData,
      loading: baseProductsLoading,
      called: queryBaseProductsCalled,
      refetch: baseProductsRefetch,
    },
  ] = useLazyQuery(productsByIdentifier, { notifyOnNetworkStatusChange: true })

  const [
    querySuggestedProductsByID,
    {
      data: suggestedProductsData,
      loading: loadingProductsById,
      called: calledById,
      refetch: refetchQueryById,
    },
  ] = useLazyQuery(productsByIdentifier, { notifyOnNetworkStatusChange: true })

  const [suggestedProducts, setSuggestedProducts] = useState(
    suggestedProductsData?.productsByIdentifier ?? productsData?.products
  )
  const [baseProducts, setBaseProducts] = useState(
    baseProductsData?.productsByIdentifier ?? productsData?.products?.[0]
      ? [productsData?.products?.[0]]
      : []
  )

  useEffect(() => {
    if (suggestedProductsData?.productsByIdentifier) {
      setSuggestedProducts(suggestedProductsData.productsByIdentifier)
      return
    }
    if (productsData?.products) {
      setSuggestedProducts(productsData.products)
    }
  }, [productsData, suggestedProductsData])

  useEffect(() => {
    if (baseProductsData?.productsByIdentifier) {
      setBaseProducts(baseProductsData.productsByIdentifier)
      return
    }
    if (productsData?.products && productsData.products[0]) {
      setBaseProducts([productsData.products[0]])
    }
  }, [productsData, baseProductsData])

  useEffect(() => {
    if (!suggestedLists) {
      return
    }

    const baseIds = suggestedLists
      .map(list => list.baseProductId)
      .filter(id => id && id !== '')

    if (baseIds.length === 0) {
      return
    }

    const executeQuery = (variables: Record<string, any>) =>
      queryBaseProductsCalled
        ? baseProductsRefetch(variables)
        : queryBaseProductsByID({ variables })

    executeQuery({
      field: ProductUniqueIdentifierField.id,
      values: baseIds,
    })
  }, [
    suggestedLists,
    queryBaseProductsCalled,
    queryBaseProductsByID,
    baseProductsRefetch,
  ])

  useEffect(() => {
    const executeQuery = (variables: Record<string, any>) =>
      called ? refetch(variables) : queryProducts({ variables })

    if (!suggestedLists || suggestedLists.length === 0) {
      executeQuery({
        category: '',
        collection: '',
        specificationFilters: [],
        orderBy: 'OrderByTopSaleDESC',
        from: 0,
        to: 9,
        hideUnavailableItems: false,
        skusFilter: 'ALL_AVAILABLE',
        installmentCriteria: 'MAX_WITHOUT_INTEREST',
      })
      return
    }

    const currentList = suggestedLists?.[current]

    if (currentList?.suggestedProductsIds) {
      const executeQueryById = (variables: Record<string, any>) =>
        calledById
          ? refetchQueryById(variables)
          : querySuggestedProductsByID({ variables })

      const suggestedIds = currentList.suggestedProductsIds.split(',')

      executeQueryById({
        field: ProductUniqueIdentifierField.id,
        values: suggestedIds,
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

      executeQuery({
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
      })
    }
  }, [
    suggestedLists,
    current,
    called,
    calledById,
    queryProducts,
    querySuggestedProductsByID,
    refetch,
    refetchQueryById,
  ])

  const handleChangeProduct = () => {
    const newIndex = current < baseProducts?.length - 1 ? current + 1 : 0
    setCurrent(newIndex)
  }

  return (
    <div
      className={`flex flex-wrap flex-nowrap-ns justify-around ${styles.refreshShelf}`}
    >
      <RefreshProductSummary
        title={baseProductTitle}
        loading={loading || baseProductsLoading || loadingProductsById}
        selected={current}
        products={baseProducts}
        onChangeSelected={handleChangeProduct}
      />
      <SuggestedProducts
        title={suggestedProductsTitle}
        loading={(loading || loadingProductsById) ?? true}
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
