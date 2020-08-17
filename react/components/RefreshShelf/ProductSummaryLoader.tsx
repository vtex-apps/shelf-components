import ContentLoader from 'react-content-loader'
import React from 'react'

const ProductSummaryLoader = () => (
  <ContentLoader height="560" width="300" speed={2}>
    <rect x="0" y="0" rx="3" ry="3" width="100%" height="300" />
    <rect x="0" y="310" rx="3" ry="3" width="100%" height="30" />
    <rect x="0" y="370" rx="3" ry="3" width="50%" height="16" />
    <rect x="0" y="390" rx="3" ry="3" width="80%" height="23" />
    <rect x="0" y="420" rx="3" ry="3" width="80%" height="16" />
    <rect x="0" y="480" rx="3" ry="3" width="100%" height="40" />
  </ContentLoader>
)

export default ProductSummaryLoader
