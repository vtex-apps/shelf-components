import React, { useState } from 'react'

import ProductSummaryWithActions from './ProductSummaryWithActions'

interface Props {
  children: any
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
// }

const mockList1 = {
  products: [mock, mock],
  hidden: false,
}
const mockList2 = {
  products: [mock],
  hidden: false,
}

const BuyTogether: StorefrontFunctionComponent<Props> = ({ children }) => {
  const [suggestedLists, setSuggestedLists] = useState([mockList1, mockList2])

  const onDelete = (index: number) => {
    const newSuggestedLists = suggestedLists.map((list, listIndex) =>
      listIndex !== index ? list : { ...list, hidden: true }
    )
    setSuggestedLists(newSuggestedLists)
  }

  // 'receber AddToCart do checkout antigo ou novo'

  return (
    <div className="flex-none tc">
      <span className="f4 fw7 ttu mh4 v-mid">Buy together</span>
      {!suggestedLists[0].hidden && (
        <ProductSummaryWithActions
          onDelete={onDelete}
          index={0}
          onRefresh={() => {}}
          product={mock}
        />
      )}
    </div>
  )
}

BuyTogether.schema = {
  title: 'admin/editor.buy-together.title',
}

export default BuyTogether
