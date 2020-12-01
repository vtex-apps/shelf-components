import { useMemo } from 'react'

import { handleView, handleProductClick } from '../utils/events'

export const useEvents = (
  recommendation: { shouldSendEvents: boolean },
  push: (data: any) => void,
  page: string
) => {
  const shouldSendEvents = useMemo(() => {
    return recommendation?.shouldSendEvents
  }, [recommendation])
  const onView = shouldSendEvents ? handleView(push, page) : () => {}
  const onProductClick = shouldSendEvents
    ? handleProductClick(push, page)
    : () => {}

  return {
    onView,
    onProductClick,
  }
}
