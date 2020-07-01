import React from 'react'
import { useIntl, defineMessages } from 'react-intl'
import { SliderLayout } from 'vtex.slider-layout'
import { ProductSummaryListWithoutQuery } from 'vtex.product-summary'

import styles from './styles.css'

interface Props {
  title?: string
  products: any[]
}

const messages = defineMessages({
  title: {
    id: 'store/shelf.refresh.suggested-products.title',
    defaultMessage: '',
  },
})

const itemsPerPage = {
  desktop: 4,
  phone: 1,
  tablet: 2,
}

const SuggestedProducts: StorefrontFunctionComponent<Props> = ({
  products,
  title,
}) => {
  const intl = useIntl()

  return (
    <div className={styles.suggestedProductsContainer}>
      <div
        className={`mv4 f4 fw7 ttu v-mid ${styles.suggestedProductsTitleContainer}`}
      >
        <span className={styles.suggestedProductsTitle}>
          {title ?? intl.formatMessage(messages.title)}
        </span>
      </div>
      <ProductSummaryListWithoutQuery products={products}>
        <SliderLayout
          totalItems={products.length}
          showNavigationArrows="always"
          fullWidth={false}
          itemsPerPage={itemsPerPage}
          infinite
        />
      </ProductSummaryListWithoutQuery>
    </div>
  )
}

export default SuggestedProducts
