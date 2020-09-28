import React, { useState, useEffect } from 'react'
import { ExtensionPoint } from 'vtex.render-runtime'
import ProductSummary from 'vtex.product-summary/ProductSummaryCustom'
import { ButtonWithIcon } from 'vtex.styleguide'
import { useIntl, defineMessages } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'

import IconRefresh from '../../icons/IconRefresh'
import ProductSummaryLoader from './ProductSummaryLoader'
import styles from './styles.css'

interface RefreshProductSummaryProps {
  products: Product[]
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

const CSS_HANDLES = ['refreshProductSummary', 'refreshProductTitleContainer']

const RefreshProductSummary: StorefrontFunctionComponent<RefreshProductSummaryProps> = ({
  products,
  selected,
  onChangeSelected,
  loading,
  title,
}) => {
  const intl = useIntl()
  const handles = useCssHandles(CSS_HANDLES)
  const [selectedProduct, setSelectedProduct] = useState(
    products?.[selected]
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
    <div className={`tc w-70 w-40-ns w-20-l ${handles.refreshProductSummary}`}>
      <div
        className={`nowrap mv4 f4 v-mid ${handles.refreshProductTitleContainer}`}
      >
        <span className={styles.refreshProductTitle}>
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
      {loading && <ProductSummaryLoader />}
      {!loading && selectedProduct && selectedProduct.productId && (
        <div key={selectedProduct.productId}>
          <ExtensionPoint id="product-summary" product={selectedProduct} />
        </div>
      )}
    </div>
  )
}

export default RefreshProductSummary
