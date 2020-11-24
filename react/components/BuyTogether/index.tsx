import React, { useState, Fragment, useMemo, useRef } from 'react'
import { FormattedMessage, defineMessages } from 'react-intl'
import { IconPlusLines } from 'vtex.styleguide'
import { ProductListContext } from 'vtex.product-list-context'
import { useProduct } from 'vtex.product-context'
import { useTreePath, ExtensionPoint, useRuntime } from 'vtex.render-runtime'
import { FormattedCurrency } from 'vtex.format-currency'
import ProductSummary from 'vtex.product-summary/ProductSummaryCustom'
import { ProductGroupContext } from 'vtex.product-group-context'
import { useCssHandles } from 'vtex.css-handles'
import { usePixel } from 'vtex.pixel-manager/PixelContext'

import ProductSummaryWithActions from './ProductSummaryWithActions'
import IconEqual from '../../icons/IconEqual'
import styles from './styles.css'
import { mapSKUItemsToCartItems, sortItemsByLists } from '../../utils'
import { handleProductClick, handleView } from '../../utils/events'
import { useOnView } from '../../hooks/useOnView'

const { ProductGroupProvider, useProductGroup } = ProductGroupContext

interface Props {
  title?: string
  suggestedProducts?: Product[][]
  BuyButton: React.ComponentType<{ skuItems: CartItem[] }>
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

const CSS_HANDLES = [
  'buyTogetherContainer',
  'buyTogetherTitleContainer',
  'buyTogetherTitle',
  'totalValue',
]

const notNull = (item: CartItem | null): item is CartItem => item !== null

const BuyTogether: StorefrontFunctionComponent<Props> = ({
  title,
  suggestedProducts,
  BuyButton,
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  const { page } = useRuntime()
  const { push } = usePixel()
  const onProductClick = handleProductClick(push, page)
  const onView = handleView(push, page)
  const ref = useRef<HTMLDivElement | null>(null)
  const { product: baseProduct } = useProduct() as any
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { items } = useProductGroup()!
  const { treePath } = useTreePath()

  useOnView({
    ref,
    onView: () => onView('buy-together'),
    once: true,
    initializeOnInteraction: true,
  })

  const [suggestedLists, setSuggestedLists] = useState<SuggestedList[]>(
    suggestedProducts?.map(list => {
      return { products: list, hidden: false, current: 0 }
    }) ?? []
  )
  const normalizedBaseProduct = useMemo(
    () => ProductSummary.mapCatalogProductToProductSummary(baseProduct),
    [baseProduct]
  )

  const filteredItems = useMemo(() => {
    const sortedItems = sortItemsByLists(items, suggestedLists)
    return sortedItems.filter((item, index) => {
      if (index === 0) {
        return true
      }
      if (item.quantity === 1) {
        return !suggestedLists[index - 1].hidden
      }
      return !(suggestedLists[index - 1].hidden && suggestedLists[index].hidden)
    })
  }, [items, suggestedLists])

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

  const onDeleteOrAdd = (index: number) => {
    let newSuggestedLists = []
    if (suggestedLists[index].hidden) {
      newSuggestedLists = suggestedLists.map((list, listIndex) =>
        listIndex !== index ? list : { ...list, hidden: false }
      )
    } else {
      newSuggestedLists = suggestedLists.map((list, listIndex) =>
        listIndex !== index ? list : { ...list, hidden: true }
      )
    }
    setSuggestedLists(newSuggestedLists)
  }

  const cartItems = useMemo(() => {
    return mapSKUItemsToCartItems(filteredItems).filter(notNull)
  }, [filteredItems])

  const totalProducts = cartItems.length
  const totalPrice = useMemo(() => {
    return cartItems.reduce((total: number, currentItem: CartItem) => {
      return total + currentItem.price / 100
    }, 0)
  }, [cartItems])

  return (
    <div className={`flex-none tc ${handles.buyTogetherContainer}`} ref={ref}>
      <div className={`mv4 v-mid ${handles.buyTogetherTitleContainer}`}>
        <span className={handles.buyTogetherTitle}>
          {title && title !== '' ? (
            title
          ) : (
            <FormattedMessage {...messages.title} />
          )}
        </span>
      </div>
      <div className="flex flex-column flex-row-l">
        <ProductListProvider listName={trackingId}>
          <div className="w-100 w-20-l">
            <div className={styles.productSummary} />
            <div>
              <ExtensionPoint
                id="product-summary"
                product={normalizedBaseProduct}
                actionOnClick={() => onProductClick(normalizedBaseProduct)}
              />
            </div>
          </div>
          {suggestedLists.map((suggestedList, index) => {
            const { products, current } = suggestedList
            return (
              <Fragment key={`${products[current]?.productId}-${index}`}>
                <div className="self-center ma5">
                  <IconPlusLines size={20} />
                </div>
                <ProductSummaryWithActions
                  onDeleteOrAdd={onDeleteOrAdd}
                  index={index}
                  hidden={suggestedList.hidden}
                  hideChangeAction={products.length <= 1}
                  onChangeProduct={onChangeProduct}
                  product={products[current]}
                  onProductClick={onProductClick}
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
            <div className={`mv5 ${handles.totalValue}`}>
              <FormattedCurrency value={totalPrice} />
            </div>
            {/* verificar se eh add-to-cart-button e add customPixelEventId */}
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
