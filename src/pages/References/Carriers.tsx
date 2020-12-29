import React from 'react'
import RefPageTemplate from '../../components/RefPageTemplate'

const Carriers = (): JSX.Element => {
  return (
    <RefPageTemplate
      tableName="shipper"
      title="Carriers"
      columnNames={['Carrier Group', 'Name']} />
  )
}

export default Carriers
