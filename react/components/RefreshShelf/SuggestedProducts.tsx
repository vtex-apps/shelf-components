import React from 'react'
import { useIntl, defineMessages } from 'react-intl'
import { SliderLayout } from 'vtex.slider-layout'
import { ProductSummaryListWithoutQuery } from 'vtex.product-summary'

import styles from './styles.css'

interface Props {
  title?: string
  products: any[]
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
  sliderProps,
}) => {
  const intl = useIntl()

  return (
    <div className={styles.suggestedProductsContainer}>
      <div
        className={`mv4 f4 fw7 ttu v-mid ${styles.suggestedProductsTitleContainer}`}
      >
        <span className={styles.suggestedProductsTitle}>
          {title && title !== '' ? title : intl.formatMessage(messages.title)}
        </span>
      </div>
      <ProductSummaryListWithoutQuery products={products}>
        <SliderLayout
          totalItems={products.length}
          showNavigationArrows={sliderProps?.showNavigationArrows ?? 'always'}
          showPaginationDots={sliderProps?.showPaginationDots ?? 'always'}
          fullWidth={false}
          itemsPerPage={itemsPerPage}
          infinite
        />
      </ProductSummaryListWithoutQuery>
    </div>
  )
}

export default SuggestedProducts
