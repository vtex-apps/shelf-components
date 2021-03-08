import React, { useState, useEffect, useMemo, useRef } from 'react'
import { useLazyQuery } from 'react-apollo'
import { useRuntime } from 'vtex.render-runtime'
import { QueryProducts as productsQuery } from 'vtex.store-resources'
import { usePixel } from 'vtex.pixel-manager/PixelContext'
import { useRecommendation } from 'vtex.recommendation-context/RecommendationContext'

import productsByIdentifier from '../../queries/productsByIdentifier.gql'
import RefreshProductSummary from './RefreshProductSummary'
import SuggestedProducts from './SuggestedProducts'
import styles from './styles.css'
import {
  sortBaseProductsBySuggestedLists,
  sortProductsBySuggestedIds,
} from '../../utils'
import { useOnView } from '../../hooks/useOnView'
import { useEvents } from '../../hooks/useEvents'

enum ProductUniqueIdentifierField {
  id = 'id',
  slug = 'slug',
  ean = 'ean',
  reference = 'reference',
  sku = 'sku',
}

interface RefreshShelfProps {
  baseProductTitle?: string
  suggestedProductsTitle?: string
  suggestedLists?: SuggestedProductsList[]
  recommendedLists?: RecommendedList[]
  sliderLayout: {
    showNavigationArrows: string
    showPaginationDots: string
  }
  isSecondary?: boolean
  secondaryBaseProductTitle?: string
  secondarySuggestedProductsTitle?: string
}

const parseFilters = ({ id, value }: SpecificationFilter) =>
  `specificationFilter_${id}:${value}`

const RefreshShelf: StorefrontFunctionComponent<RefreshShelfProps> = ({
  baseProductTitle,
  suggestedProductsTitle,
  suggestedLists,
  recommendedLists,
  isSecondary,
  secondaryBaseProductTitle,
  secondarySuggestedProductsTitle,
  ...props
}) => {
  const { push } = usePixel()
  const { page } = useRuntime()
  const [current, setCurrent] = useState(0)
  const ref = useRef<HTMLDivElement | null>(null)
  const recommendation = useRecommendation?.()
  const { onView, onProductClick } = useEvents(recommendation, push, page)

  useOnView({
    ref,
    onView: () => onView('refresh'),
    once: true,
    initializeOnInteraction: true,
  })

  const [
    queryProducts,
    { data: productsData, loading: loadingProducts, called, refetch },
  ] = useLazyQuery(productsQuery, {
    notifyOnNetworkStatusChange: true,
  })
  const currentList = suggestedLists?.[current]

  const [
    queryBaseProductsByID,
    {
      data: baseProductsData,
      loading: loadingBaseProducts,
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

  const baseProducts = useMemo(() => {
    if (recommendedLists) {
      return recommendedLists.map((list: RecommendedList) => list.base[0])
    }
    if (!suggestedLists || suggestedLists.length === 0) {
      return []
    }
    if (baseProductsData?.productsByIdentifier) {
      const sortProducts = sortBaseProductsBySuggestedLists(
        baseProductsData?.productsByIdentifier,
        suggestedLists
      )
      return sortProducts
    }
    if (productsData?.products?.[0]) {
      return productsData?.products?.[0]
    }
  }, [baseProductsData, productsData, suggestedLists, recommendedLists])

  const suggestedProducts = useMemo(() => {
    if (recommendedLists) {
      return recommendedLists[current].recommended
    }
    if (!suggestedLists) {
      return []
    }
    if (
      currentList?.suggestedProductsIds &&
      suggestedProductsData?.productsByIdentifier
    ) {
      const sortProducts = sortProductsBySuggestedIds(
        suggestedProductsData?.productsByIdentifier,
        currentList.suggestedProductsIds.split(',')
      )
      return sortProducts
    }
    if (productsData?.products) {
      return productsData.products
    }
  }, [
    productsData,
    suggestedLists,
    recommendedLists,
    current,
    currentList,
    suggestedProductsData,
  ])

  useEffect(() => {
    if (!suggestedLists || recommendedLists) {
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
    recommendedLists,
    queryBaseProductsCalled,
    queryBaseProductsByID,
    baseProductsRefetch,
  ])

  useEffect(() => {
    const executeQuery = (variables: Record<string, any>) =>
      called ? refetch(variables) : queryProducts({ variables })

    if (!suggestedLists || suggestedLists.length === 0 || recommendedLists) {
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

    if (!currentList) {
      return
    }

    if (currentList.suggestedProductsIds) {
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
    recommendedLists,
    currentList,
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

  const loading = useMemo(
    () => loadingBaseProducts || loadingProducts || loadingProductsById,
    [loadingBaseProducts, loadingProducts, loadingProductsById]
  )

  if (
    !loading &&
    (!baseProducts ||
      !suggestedProducts ||
      !baseProducts.length ||
      !suggestedProducts.length)
  ) {
    return null
  }

  return (
    <div
      className={`flex flex-wrap flex-nowrap-ns justify-around ${styles.refreshShelf}`}
      ref={ref}
    >
      <RefreshProductSummary
        title={isSecondary ? secondaryBaseProductTitle : baseProductTitle}
        loading={loading}
        selected={current}
        products={baseProducts}
        onChangeSelected={handleChangeProduct}
        onProductClick={onProductClick}
      />
      <SuggestedProducts
        title={
          isSecondary ? secondarySuggestedProductsTitle : suggestedProductsTitle
        }
        loading={loading}
        products={suggestedProducts}
        sliderProps={props.sliderLayout}
        key={baseProducts?.[current]?.productId}
        onProductClick={onProductClick}
      />
    </div>
  )
}

RefreshShelf.schema = {
  title: 'admin/editor.refresh-shelf.title',
}

export default RefreshShelf
