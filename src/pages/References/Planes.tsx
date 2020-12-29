import React from 'react'
import RefPageTemplate from '../../components/RefPageTemplate'

const Planes = (): JSX.Element => {
  return (
    <RefPageTemplate
      tableName="pesawat"
      title="Planes"
      columnNames={['Plane Code', 'Name']} />
  )
}

export default Planes
