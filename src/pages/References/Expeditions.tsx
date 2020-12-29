import React from 'react'
import RefPageTemplate from '../../components/RefPageTemplate'

const Expeditions = (): JSX.Element => {
  return (
    <RefPageTemplate
      tableName="expedisi"
      title="Expeditions"
      columnNames={['Expedition Code', 'Name', 'Route', 'Address', 'Phone 1', 'Phone 2', 'Fax', 'Details']} />
  )
}

export default Expeditions
