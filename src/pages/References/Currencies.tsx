import React from 'react'
import RefPageTemplate from '../../components/RefPageTemplate'

const Currencies = (): JSX.Element => {
  return (
    <RefPageTemplate
      tableName="currency"
      title="Currencies"
      columnNames={['Currency Code', 'Name']} />
  )
}

export default Currencies
