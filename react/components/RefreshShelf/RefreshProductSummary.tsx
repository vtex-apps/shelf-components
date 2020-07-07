import React, { useState, useEffect } from 'react'
import { ExtensionPoint, Loading } from 'vtex.render-runtime'
import ProductSummary from 'vtex.product-summary/ProductSummaryCustom'
import { ButtonWithIcon } from 'vtex.styleguide'
import { useIntl, defineMessages } from 'react-intl'

import styles from './styles.css'
import IconRefresh from '../../icons/IconRefresh'

interface RefreshProductSummaryProps {
  products: any[]
  loading: boolean
  onChangeProduct?: (index: number) => void
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
  loading,
  onChangeProduct,
  title,
}) => {
  const intl = useIntl()
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(
    products[0]
      ? ProductSummary.mapCatalogProductToProductSummary(products[0])
      : {}
  )

  useEffect(() => {
    if (products?.[index]) {
      const normalized = ProductSummary.mapCatalogProductToProductSummary(
        products[index]
      )
      setSelected(normalized)
    }
  }, [index, products])

  const handleRefresh = () => {
    const newIndex = index < products?.length - 1 ? index + 1 : 0
    setIndex(newIndex)
    onChangeProduct?.(newIndex)
  }

  return (
    <div className={`tc w-70 w-30-ns w-20-l ${styles.refreshProductSummary}`}>
      <div className="flex-column nowrap mv4">
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
      {!loading && <ExtensionPoint id="product-summary" product={selected} />}
    </div>
  )
}

export default RefreshProductSummary
