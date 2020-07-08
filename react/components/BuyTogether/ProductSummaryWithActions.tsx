import React from 'react'
import { FormattedMessage, defineMessages } from 'react-intl'
import { ExtensionPoint } from 'vtex.render-runtime'
import ProductSummary from 'vtex.product-summary/ProductSummaryCustom'
import { ButtonWithIcon, IconClear } from 'vtex.styleguide'

import IconRefresh from '../../icons/IconRefresh'
import styles from './styles.css'

interface Props {
  product: any
  index: number
  onDelete: (index: number) => void
  onRefresh: () => void
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
  onDelete,
  onRefresh,
  index,
  product,
}) => {
  const normalizedProduct = ProductSummary.mapCatalogProductToProductSummary(
    product
  )

  return (
    <div className={`w-20 ${styles.productSummaryWithActions}`}>
      <div className="tc nowrap">
        <ButtonWithIcon
          icon={<IconRefresh />}
          variation="tertiary"
          onClick={onRefresh}
        >
          <FormattedMessage {...messages.changeLabel} />
        </ButtonWithIcon>
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
