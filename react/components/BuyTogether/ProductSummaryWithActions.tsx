import React, { useMemo } from 'react'
import { FormattedMessage, defineMessages } from 'react-intl'
import { ExtensionPoint } from 'vtex.render-runtime'
import ProductSummary from 'vtex.product-summary/ProductSummaryCustom'
import { ButtonWithIcon, IconClear } from 'vtex.styleguide'

import IconRefresh from '../../icons/IconRefresh'
import styles from './styles.css'

interface Props {
  product: any
  index: number
  hideChangeAction?: boolean
  onDelete: (index: number) => void
  onChangeProduct: (index: number) => void
}

const messages = defineMessages({
  changeLabel: {
    id: 'store/shelf.buy-together.change.label',
    defaultMessage: '',
  },
  removeLabel: {
    id: 'store/shelf.buy-together.remove.label',
    defaultMessage: '',
  },
})

const ProductSummaryWithActions: StorefrontFunctionComponent<Props> = ({
  product,
  index,
  hideChangeAction,
  onDelete,
  onChangeProduct,
}) => {
  const normalizedProduct = useMemo(
    () => ProductSummary.mapCatalogProductToProductSummary(product),
    [product]
  )

  return (
    <div className={`w-20 ${styles.productSummary}`}>
      <div className="tc nowrap">
        {!hideChangeAction && (
          <ButtonWithIcon
            icon={<IconRefresh />}
            variation="tertiary"
            onClick={() => onChangeProduct(index)}
          >
            <FormattedMessage {...messages.changeLabel} />
          </ButtonWithIcon>
        )}
        <ButtonWithIcon
          icon={<IconClear />}
          variation="tertiary"
          onClick={() => onDelete(index)}
        >
          <FormattedMessage {...messages.removeLabel} />
        </ButtonWithIcon>
      </div>
      <ExtensionPoint id="product-summary" product={normalizedProduct} />
    </div>
  )
}

export default ProductSummaryWithActions
