import React from 'react'
import { ExtensionPoint, useRuntime } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'
import { usePixel } from 'vtex.pixel-manager/PixelContext'

import styles from './styles.css'
import { handleProductClick } from '../../utils/events'

interface Props {
  title?: string
  products?: Product[]
}

const CSS_HANDLES = ['shelfTitleContainer', 'shelfTitle']

const Shelf: StorefrontFunctionComponent<Props> = ({ title, products }) => {
  const handles = useCssHandles(CSS_HANDLES)
  const { page } = useRuntime()
  const { push } = usePixel()
  const onProductClick = handleProductClick(push, page)

  return (
    <div className="flex-none tc">
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
