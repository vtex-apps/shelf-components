import React, { useMemo } from 'react'
import { useIntl, defineMessages } from 'react-intl'
import { SliderLayout } from 'vtex.slider-layout'
import { ProductSummaryListWithoutQuery } from 'vtex.product-summary'
import ProductSummary from 'vtex.product-summary/ProductSummaryCustom'
import { Loading } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'

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

const CSS_HANDLES = ['suggestedProductsTitleContainer']

const itemsPerPage = {
  desktop: 3,
  phone: 1,
  tablet: 1,
}

const SuggestedProducts: StorefrontFunctionComponent<Props> = ({
  title,
  products,
  loading,
  sliderProps,
}) => {
  const intl = useIntl()
  const handles = useCssHandles(CSS_HANDLES)
  const normalizedProducts = useMemo(
    () =>
      products?.length > 0
        ? products.map(product =>
            ProductSummary.mapCatalogProductToProductSummary(product)
          )
        : [],
    [products]
  )

  return (
    <div className={styles.suggestedProductsContainer}>
      <div
        className={`mv4 f4 v-mid ${handles.suggestedProductsTitleContainer}`}
      >
        <span className={styles.suggestedProductsTitle}>
          {title && title !== '' ? title : intl.formatMessage(messages.title)}
        </span>
      </div>
      {(loading || !normalizedProducts) && <Loading />}
      {!loading && normalizedProducts?.length > 0 && (
        <ProductSummaryListWithoutQuery products={normalizedProducts}>
          <SliderLayout
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
