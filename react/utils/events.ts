const enum EventType {
  ProductClick = 'productClick',
  AddToCart = 'addToCart',
  View = 'shelfView',
}

export const handleProductClick = (push: (data: any) => void, page: string) => {
  return (product: any) => {
    push({
      page,
      event: 'shelf',
      eventType: EventType.ProductClick,
      product,
    })
  }
}

export const handleAddToCart = (push: (data: any) => void, page: string) => {
  return (items: any[]) => {
    push({
      page,
      event: 'shelf',
      eventType: EventType.AddToCart,
      items,
    })
  }
}

export const handleView = (push: (data: any) => void, page: string) => {
  return (product: any) => {
    push({
      page,
      event: 'shelf',
      eventType: EventType.View,
      product,
    })
  }
}
