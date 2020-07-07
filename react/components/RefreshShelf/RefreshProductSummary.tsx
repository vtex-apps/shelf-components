import React, { useState, useEffect } from 'react'
import { ExtensionPoint, Loading } from 'vtex.render-runtime'
import ProductSummary from 'vtex.product-summary/ProductSummaryCustom'
import { ButtonWithIcon } from 'vtex.styleguide'
import { useIntl, defineMessages } from 'react-intl'

import styles from './styles.css'
import IconRefresh from '../../icons/IconRefresh'

interface RefreshProductSummaryProps {
  products: any[]
  selected: number
  loading: boolean
  onChangeSelected?: () => void
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
  selected,
  onChangeSelected,
  loading,
  title,
}) => {
  const intl = useIntl()
  const [selectedProduct, setSelectedProduct] = useState(
    products[selected]
      ? ProductSummary.mapCatalogProductToProductSummary(products[selected])
      : {}
  )

  useEffect(() => {
    if (products?.[selected]) {
      const normalized = ProductSummary.mapCatalogProductToProductSummary(
        products[selected]
      )
      setSelectedProduct(normalized)
    }
  }, [selected, products])

  const handleRefresh = () => {
    onChangeSelected?.()
  }

  return (
    <div className={`tc w-70 w-30-ns w-20-l ${styles.refreshProductSummary}`}>
      <div className="nowrap mv4">
        <span className="f4 fw7 ttu mh4 v-mid">
          {title && title !== '' ? title : intl.formatMessage(messages.title)}
        </span>
        {products?.length > 1 && (
          <ButtonWithIcon
            icon={<IconRefresh size={20} />}
            variation="tertiary"
            onClick={handleRefresh}
          />
        )}
      </div>
      {loading && <Loading />}
      {!loading && selectedProduct && selectedProduct.productId && (
        <ExtensionPoint id="product-summary" product={selectedProduct} />
      )}
    </div>
  )
}

export default RefreshProductSummary
