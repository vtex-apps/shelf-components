import React, { useRef } from 'react'
import { ExtensionPoint, useRuntime } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'
import { usePixel } from 'vtex.pixel-manager/PixelContext'
import { useRecommendation } from 'vtex.recommendation-context/RecommendationContext'

import styles from './styles.css'
import { useOnView } from '../../hooks/useOnView'
import { useEvents } from '../../hooks/useEvents'

interface Props {
  title?: string
  products?: Product[]
}

const CSS_HANDLES = ['shelfTitleContainer', 'shelfTitle']

const Shelf: StorefrontFunctionComponent<Props> = ({ title, products }) => {
  const handles = useCssHandles(CSS_HANDLES)
  const { page } = useRuntime()
  const { push } = usePixel()
  const ref = useRef<HTMLDivElement | null>(null)
  const recommendation = useRecommendation?.()
  const { onView, onProductClick } = useEvents(recommendation, push, page)

  useOnView({
    ref,
    onView: () => onView('default'),
    once: true,
    initializeOnInteraction: true,
  })

  return (
    <div className="flex-none tc" ref={ref}>
      {title && (
        <div className={`mv4 v-mid ${handles.shelfTitleContainer}`}>
          <span className={`${styles.shelfTitle} ${handles.shelfTitle}`}>
            {title}
          </span>
        </div>
      )}
      {(!products || products.length === 0) && (
        <ExtensionPoint
          id="list-context.product-list"
          actionOnProductClick={onProductClick}
        />
      )}
      {products && products.length > 0 && (
        <ExtensionPoint
          id="list-context.product-list-static"
          products={products}
          actionOnProductClick={onProductClick}
        />
      )}
    </div>
  )
}

Shelf.schema = {
  title: 'admin/editor.shelf.title',
}

export default Shelf
