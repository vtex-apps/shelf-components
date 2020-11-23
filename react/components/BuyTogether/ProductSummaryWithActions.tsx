import React, { useMemo } from 'react'
import classnames from 'classnames'
import { FormattedMessage, defineMessages } from 'react-intl'
import { ExtensionPoint } from 'vtex.render-runtime'
import ProductSummary from 'vtex.product-summary/ProductSummaryCustom'
import { ButtonWithIcon, IconClear, IconPlusLines } from 'vtex.styleguide'

import IconRefresh from '../../icons/IconRefresh'
import styles from './styles.css'

interface Props {
  product: Product
  index: number
  hidden?: boolean
  hideChangeAction?: boolean
  onDeleteOrAdd: (index: number) => void
  onChangeProduct: (index: number) => void
  onProductClick: (product: Product) => void
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
  addLabel: {
    id: 'store/shelf.buy-together.add.label',
    defaultMessage: '',
  },
})

const ProductSummaryWithActions: StorefrontFunctionComponent<Props> = ({
  product,
  index,
  hidden,
  hideChangeAction,
  onDeleteOrAdd,
  onChangeProduct,
  onProductClick,
}) => {
  const normalizedProduct = useMemo(
    () => ProductSummary.mapCatalogProductToProductSummary(product),
    [product]
  )

  return (
    <div className="w-100 w-20-l">
      <div className="tc nowrap mb3">
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
          icon={hidden ? <IconPlusLines /> : <IconClear />}
          variation="tertiary"
          onClick={() => onDeleteOrAdd(index)}
        >
          {hidden ? (
            <FormattedMessage {...messages.addLabel} />
          ) : (
            <FormattedMessage {...messages.removeLabel} />
          )}
        </ButtonWithIcon>
      </div>
      <div className={classnames({ [styles.disabledProduct]: hidden })}>
        <ExtensionPoint
          id="product-summary"
          product={normalizedProduct}
          actionOnClick={() => onProductClick(normalizedProduct)}
        />
      </div>
    </div>
  )
}

export default ProductSummaryWithActions
