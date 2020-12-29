import React from 'react'
import RefPageTemplate from '../../components/RefPageTemplate'

const ProductDetails = (): JSX.Element => {
  return (
    <RefPageTemplate
      tableName="keteranganbrg"
      title="Product Details"
      columnNames={['Product Code', 'Name']} />
  )
}

export default ProductDetails
