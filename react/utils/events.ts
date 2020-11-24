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

export const handleView = (push: (data: any) => void, page: string) => {
  return (shelf: string) => {
    push({
      page,
      event: 'shelf',
      eventType: EventType.View,
      shelf,
    })
  }
}
