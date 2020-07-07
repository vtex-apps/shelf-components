import React, { useState, useEffect, useMemo } from 'react'
import { useIntl, defineMessages } from 'react-intl'
import { SliderLayout } from 'vtex.slider-layout'
import { ProductSummaryListWithoutQuery } from 'vtex.product-summary'
import ProductSummary from 'vtex.product-summary/ProductSummaryCustom'
import { Loading } from 'vtex.render-runtime'

import styles from './styles.css'

interface Props {
  title?: string
  products: any[]
  loading: boolean
  sliderProps?: {
    showNavigationArrows: string
    showPaginationDots: string
  }
}

const messages = defineMessages({
  title: {
    id: 'store/shelf.refresh.suggested-products.title',
    defaultMessage: '',
  },
})

const itemsPerPage = {
  desktop: 3,
  phone: 1,
  tablet: 2,
}

const SuggestedProducts: StorefrontFunctionComponent<Props> = ({
  title,
  products,
  loading,
  sliderProps,
}) => {
  const intl = useIntl()
  const [totalItems, setTotalItems] = useState(products?.length)
  const normalizedProducts = useMemo(
    () =>
      products?.length > 0
        ? products.map(product =>
            ProductSummary.mapCatalogProductToProductSummary(product)
          )
        : [],
    [products]
  )

  useEffect(() => {
    setTotalItems(normalizedProducts?.length)
  }, [normalizedProducts])

  return (
    <div className={styles.suggestedProductsContainer}>
      <div
        className={`mv4 f4 fw7 ttu v-mid ${styles.suggestedProductsTitleContainer}`}
      >
        <span className={styles.suggestedProductsTitle}>
          {title && title !== '' ? title : intl.formatMessage(messages.title)}
        </span>
      </div>
      {(loading || !normalizedProducts) && <Loading />}
      {!loading && normalizedProducts?.length > 0 && (
        <ProductSummaryListWithoutQuery products={normalizedProducts}>
          <SliderLayout
            totalItems={totalItems}
            showNavigationArrows={sliderProps?.showNavigationArrows ?? 'always'}
            showPaginationDots={sliderProps?.showPaginationDots ?? 'always'}
            fullWidth={false}
            itemsPerPage={itemsPerPage}
            infinite
          />
        </ProductSummaryListWithoutQuery>
      )}
    </div>
  )
}

export default SuggestedProducts
