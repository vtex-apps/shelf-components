export const mapSKUItemsToCartItems = (skuItems: Item[]) =>
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
