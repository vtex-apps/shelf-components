import React, { useState, Fragment, useMemo } from 'react'
import { FormattedMessage, defineMessages } from 'react-intl'
import { IconPlusLines } from 'vtex.styleguide'
import { ProductListContext } from 'vtex.product-list-context'
import { useProduct } from 'vtex.product-context'
import { useTreePath, ExtensionPoint } from 'vtex.render-runtime'
import { FormattedCurrency } from 'vtex.format-currency'
import ProductSummary from 'vtex.product-summary/ProductSummaryCustom'

import ProductSummaryWithActions from './ProductSummaryWithActions'
import IconEqual from '../../icons/IconEqual'
import styles from './styles.css'

interface Props {
  children: any
  title?: string
  suggestedLists?: string
}

const mock = {
  cacheId: 'vintage-phone',
  productId: '2000050',
  productName: 'Vintage Phone',
  productReference: '1002P',
  description: '',
  link: 'https://portal.vtexcommercestable.com.br/vintage-phone/p',
  linkText: 'vintage-phone',
  brand: 'Apple',
  brandId: 2000013,
  categories: ['/Home & Decor/'],
  priceRange: {
    sellingPrice: { highPrice: 44, lowPrice: 44, __typename: 'PriceRange' },
    listPrice: { highPrice: 60, lowPrice: 60, __typename: 'PriceRange' },
    __typename: 'ProductPriceRange',
  },
  specificationGroups: [
    {
      name: 'allSpecifications',
      specifications: [],
      __typename: 'SpecificationGroup',
    },
  ],
  items: [
    {
      name: 'Classic',
      itemId: '310118454',
      measurementUnit: 'un',
      unitMultiplier: 1,
      referenceId: [{ Value: '1004P0', __typename: 'Reference' }],
      images: [
        {
          imageUrl:
            'https://storecomponents.vtexassets.com/arquivos/ids/155557/download.png?v=637060789467270000',
          imageTag:
            '<img src="~/arquivos/ids/155557-#width#-#height#/download.png?v=637060789467270000" width="#width#" height="#height#" alt="Vintage Phone" id="" />',
          imageLabel: '',
          __typename: 'Image',
        },
      ],
      variations: [],
      sellers: [
        {
          sellerId: '1',
          commertialOffer: {
            Installments: [
              {
                Value: 11,
                InterestRate: 0,
                TotalValuePlusInterestRate: 44,
                NumberOfInstallments: 4,
                Name: 'Visa 4 vezes sem juros',
                __typename: 'Installment',
              },
            ],
            AvailableQuantity: 3000000,
            Price: 44,
            PriceWithoutDiscount: 44,
            ListPrice: 60,
            Tax: 0,
            taxPercentage: 0,
            teasers: [{ name: 'preco-a-vista', __typename: 'Teaser' }],
            discountHighlights: [],
            __typename: 'Offer',
          },
          __typename: 'Seller',
        },
      ],
      __typename: 'SKU',
    },
  ],
  productClusters: [],
  properties: [],
  __typename: 'Product',
  sku: {
    name: 'Classic',
    itemId: '310118454',
    measurementUnit: 'un',
    unitMultiplier: 1,
    images: [
      {
        imageUrl:
          'https://storecomponents.vtexassets.com/arquivos/ids/155557-500-auto?width=500&height=auto&aspect=true',
        imageTag:
          '<img src="~/arquivos/ids/155557-#width#-#height#/download.png?v=637060789467270000" width="#width#" height="#height#" alt="Vintage Phone" id="" />',
        imageLabel: '',
        __typename: 'Image',
      },
    ],
    __typename: 'SKU',
  },
}

// interface SuggestedList {
//   products: any[]
//   hidden: boolean
//   current: number
// }

const mockList1 = {
  products: [mock, { ...mock, productName: 'Vintage phone 2' }],
  hidden: false,
  current: 0,
}
const mockList2 = {
  products: [mock],
  hidden: false,
  current: 0,
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
  children,
  title,
}) => {
  const { product: baseProduct, selectedItem } = useProduct()
  const { treePath } = useTreePath()
  const [suggestedLists, setSuggestedLists] = useState([mockList1, mockList2])
  const normalizedBaseProduct = ProductSummary.mapCatalogProductToProductSummary(
    baseProduct
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

  const totalProducts = suggestedLists.filter(list => !list.hidden).length + 1
  const totalPrice = useMemo(() => {
    const suggestedItemsTotal = suggestedLists.reduce((total, currentList) => {
      if (currentList.hidden) {
        return total
      }
      const { products, current } = currentList
      return total + products[current].priceRange.sellingPrice.lowPrice
    }, 0)
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return selectedItem.sellers[0].commertialOffer.Price + suggestedItemsTotal
  }, [selectedItem.sellers, suggestedLists])

  // if (children) {
  //   console.log('receber AddToCart do checkout antigo ou novo', totalProducts)
  // }

  return (
    <div className="flex-none tc">
      <span className="f4 fw7 ttu mh4 v-mid">
        {title ?? <FormattedMessage {...messages.title} />}
      </span>
      <div className="flex">
        <ProductListProvider listName={trackingId}>
          <div className={`w-20 ${styles.productSummary}`}>
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
              <Fragment key={`${products[current].productId}-${index}`}>
                <div className="self-center mh7">
                  <IconPlusLines />
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
          <div className="self-center mh7">
            <IconEqual />
          </div>
          <div className="self-center">
            <div>
              <FormattedMessage
                {...messages.totalProducts}
                values={{ total: totalProducts }}
              />
            </div>
            <div>
              <FormattedCurrency value={totalPrice} />
            </div>
          </div>
        </ProductListProvider>
      </div>
    </div>
  )
}

BuyTogether.schema = {
  title: 'admin/editor.buy-together.title',
}

export default BuyTogether
