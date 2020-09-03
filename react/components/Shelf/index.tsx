import React from 'react'
import { ExtensionPoint } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'

import styles from './styles.css'

interface Props {
  title?: string
  products?: Product[]
}

const CSS_HANDLES = ['shelfTitleContainer', 'shelfTitle']

const Shelf: StorefrontFunctionComponent<Props> = ({ title, products }) => {
  const handles = useCssHandles(CSS_HANDLES)

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
        <ExtensionPoint id="list-context.product-list" />
      )}
      {products && products.length > 0 && (
        <ExtensionPoint
          id="list-context.product-list-static"
          products={products}
        />
      )}
    </div>
  )
}

Shelf.schema = {
  title: 'admin/editor.shelf.title',
}

export default Shelf
