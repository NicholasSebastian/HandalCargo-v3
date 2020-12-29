import React from 'react'
import RefPageTemplate from '../../components/RefPageTemplate'

const Handlers = (): JSX.Element => {
  return (
    <RefPageTemplate
      tableName="pengurus"
      title="Handlers"
      columnNames={['Handler Code', 'Name']} />
  )
}

export default Handlers
