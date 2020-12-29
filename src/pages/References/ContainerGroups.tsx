import React from 'react'
import RefPageTemplate from '../../components/RefPageTemplate'

const ContainerGroups = (): JSX.Element => {
  return (
    <RefPageTemplate
      tableName="kelcontainer"
      title="Container Groups"
      columnNames={['Container Group', 'Description', 'Size']} />
  )
}

export default ContainerGroups
