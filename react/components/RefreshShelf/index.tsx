import React from 'react'

import RefreshProductSummary from './RefreshProductSummary'
import SuggestedProducts from './SuggestedProducts'
import styles from './styles.css'

interface SuggestedProductsList {
  baseProductId: string
  suggestedProductsIds?: string
  category?: string
  specificationFilters?: Array<{ id: string; value: string }>
  collection?: string
  orderBy?: string
  hideUnavailableItems?: boolean
  maxItems?: number
  skusFilter?: string
  installmentCriteria?: string
}

interface RefreshShelfProps {
  baseProductTitle?: string
  suggestedProductsTitle?: string
  suggestedLists?: SuggestedProductsList[]
  baseProducts?: any[]
  recommendedProducts?: any[]
  sliderLayout: {
    showNavigationArrows: string
    showPaginationDots: string
  }
}

const mockProducts = [
  {
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
  },
  {
    cacheId: 'asduashduas-copy-2000035-',
    productId: '2000035',
    productName: 'Different Seller BRA',
    productReference: 'S2k4',
    description: '',
    link:
      'https://portal.vtexcommercestable.com.br/asduashduas-copy-2000035-/p',
    linkText: 'asduashduas-copy-2000035-',
    brand: 'Kawasaki',
    brandId: 2000001,
    categories: [
      '/Apparel & Accessories/Clothing/Tops/',
      '/Apparel & Accessories/Clothing/',
      '/Apparel & Accessories/',
    ],
    priceRange: {
      sellingPrice: { highPrice: 13, lowPrice: 13, __typename: 'PriceRange' },
      listPrice: { highPrice: 13, lowPrice: 13, __typename: 'PriceRange' },
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
        name: 'Seller 2 Copy',
        itemId: '2000594',
        measurementUnit: 'un',
        unitMultiplier: 1,
        referenceId: null,
        images: [
          {
            imageUrl:
              'https://storecomponents.vtexassets.com/arquivos/ids/155553/download.png?v=637027012534770000',
            imageTag:
              '<img src="~/arquivos/ids/155553-#width#-#height#/download.png?v=637027012534770000" width="#width#" height="#height#" alt="download" id="" />',
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
                  Value: 6.5,
                  InterestRate: 0,
                  TotalValuePlusInterestRate: 13,
                  NumberOfInstallments: 2,
                  Name: 'Customer Credit 2 vezes sem juros',
                  __typename: 'Installment',
                },
              ],
              AvailableQuantity: 1000000,
              Price: 13,
              PriceWithoutDiscount: 13,
              ListPrice: 13,
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
      name: 'Seller 2 Copy',
      itemId: '2000594',
      measurementUnit: 'un',
      unitMultiplier: 1,
      referenceId: { Value: '' },
      images: [
        {
          imageUrl:
            'https://storecomponents.vtexassets.com/arquivos/ids/155553-500-auto?width=500&height=auto&aspect=true',
          imageTag:
            '<img src="~/arquivos/ids/155553-#width#-#height#/download.png?v=637027012534770000" width="#width#" height="#height#" alt="download" id="" />',
          imageLabel: '',
          __typename: 'Image',
        },
      ],
      __typename: 'SKU',
    },
  },
  {
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
  },
  {
    cacheId: 'asduashduas-copy-2000035-',
    productId: '2000035',
    productName: 'Different Seller BRA',
    productReference: 'S2k4',
    description: '',
    link:
      'https://portal.vtexcommercestable.com.br/asduashduas-copy-2000035-/p',
    linkText: 'asduashduas-copy-2000035-',
    brand: 'Kawasaki',
    brandId: 2000001,
    categories: [
      '/Apparel & Accessories/Clothing/Tops/',
      '/Apparel & Accessories/Clothing/',
      '/Apparel & Accessories/',
    ],
    priceRange: {
      sellingPrice: { highPrice: 13, lowPrice: 13, __typename: 'PriceRange' },
      listPrice: { highPrice: 13, lowPrice: 13, __typename: 'PriceRange' },
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
        name: 'Seller 2 Copy',
        itemId: '2000594',
        measurementUnit: 'un',
        unitMultiplier: 1,
        referenceId: null,
        images: [
          {
            imageUrl:
              'https://storecomponents.vtexassets.com/arquivos/ids/155553/download.png?v=637027012534770000',
            imageTag:
              '<img src="~/arquivos/ids/155553-#width#-#height#/download.png?v=637027012534770000" width="#width#" height="#height#" alt="download" id="" />',
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
                  Value: 6.5,
                  InterestRate: 0,
                  TotalValuePlusInterestRate: 13,
                  NumberOfInstallments: 2,
                  Name: 'Customer Credit 2 vezes sem juros',
                  __typename: 'Installment',
                },
              ],
              AvailableQuantity: 1000000,
              Price: 13,
              PriceWithoutDiscount: 13,
              ListPrice: 13,
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
      name: 'Seller 2 Copy',
      itemId: '2000594',
      measurementUnit: 'un',
      unitMultiplier: 1,
      referenceId: { Value: '' },
      images: [
        {
          imageUrl:
            'https://storecomponents.vtexassets.com/arquivos/ids/155553-500-auto?width=500&height=auto&aspect=true',
          imageTag:
            '<img src="~/arquivos/ids/155553-#width#-#height#/download.png?v=637027012534770000" width="#width#" height="#height#" alt="download" id="" />',
          imageLabel: '',
          __typename: 'Image',
        },
      ],
      __typename: 'SKU',
    },
  },
  {
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
  },
  {
    cacheId: 'asduashduas-copy-2000035-',
    productId: '2000035',
    productName: 'Different Seller BRA',
    productReference: 'S2k4',
    description: '',
    link:
      'https://portal.vtexcommercestable.com.br/asduashduas-copy-2000035-/p',
    linkText: 'asduashduas-copy-2000035-',
    brand: 'Kawasaki',
    brandId: 2000001,
    categories: [
      '/Apparel & Accessories/Clothing/Tops/',
      '/Apparel & Accessories/Clothing/',
      '/Apparel & Accessories/',
    ],
    priceRange: {
      sellingPrice: { highPrice: 13, lowPrice: 13, __typename: 'PriceRange' },
      listPrice: { highPrice: 13, lowPrice: 13, __typename: 'PriceRange' },
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
        name: 'Seller 2 Copy',
        itemId: '2000594',
        measurementUnit: 'un',
        unitMultiplier: 1,
        referenceId: null,
        images: [
          {
            imageUrl:
              'https://storecomponents.vtexassets.com/arquivos/ids/155553/download.png?v=637027012534770000',
            imageTag:
              '<img src="~/arquivos/ids/155553-#width#-#height#/download.png?v=637027012534770000" width="#width#" height="#height#" alt="download" id="" />',
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
                  Value: 6.5,
                  InterestRate: 0,
                  TotalValuePlusInterestRate: 13,
                  NumberOfInstallments: 2,
                  Name: 'Customer Credit 2 vezes sem juros',
                  __typename: 'Installment',
                },
              ],
              AvailableQuantity: 1000000,
              Price: 13,
              PriceWithoutDiscount: 13,
              ListPrice: 13,
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
      name: 'Seller 2 Copy',
      itemId: '2000594',
      measurementUnit: 'un',
      unitMultiplier: 1,
      referenceId: { Value: '' },
      images: [
        {
          imageUrl:
            'https://storecomponents.vtexassets.com/arquivos/ids/155553-500-auto?width=500&height=auto&aspect=true',
          imageTag:
            '<img src="~/arquivos/ids/155553-#width#-#height#/download.png?v=637027012534770000" width="#width#" height="#height#" alt="download" id="" />',
          imageLabel: '',
          __typename: 'Image',
        },
      ],
      __typename: 'SKU',
    },
  },
]

const RefreshShelf: StorefrontFunctionComponent<RefreshShelfProps> = ({
  baseProductTitle,
  suggestedProductsTitle,
  suggestedLists,
  baseProducts,
  recommendedProducts,
  ...props
}) => {
  const handleChangeProduct = (id: number) => {
    // console.log(id, props)
    // get index no baseProducts, pegar recommendedProducts[index]
  }

  return (
    <div
      className={`flex flex-wrap flex-nowrap-ns justify-around ${styles.refreshShelf}`}
    >
      <RefreshProductSummary
        title={baseProductTitle}
        products={baseProducts ?? mockProducts}
        onChangeProduct={handleChangeProduct}
      />
      <SuggestedProducts
        title={suggestedProductsTitle}
        products={recommendedProducts ?? mockProducts}
        sliderProps={props.sliderLayout}
      />
    </div>
  )
}

RefreshShelf.schema = {
  title: 'admin/editor.refresh-shelf.title',
}

export default RefreshShelf
