import React, { useState } from 'react'
import { ExtensionPoint } from 'vtex.render-runtime'
import ProductSummary from 'vtex.product-summary/ProductSummaryCustom'
import { ButtonWithIcon } from 'vtex.styleguide'
import { useIntl, defineMessages } from 'react-intl'

import styles from './styles.css'
import IconRefresh from '../../icons/IconRefresh'

interface RefreshProductSummaryProps {
  products: any[]
  onChangeProduct?: (id: number) => void
  title?: string
}

const messages = defineMessages({
  title: {
    id: 'store/shelf.refresh.refresh-product-summary.title',
    defaultMessage: '',
  },
})

const RefreshProductSummary: StorefrontFunctionComponent<RefreshProductSummaryProps> = ({
  products,
  onChangeProduct,
  title,
}) => {
  const intl = useIntl()
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(
    ProductSummary.mapCatalogProductToProductSummary(products[0])
  )

  const handleRefresh = () => {
    const newIndex = index < products?.length - 1 ? index + 1 : 0
    setIndex(newIndex)
    const normalizedProduct = ProductSummary.mapCatalogProductToProductSummary(
      products[index]
    )
    setSelected(normalizedProduct)
    onChangeProduct?.(normalizedProduct.productId)
  }

  return (
    <div className={`tc w-70 w-30-ns w-20-l ${styles.refreshProductSummary}`}>
      <div className="flex-column nowrap mv4">
        <span className="f4 fw7 ttu mh4 v-mid">
          {title ?? intl.formatMessage(messages.title)}
        </span>
        <ButtonWithIcon
          icon={<IconRefresh size={20} />}
          variation="tertiary"
          onClick={handleRefresh}
        />
      </div>
      <ExtensionPoint id="product-summary" product={selected} />
    </div>
  )
}

export default RefreshProductSummary
