/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/ban-types */

import React, { useState, useEffect } from 'react'
import { ipcRenderer, remote } from 'electron'

interface TemplateProps {
  tableName: string,
  title: string,
  columnNames: Array<string>
}

interface RowProps {
  tableName: string,
  row: Object,
  refresh: Function
}

interface AddRowProps {
  tableName: string,
  fields: Array<string>,
  refresh: Function
}

const AddRow = ({ tableName, fields, refresh }: AddRowProps): JSX.Element => {
  const [addMode, setAddMode] = useState(false)
  useEffect(() => setAddMode(false), [])

  const RowAdd = (): JSX.Element =>
    <button className='secondary shadow' 
      onClick={() => setAddMode(true)}>
        + Add new record
    </button>

  const RowFields = (): JSX.Element => {
    const [rowFields, setRowFields] = useState(new Array(fields.length).fill(''))
    const query = `INSERT INTO ${tableName} VALUES ('${rowFields.join("','")}')`

    function onAdd () {
      ipcRenderer.sendSync('query', query)
      setAddMode(false)
      refresh()
    }

    return (
      <div className='secondary shadow'>
        {fields.map((field, i) => 
          <input key={i} type="text" placeholder={field}
            value={rowFields[i]} onChange={e => {
              setRowFields([...rowFields.slice(0, i), e.target.value, ...rowFields.slice(i + 1)])
            }} />
        )}
        <div>
          <button onClick={onAdd}>Add</button>
          <button onClick={() => setAddMode(false)}>Cancel</button>
        </div>
      </div>
    )
  }

  return addMode ? <RowFields/> : <RowAdd />
}

const Row = ({ tableName, row, refresh }: RowProps): JSX.Element => {
  const [rowFields, setRowFields] = useState(new Array(Object.keys(row).length).fill(''))
  const rowFieldNames = Object.keys(row)
  const rowFieldValues = Object.values(row)

  const [isModified, setModified] = useState(false)
  useEffect(() => { setModified(rowFields.some(field => field.length > 0)) }, rowFields)

  // Assuming that the primary key is always the first column.
  const primaryKey = `${rowFieldNames[0]} = '${rowFieldValues[0]}'`

  function onModify () {
    const parameters = rowFields
      .map((field, i) => [i, field]) // Pair up each field with their respective column index.
      .filter(field => field[1].length > 0) // Take only the fields that are to be modified.
      .map(([i, field]) => `${rowFieldNames[i]} = '${field}'`) // Form the parameter strings.

    const modifyQuery = `UPDATE ${tableName} SET ${parameters.join()} WHERE (${primaryKey})`
    
    // Prompt for confirmation.
    remote.dialog.showMessageBox({
      title: 'Modify Record',
      message: 'Are you sure you want modify this record?',
      detail: modifyQuery,
      buttons: ['Modify', 'Cancel']
    })
      .then(({ response }) => {
        // If ok then execute the query.
        if (response === 0) {
          ipcRenderer.sendSync('query', modifyQuery)
          setRowFields(rowFields.fill(''))
          setModified(false) // This should've been handled by the useEffect but idk why its not working.
          refresh()
        }
      })
  }

  function onDelete () {
    const deleteQuery = `DELETE FROM ${tableName} WHERE (${primaryKey})`
  
    // Prompt for confirmation.
    remote.dialog.showMessageBox({
      title: 'Delete Record',
      message: 'Are you sure you want to delete this record?',
      detail: deleteQuery,
      buttons: ['Delete', 'Cancel']
    })
      .then(({ response }) => {
        // If ok then execute the query.
        if (response === 0) {
          ipcRenderer.sendSync('query', deleteQuery)
          refresh()
        }
      })
  }

  return (
    <div className='secondary shadow'>
      {rowFieldValues.map((field, i) => 
        <input key={i} type="text" placeholder={field}
          value={rowFields[i]} onChange={e => {
            setRowFields([...rowFields.slice(0, i), e.target.value, ...rowFields.slice(i + 1)])
          }} />
      )}
      <div>
        <button onClick={onModify}
          style={{ display: isModified ? 'block' : 'none' }}>
          Save Changes
        </button>
        <button onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  )
}

const RefPageTemplate = ({ tableName, title, columnNames }: TemplateProps): JSX.Element => {
  const [data, setData] = useState<Array<Object>>()
  useEffect(refreshView, [])

  function refreshView () {
    setData(ipcRenderer.sendSync('query', `SELECT * FROM ${tableName}`))
  }

  return (
    <div className='ref-page'>
      <h1>{title}</h1>
      <div className='accent2 shadow'>
        {columnNames.map((columnName, i) => 
          <div key={i}>{columnName}</div>
        )}
      </div>
      {data?.map((row, i) => 
        <Row key={i} tableName={tableName} row={row} refresh={refreshView} />
      )}
      <AddRow tableName={tableName} refresh={refreshView} 
        fields={columnNames.map(columnName => `New ${columnName}`)} />
    </div>
  )
}

export default RefPageTemplate
