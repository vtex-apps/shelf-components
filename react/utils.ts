export const mapSKUItemsToCartItems = (
  skuItems: Item[]
): Array<CartItem | null> =>
  skuItems.map(item => {
    const {
      selectedItem: {
        itemId,
        name,
        measurementUnit,
        images,
        referenceId,
        seller,
        sellers,
      },
      product: {
        productId,
        linkText,
        productName,
        brand,
        categories,
        productReference,
      },
    } = item
    const selectedSeller = seller ?? sellers[0]

    if (!selectedSeller) {
      return null
    }

    return {
      id: itemId,
      productId,
      quantity: 1,
      uniqueId: '',
      detailUrl: `/${linkText}/p`,
      name: productName,
      brand,
      category: categories && categories.length > 0 ? categories[0] : '',
      productRefId: productReference,
      seller: selectedSeller.sellerId,
      variant: name,
      skuName: name,
      price: selectedSeller.commertialOffer.PriceWithoutDiscount * 100,
      listPrice: selectedSeller.commertialOffer.ListPrice * 100,
      sellingPrice: selectedSeller.commertialOffer.Price * 100,
      sellingPriceWithAssemblies: selectedSeller.commertialOffer.Price * 100,
      measurementUnit,
      skuSpecifications: [],
      imageUrl: images[0]?.imageUrl,
      options: [],
      assemblyOptions: {
        added: [],
        removed: [],
        parentPrice: selectedSeller.commertialOffer.Price,
      },
      referenceId,
    }
  })

export const sortBaseProductsBySuggestedLists = (
  products: Product[],
  suggestedLists: SuggestedProductsList[]
) => {
  const ids =
    suggestedLists
      ?.map(list => list.baseProductId)
      .filter(id => id && id !== '') ?? []
  return products?.sort(
    (a: Product, b: Product) =>
      ids.indexOf(a.productId) - ids.indexOf(b.productId)
  )
}

export const sortProductsBySuggestedIds = (
  products: Product[],
  suggestedIds: string[]
) => {
  return products?.sort(
    (a: Product, b: Product) =>
      suggestedIds.indexOf(a.productId) - suggestedIds.indexOf(b.productId)
  )
}

export const sortItemsByLists = (
  items: Item[],
  suggestedLists: SuggestedList[]
) => {
  const ids = suggestedLists.map(list => list.products[list.current].productId)
  const copyItems: Item[] = Object.assign([], items)
  return copyItems.sort(
    (a: Item, b: Item) =>
      ids.indexOf(a.product.productId) - ids.indexOf(b.product.productId)
  )
}
