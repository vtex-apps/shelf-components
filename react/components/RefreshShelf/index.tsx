import React, { useState, useEffect, useMemo, useRef } from 'react'
import { useLazyQuery } from 'react-apollo'
import { useRuntime } from 'vtex.render-runtime'
import { QueryProducts as productsQuery } from 'vtex.store-resources'
import { usePixel } from 'vtex.pixel-manager/PixelContext'

import productsByIdentifier from '../../queries/productsByIdentifier.gql'
import RefreshProductSummary from './RefreshProductSummary'
import SuggestedProducts from './SuggestedProducts'
import styles from './styles.css'
import {
  sortBaseProductsBySuggestedLists,
  sortProductsBySuggestedIds,
} from '../../utils'
import { handleProductClick, handleView } from '../../utils/events'
import { useOnView } from '../../hooks/useOnView'

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
}

const parseFilters = ({ id, value }: SpecificationFilter) =>
  `specificationFilter_${id}:${value}`

const RefreshShelf: StorefrontFunctionComponent<RefreshShelfProps> = ({
  baseProductTitle,
  suggestedProductsTitle,
  suggestedLists,
  recommendedLists,
  ...props
}) => {
  const { push } = usePixel()
  const { page } = useRuntime()
  const onProductClick = handleProductClick(push, page)
  const onView = handleView(push, page)
  const ref = useRef<HTMLDivElement | null>(null)
  const [current, setCurrent] = useState(0)

  useOnView({
    ref,
    onView: () => onView('refresh'),
    once: true,
    initializeOnInteraction: true,
  })

  const [
    queryProducts,
    { data: productsData, loading, called, refetch },
  ] = useLazyQuery(productsQuery, {
    notifyOnNetworkStatusChange: true,
  })
  const currentList = suggestedLists?.[current]

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

  const baseProducts = useMemo(() => {
    if (recommendedLists) {
      return recommendedLists.map((list: RecommendedList) => list.base[0])
    }
    if (!suggestedLists) {
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

  return (
    <div
      className={`flex flex-wrap flex-nowrap-ns justify-around ${styles.refreshShelf}`}
      ref={ref}
    >
      <RefreshProductSummary
        title={baseProductTitle}
        loading={loading || baseProductsLoading || loadingProductsById}
        selected={current}
        products={baseProducts}
        onChangeSelected={handleChangeProduct}
        onProductClick={onProductClick}
      />
      <SuggestedProducts
        title={suggestedProductsTitle}
        loading={baseProductsLoading || loading || loadingProductsById}
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
