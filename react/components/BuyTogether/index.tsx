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

const mock1 = {
  cacheId: 'blouse',
  productId: '2000009',
  description: 'Perfect for any moment.',
  productName: 'Blouse',
  productReference: '11113',
  linkText: 'blouse',
  brand: 'BWE',
  brandId: 2000000,
  link: 'https://portal.vtexcommercestable.com.br/blouse/p',
  categories: [
    '/Apparel & Accessories/Clothing/Tops/',
    '/Apparel & Accessories/Clothing/',
    '/Apparel & Accessories/',
    '/Apparel & Accessories/Accessories/',
  ],
  priceRange: {
    sellingPrice: { highPrice: 24, lowPrice: 24, __typename: 'PriceRange' },
    listPrice: { highPrice: 24, lowPrice: 24, __typename: 'PriceRange' },
    __typename: 'ProductPriceRange',
  },
  specificationGroups: [
    {
      name: 'Specifications',
      originalName: 'Specifications',
      specifications: [
        {
          name: 'Sleeve type',
          originalName: 'Sleeve type',
          values: ['Sleeveless'],
          __typename: 'SpecificationGroupProperty',
        },
      ],
      __typename: 'SpecificationGroup',
    },
    {
      name: 'allSpecifications',
      originalName: 'allSpecifications',
      specifications: [
        {
          name: 'Sleeve type',
          originalName: 'Sleeve type',
          values: ['Sleeveless'],
          __typename: 'SpecificationGroupProperty',
        },
      ],
      __typename: 'SpecificationGroup',
    },
  ],
  items: [
    {
      itemId: '2000545',
      name: 'Brown',
      nameComplete: 'Blouse Brown',
      complementName: 'simplicity and delicacy',
      ean: '11113',
      variations: [
        { name: 'Color', values: ['Brown'], __typename: 'Property' },
      ],
      referenceId: [{ Key: 'RefId', Value: '12349', __typename: 'Reference' }],
      measurementUnit: 'un',
      unitMultiplier: 1,
      images: [
        {
          cacheId: '155504',
          imageId: '155504',
          imageLabel: 'front',
          imageTag:
            '<img src="~/arquivos/ids/155504-#width#-#height#/Blouse1.png?v=636869725623330000" width="#width#" height="#height#" alt="Blouse" id="" />',
          imageUrl:
            'https://storecomponents.vtexassets.com/arquivos/ids/155504/Blouse1.png?v=636869725623330000',
          imageText: 'Blouse',
          __typename: 'Image',
        },
        {
          cacheId: '155505',
          imageId: '155505',
          imageLabel: 'blouseback',
          imageTag:
            '<img src="~/arquivos/ids/155505-#width#-#height#/Blouse2.png?v=636869725946670000" width="#width#" height="#height#" alt="Blouse" id="" />',
          imageUrl:
            'https://storecomponents.vtexassets.com/arquivos/ids/155505/Blouse2.png?v=636869725946670000',
          imageText: 'Blouse',
          __typename: 'Image',
        },
        {
          cacheId: '155506',
          imageId: '155506',
          imageLabel: 'details',
          imageTag:
            '<img src="~/arquivos/ids/155506-#width#-#height#/Blouse4.png?v=636869726474600000" width="#width#" height="#height#" alt="blouse-details" id="" />',
          imageUrl:
            'https://storecomponents.vtexassets.com/arquivos/ids/155506/Blouse4.png?v=636869726474600000',
          imageText: 'blouse-details',
          __typename: 'Image',
        },
      ],
      sellers: [
        {
          sellerId: '1',
          sellerName: 'VTEX',
          commertialOffer: {
            discountHighlights: [],
            teasers: [
              {
                name: 'preco-a-vista',
                conditions: {
                  minimumQuantity: 0,
                  parameters: [
                    {
                      name: 'PaymentMethodId',
                      value: '6',
                      __typename: 'TeaserValue',
                    },
                  ],
                  __typename: 'TeaserCondition',
                },
                effects: {
                  parameters: [
                    {
                      name: 'PercentualDiscount',
                      value: '8.0',
                      __typename: 'TeaserValue',
                    },
                  ],
                  __typename: 'TeaserEffects',
                },
                __typename: 'Teaser',
              },
            ],
            Installments: [
              {
                Value: 12,
                InterestRate: 0,
                TotalValuePlusInterestRate: 24,
                NumberOfInstallments: 2,
                Name: 'Visa 2 vezes sem juros',
                PaymentSystemName: 'Visa',
                __typename: 'Installment',
              },
            ],
            Price: 24,
            ListPrice: 24,
            Tax: 0,
            taxPercentage: 0,
            spotPrice: 22.1,
            PriceWithoutDiscount: 24,
            RewardValue: 0,
            PriceValidUntil: '2021-07-29T18:14:47.8272485Z',
            AvailableQuantity: 3000000,
            __typename: 'Offer',
          },
          __typename: 'Seller',
        },
      ],
      __typename: 'SKU',
    },
    {
      itemId: '2000549',
      name: 'Pink',
      nameComplete: 'Blouse Pink',
      complementName: 'simplicity and delicacy',
      ean: '234324',
      variations: [{ name: 'Color', values: ['Pink'], __typename: 'Property' }],
      referenceId: null,
      measurementUnit: 'un',
      unitMultiplier: 1,
      images: [
        {
          cacheId: '155591',
          imageId: '155591',
          imageLabel: 'Frente1',
          imageTag:
            '<img src="~/arquivos/ids/155591-#width#-#height#/Capturar21.png?v=637088270177770000" width="#width#" height="#height#" alt="Frente" id="" />',
          imageUrl:
            'https://storecomponents.vtexassets.com/arquivos/ids/155591/Capturar21.png?v=637088270177770000',
          imageText: 'Frente',
          __typename: 'Image',
        },
        {
          cacheId: '155592',
          imageId: '155592',
          imageLabel: 'Frente1',
          imageTag:
            '<img src="~/arquivos/ids/155592-#width#-#height#/capturar22.png?v=637088270345830000" width="#width#" height="#height#" alt="costas" id="" />',
          imageUrl:
            'https://storecomponents.vtexassets.com/arquivos/ids/155592/capturar22.png?v=637088270345830000',
          imageText: 'costas',
          __typename: 'Image',
        },
        {
          cacheId: '155593',
          imageId: '155593',
          imageLabel: 'Frente1',
          imageTag:
            '<img src="~/arquivos/ids/155593-#width#-#height#/Capturar23.png?v=637088270562730000" width="#width#" height="#height#" alt="Detalhe" id="" />',
          imageUrl:
            'https://storecomponents.vtexassets.com/arquivos/ids/155593/Capturar23.png?v=637088270562730000',
          imageText: 'Detalhe',
          __typename: 'Image',
        },
        {
          cacheId: '155594',
          imageId: '155594',
          imageLabel: 'Frente1',
          imageTag:
            '<img src="~/arquivos/ids/155594-#width#-#height#/Capturar24.png?v=637088270776100000" width="#width#" height="#height#" alt="Detalhe" id="" />',
          imageUrl:
            'https://storecomponents.vtexassets.com/arquivos/ids/155594/Capturar24.png?v=637088270776100000',
          imageText: 'Detalhe',
          __typename: 'Image',
        },
      ],
      sellers: [
        {
          sellerId: '1',
          sellerName: 'VTEX',
          commertialOffer: {
            discountHighlights: [],
            teasers: [
              {
                name: 'preco-a-vista',
                conditions: {
                  minimumQuantity: 0,
                  parameters: [
                    {
                      name: 'PaymentMethodId',
                      value: '6',
                      __typename: 'TeaserValue',
                    },
                  ],
                  __typename: 'TeaserCondition',
                },
                effects: {
                  parameters: [
                    {
                      name: 'PercentualDiscount',
                      value: '8.0',
                      __typename: 'TeaserValue',
                    },
                  ],
                  __typename: 'TeaserEffects',
                },
                __typename: 'Teaser',
              },
            ],
            Installments: [
              {
                Value: 12,
                InterestRate: 0,
                TotalValuePlusInterestRate: 24,
                NumberOfInstallments: 2,
                Name: 'Visa 2 vezes sem juros',
                PaymentSystemName: 'Visa',
                __typename: 'Installment',
              },
            ],
            Price: 24,
            ListPrice: 24,
            Tax: 0,
            taxPercentage: 0,
            spotPrice: 22.1,
            PriceWithoutDiscount: 24,
            RewardValue: 0,
            PriceValidUntil: '2021-07-29T18:14:47.8413152Z',
            AvailableQuantity: 3000000,
            __typename: 'Offer',
          },
          __typename: 'Seller',
        },
      ],
      __typename: 'SKU',
    },
  ],
  skuSpecifications: [
    {
      field: {
        name: 'Color',
        originalName: 'Color',
        __typename: 'SKUSpecificationField',
      },
      values: [
        {
          name: 'Pink',
          originalName: 'Pink',
          __typename: 'SKUSpecificationValue',
        },
        {
          name: 'Brown',
          originalName: 'Brown',
          __typename: 'SKUSpecificationValue',
        },
      ],
      __typename: 'SkuSpecification',
    },
  ],
  productClusters: [
    {
      id: '1943',
      name: 'Coleção Primavera Verão',
      __typename: 'ProductClusters',
    },
  ],
  properties: [
    { name: 'Sleeve type', values: ['Sleeveless'], __typename: 'Property' },
  ],
  selectedProperties: null,
  __typename: 'Product',
  sku: {
    itemId: '2000545',
    name: 'Brown',
    nameComplete: 'Blouse Brown',
    complementName: 'simplicity and delicacy',
    ean: '11113',
    measurementUnit: 'un',
    unitMultiplier: 1,
    images: [
      {
        cacheId: '155504',
        imageId: '155504',
        imageLabel: 'front',
        imageTag:
          '<img src="~/arquivos/ids/155504-#width#-#height#/Blouse1.png?v=636869725623330000" width="#width#" height="#height#" alt="Blouse" id="" />',
        imageUrl:
          'https://storecomponents.vtexassets.com/arquivos/ids/155504-500-auto?width=500&height=auto&aspect=true',
        imageText: 'Blouse',
        __typename: 'Image',
      },
      {
        cacheId: '155505',
        imageId: '155505',
        imageLabel: 'blouseback',
        imageTag:
          '<img src="~/arquivos/ids/155505-#width#-#height#/Blouse2.png?v=636869725946670000" width="#width#" height="#height#" alt="Blouse" id="" />',
        imageUrl:
          'https://storecomponents.vtexassets.com/arquivos/ids/155505-500-auto?width=500&height=auto&aspect=true',
        imageText: 'Blouse',
        __typename: 'Image',
      },
      {
        cacheId: '155506',
        imageId: '155506',
        imageLabel: 'details',
        imageTag:
          '<img src="~/arquivos/ids/155506-#width#-#height#/Blouse4.png?v=636869726474600000" width="#width#" height="#height#" alt="blouse-details" id="" />',
        imageUrl:
          'https://storecomponents.vtexassets.com/arquivos/ids/155506-500-auto?width=500&height=auto&aspect=true',
        imageText: 'blouse-details',
        __typename: 'Image',
      },
    ],
    __typename: 'SKU',
  },
}

const mock2 = {
  cacheId: 'st-tropez-shorts',
  productId: '2000004',
  description:
    "You can't look better during summer when you are using these shorts.",
  productName: 'St Tropez Top Shorts',
  productReference: '01212',
  linkText: 'st-tropez-shorts',
  brand: 'Samsung',
  brandId: 2000003,
  link: 'https://portal.vtexcommercestable.com.br/st-tropez-shorts/p',
  categories: [
    '/Apparel & Accessories/Clothing/Bottoms/',
    '/Apparel & Accessories/Clothing/',
    '/Apparel & Accessories/',
  ],
  priceRange: {
    sellingPrice: { highPrice: 3030, lowPrice: 80.1, __typename: 'PriceRange' },
    listPrice: { highPrice: 3030, lowPrice: 80.1, __typename: 'PriceRange' },
    __typename: 'ProductPriceRange',
  },
  specificationGroups: [
    {
      name: 'allSpecifications',
      originalName: 'allSpecifications',
      specifications: [],
      __typename: 'SpecificationGroup',
    },
  ],
  items: [
    {
      itemId: '2000535',
      name: 'Navy Blue',
      nameComplete: 'St Tropez Top Shorts Navy Blue',
      complementName: '',
      ean: '01212',
      variations: [{ name: 'Color', values: ['Blue'], __typename: 'Property' }],
      referenceId: null,
      measurementUnit: 'un',
      unitMultiplier: 1,
      images: [
        {
          cacheId: '155488',
          imageId: '155488',
          imageLabel: '',
          imageTag:
            '<img src="~/arquivos/ids/155488-#width#-#height#/Frame.jpg?v=636793838658230000" width="#width#" height="#height#" alt="Frame" id="" />',
          imageUrl:
            'https://storecomponents.vtexassets.com/arquivos/ids/155488/Frame.jpg?v=636793838658230000',
          imageText: 'Frame',
          __typename: 'Image',
        },
        {
          cacheId: '155626',
          imageId: '155626',
          imageLabel: '',
          imageTag:
            '<img src="~/arquivos/ids/155626-#width#-#height#/vtex.jpg?v=637214466642970000" width="#width#" height="#height#" alt="vtex" id="" />',
          imageUrl:
            'https://storecomponents.vtexassets.com/arquivos/ids/155626/vtex.jpg?v=637214466642970000',
          imageText: 'vtex',
          __typename: 'Image',
        },
      ],
      sellers: [
        {
          sellerId: '1',
          sellerName: 'VTEX',
          commertialOffer: {
            discountHighlights: [],
            teasers: [
              {
                name: 'preco-a-vista',
                conditions: {
                  minimumQuantity: 0,
                  parameters: [
                    {
                      name: 'PaymentMethodId',
                      value: '6',
                      __typename: 'TeaserValue',
                    },
                  ],
                  __typename: 'TeaserCondition',
                },
                effects: {
                  parameters: [
                    {
                      name: 'PercentualDiscount',
                      value: '8.0',
                      __typename: 'TeaserValue',
                    },
                  ],
                  __typename: 'TeaserEffects',
                },
                __typename: 'Teaser',
              },
            ],
            Installments: [
              {
                Value: 505,
                InterestRate: 0,
                TotalValuePlusInterestRate: 3030,
                NumberOfInstallments: 6,
                Name: 'Visa 6 vezes sem juros',
                PaymentSystemName: 'Visa',
                __typename: 'Installment',
              },
            ],
            Price: 3030,
            ListPrice: 3030,
            Tax: 0,
            taxPercentage: 0,
            spotPrice: 2787.6,
            PriceWithoutDiscount: 3030,
            RewardValue: 0,
            PriceValidUntil: '2021-07-24T12:47:00.3007533Z',
            AvailableQuantity: 94,
            __typename: 'Offer',
          },
          __typename: 'Seller',
        },
      ],
      __typename: 'SKU',
    },
    {
      itemId: '310124169',
      name: 'Green',
      nameComplete: 'St Tropez Top Shorts Green',
      complementName: '',
      ean: '23423533',
      variations: [
        { name: 'Color', values: ['Green'], __typename: 'Property' },
      ],
      referenceId: null,
      measurementUnit: 'un',
      unitMultiplier: 1,
      images: [
        {
          cacheId: '155607',
          imageId: '155607',
          imageLabel: 'Frente1',
          imageTag:
            '<img src="~/arquivos/ids/155607-#width#-#height#/St-Tropez-Top-Shorts---verde.jpg?v=637098724114770000" width="#width#" height="#height#" alt="Frente" id="" />',
          imageUrl:
            'https://storecomponents.vtexassets.com/arquivos/ids/155607/St-Tropez-Top-Shorts---verde.jpg?v=637098724114770000',
          imageText: 'Frente',
          __typename: 'Image',
        },
      ],
      sellers: [
        {
          sellerId: '1',
          sellerName: 'VTEX',
          commertialOffer: {
            discountHighlights: [],
            teasers: [
              {
                name: 'preco-a-vista',
                conditions: {
                  minimumQuantity: 0,
                  parameters: [
                    {
                      name: 'PaymentMethodId',
                      value: '6',
                      __typename: 'TeaserValue',
                    },
                  ],
                  __typename: 'TeaserCondition',
                },
                effects: {
                  parameters: [
                    {
                      name: 'PercentualDiscount',
                      value: '8.0',
                      __typename: 'TeaserValue',
                    },
                  ],
                  __typename: 'TeaserEffects',
                },
                __typename: 'Teaser',
              },
            ],
            Installments: [
              {
                Value: 13.4,
                InterestRate: 0,
                TotalValuePlusInterestRate: 80.1,
                NumberOfInstallments: 6,
                Name: 'Visa 6 vezes sem juros',
                PaymentSystemName: 'Visa',
                __typename: 'Installment',
              },
            ],
            Price: 80.1,
            ListPrice: 80.1,
            Tax: 0,
            taxPercentage: 0,
            spotPrice: 73.7,
            PriceWithoutDiscount: 80.1,
            RewardValue: 0,
            PriceValidUntil: '2021-07-24T12:47:00.2719967Z',
            AvailableQuantity: 3000000,
            __typename: 'Offer',
          },
          __typename: 'Seller',
        },
      ],
      __typename: 'SKU',
    },
  ],
  skuSpecifications: [
    {
      field: {
        name: 'Color',
        originalName: 'Color',
        __typename: 'SKUSpecificationField',
      },
      values: [
        {
          name: 'Green',
          originalName: 'Green',
          __typename: 'SKUSpecificationValue',
        },
        {
          name: 'Blue',
          originalName: 'Blue',
          __typename: 'SKUSpecificationValue',
        },
      ],
      __typename: 'SkuSpecification',
    },
  ],
  productClusters: [
    {
      id: '1943',
      name: 'Coleção Primavera Verão',
      __typename: 'ProductClusters',
    },
  ],
  properties: [],
  selectedProperties: null,
  __typename: 'Product',
  sku: {
    itemId: '2000535',
    name: 'Navy Blue',
    nameComplete: 'St Tropez Top Shorts Navy Blue',
    complementName: '',
    ean: '01212',
    referenceId: { Value: '' },
    measurementUnit: 'un',
    unitMultiplier: 1,
    images: [
      {
        cacheId: '155488',
        imageId: '155488',
        imageLabel: '',
        imageTag:
          '<img src="~/arquivos/ids/155488-#width#-#height#/Frame.jpg?v=636793838658230000" width="#width#" height="#height#" alt="Frame" id="" />',
        imageUrl:
          'https://storecomponents.vtexassets.com/arquivos/ids/155488-500-auto?width=500&height=auto&aspect=true',
        imageText: 'Frame',
        __typename: 'Image',
      },
      {
        cacheId: '155626',
        imageId: '155626',
        imageLabel: '',
        imageTag:
          '<img src="~/arquivos/ids/155626-#width#-#height#/vtex.jpg?v=637214466642970000" width="#width#" height="#height#" alt="vtex" id="" />',
        imageUrl:
          'https://storecomponents.vtexassets.com/arquivos/ids/155626-500-auto?width=500&height=auto&aspect=true',
        imageText: 'vtex',
        __typename: 'Image',
      },
    ],
    __typename: 'SKU',
  },
}

interface Props {
  title?: string
  suggestedProducts?: Product[][]
  BuyButton: React.ComponentType<{ skuItems: any[] }>
}

// interface SuggestedList {
//   products: Product[]
//   hidden: boolean
//   current: number
// }

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
  const [suggestedLists, setSuggestedLists] = useState<any[]>(
    suggestedProducts?.map(list => {
      return { products: list, hidden: false, current: 0 }
    }) ?? [
      { products: [mock1], current: 0, hidden: false },
      { products: [mock2, mock1], current: 0, hidden: false },
    ]
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
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
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
