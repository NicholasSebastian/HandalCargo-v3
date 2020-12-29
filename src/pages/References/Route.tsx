import React from 'react'
import RefPageTemplate from '../../components/RefPageTemplate'

const Routes = (): JSX.Element => {
  return (
    <RefPageTemplate
      tableName="rute"
      title="Routes"
      columnNames={['Route Code', 'Description']} />
  )
}

export default Routes
