import React, { useState, Fragment, useMemo } from 'react'
import { FormattedMessage, defineMessages } from 'react-intl'
import { IconPlusLines } from 'vtex.styleguide'
import { ProductListContext } from 'vtex.product-list-context'
import { useProduct } from 'vtex.product-context'
import { useTreePath, ExtensionPoint } from 'vtex.render-runtime'
import { FormattedCurrency } from 'vtex.format-currency'
import ProductSummary from 'vtex.product-summary/ProductSummaryCustom'
import { ProductGroupContext } from 'vtex.product-group-context'

import ProductSummaryWithActions from './ProductSummaryWithActions'
import IconEqual from '../../icons/IconEqual'
import styles from './styles.css'
import { mapSKUItemsToCartItems } from '../../utils'

const { ProductGroupProvider, useProductGroup } = ProductGroupContext

interface Props {
  title?: string
  suggestedProducts?: Product[][]
  BuyButton: React.ComponentType<{ skuItems: any[] }>
}

interface SuggestedList {
  products: Product[]
  hidden: boolean
  current: number
}

const { ProductListProvider } = ProductListContext

const messages = defineMessages({
  title: {
    id: 'store/shelf.buy-together.title',
    defaultMessage: '',
  },
  totalProducts: {
    id: 'store/shelf.buy-together.total-products.label',
    defaultMessage: '',
  },
})

const BuyTogether: StorefrontFunctionComponent<Props> = ({
  title,
  suggestedProducts,
  BuyButton,
}) => {
  const { product: baseProduct } = useProduct() as any
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { items } = useProductGroup()!
  const { treePath } = useTreePath()
  const [suggestedLists, setSuggestedLists] = useState<SuggestedList[]>(
    suggestedProducts?.map(list => {
      return { products: list, hidden: false, current: 0 }
    }) ?? []
  )
  const normalizedBaseProduct = useMemo(
    () => ProductSummary.mapCatalogProductToProductSummary(baseProduct),
    [baseProduct]
  )

  const treePathList =
    (typeof treePath === 'string' && treePath.split('/')) || []
  const trackingId = treePathList[treePathList.length - 1] || 'BuyTogetherShelf'

  const onChangeProduct = (index: number) => {
    const newSuggestedLists = suggestedLists.map((list, listIndex) => {
      if (listIndex !== index) {
        return list
      }
      const current =
        list.current + 1 < list.products.length ? list.current + 1 : 0
      return { ...list, current }
    })
    setSuggestedLists(newSuggestedLists)
  }

  const onDelete = (index: number) => {
    const newSuggestedLists = suggestedLists.map((list, listIndex) =>
      listIndex !== index ? list : { ...list, hidden: true }
    )
    setSuggestedLists(newSuggestedLists)
  }

  const cartItems = useMemo(() => mapSKUItemsToCartItems(items), [items])

  const totalProducts = suggestedLists.filter(list => !list.hidden).length + 1
  const totalPrice = useMemo(() => {
    return items.reduce((total: number, currentItem: Item) => {
      if (currentItem.selectedItem.seller?.commertialOffer.Price) {
        return total + currentItem.selectedItem.seller.commertialOffer?.Price
      }
      return total + currentItem.selectedItem.sellers[0].commertialOffer?.Price
    }, 0)
  }, [items])

  return (
    <div className={`${styles.buyTogether} flex-none tc`}>
      <span className={`${styles.title} mv4 v-mid`}>
        {title ?? <FormattedMessage {...messages.title} />}
      </span>
      <div className="flex flex-column flex-row-l">
        <ProductListProvider listName={trackingId}>
          <div className="w-100 w-20-l">
            <div className={styles.productSummary} />
            <ExtensionPoint
              id="product-summary"
              product={normalizedBaseProduct}
            />
          </div>
          {suggestedLists.map((suggestedList, index) => {
            if (suggestedList.hidden) {
              return null
            }
            const { products, current } = suggestedList
            return (
              <Fragment key={`${products[current]?.productId}-${index}`}>
                <div className="self-center ma5">
                  <IconPlusLines size={20} />
                </div>
                <ProductSummaryWithActions
                  onDelete={onDelete}
                  index={index}
                  hideChangeAction={products.length <= 1}
                  onChangeProduct={onChangeProduct}
                  product={products[current]}
                />
              </Fragment>
            )
          })}
          <div className="self-center ma5">
            <IconEqual />
          </div>
          <div className="w-100 mh2 mh6-l w-20-l self-center">
            <div className="mb5">
              <FormattedMessage
                {...messages.totalProducts}
                values={{ total: totalProducts }}
              />
            </div>
            <div className={`${styles.totalValue} mv5`}>
              <FormattedCurrency value={totalPrice} />
            </div>
            <BuyButton skuItems={cartItems} />
          </div>
        </ProductListProvider>
      </div>
    </div>
  )
}

const EnhancedBuyTogether: StorefrontFunctionComponent<Props> = props => {
  return (
    <ProductGroupProvider>
      <BuyTogether {...props} />
    </ProductGroupProvider>
  )
}

EnhancedBuyTogether.schema = {
  title: 'admin/editor.buy-together.title',
}

export default EnhancedBuyTogether
