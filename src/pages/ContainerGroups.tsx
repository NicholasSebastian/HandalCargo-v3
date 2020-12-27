/* eslint-disable func-call-spacing */
/* eslint-disable @typescript-eslint/ban-types */

import React, { useState, useEffect, useRef } from 'react'
import { ipcRenderer, remote } from 'electron'

interface ContainerGroup {
  containercode: number,
  containerdesc: string,
  size: string
}

interface RowProps {
  row: ContainerGroup,
  refreshView: Function
}

interface AddRowProps {
  refreshView: Function
}

const Row = ({ row, refreshView }: RowProps) => {
  const primaryKey = useRef(row.containercode)
  const [isModified, setModified] = useState(false)

  const [containerCode, setContainerCode] = useState('')
  const [containerDesc, setContainerDesc] = useState('')
  const [size, setSize] = useState('')

  useEffect(() => {
    setModified (
      containerCode.length > 0 ||
      containerDesc.length > 0 ||
      size.length > 0
    )
  }, [containerCode, containerDesc, size])

  function onModify () {
    const parameters: Array<string> = []
    if (containerCode.length > 0) parameters.push(`containercode = '${containerCode}'`)
    if (containerDesc.length > 0) parameters.push(`containerdesc = '${containerDesc}'`)
    if (size.length > 0) parameters.push(`size = '${size}'`)

    const query = `UPDATE kelcontainer SET ${parameters.join()} WHERE (containercode = '${primaryKey.current}')`

    // Prompt for confirmation.
    remote.dialog.showMessageBox({
      title: 'Modify Record',
      message: 'Are you sure you want modify this record?',
      detail: query,
      buttons: ['Modify', 'Cancel']
    })
      .then(({ response }) => {
        // If ok then execute the query.
        if (response === 0) {
          ipcRenderer.sendSync('query', query)
          setContainerCode('')
          setContainerDesc('')
          setSize('')
          refreshView()
        }
      })
  }

  function onDelete () {
    const query = `DELETE FROM kelcontainer WHERE (containercode = '${primaryKey.current}')`

    // Prompt for confirmation.
    remote.dialog.showMessageBox({
      title: 'Delete Record',
      message: 'Are you sure you want to delete this record?',
      detail: query,
      buttons: ['Delete', 'Cancel']
    })
      .then(({ response }) => {
        // If ok then execute the query.
        if (response === 0) {
          ipcRenderer.sendSync('query', query)
          refreshView()
        }
      })
  }

  return (
    <div>
      <input type="text" placeholder={row.containercode.toString()}
        onChange={e => setContainerCode(e.target.value)} />
      <input type="text" placeholder={row.containerdesc}
        onChange={e => setContainerDesc(e.target.value)} />
      <input type="text" placeholder={row.size}
        onChange={e => setSize(e.target.value)} />
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

const AddRow = ({ refreshView }: AddRowProps): JSX.Element => {
  const [addMode, setAddMode] = useState(false)
  useEffect(() => setAddMode(false), [])

  const AddButton = (): JSX.Element =>
    <button onClick={() => setAddMode(true)}>+ Add new record</button>

  const RowFields = (): JSX.Element => {
    const [containerCode, setContainerCode] = useState('')
    const [containerDesc, setContainerDesc] = useState('')
    const [size, setSize] = useState('')

    const query = `INSERT INTO kelcontainer VALUES ('${containerCode}', '${containerDesc}', '${size}')`

    function onAdd () {
      ipcRenderer.sendSync('query', query)
      setAddMode(false)
      refreshView()
    }

    return (
      <div>
        <input type="text" placeholder="New container code"
          onChange={e => setContainerCode(e.target.value)} />
        <input type="text" placeholder="New container description"
          onChange={e => setContainerDesc(e.target.value)} />
        <input type="text" placeholder="New size"
          onChange={e => setSize(e.target.value)} />
        <div>
          <button onClick={onAdd}>Add</button>
          <button onClick={() => setAddMode(false)}>Cancel</button>
        </div>
      </div>
    )
  }

  return addMode ? <RowFields /> : <AddButton />
}

const ContainerGroups = (): JSX.Element => {
  const [data, setData] = useState<Array<ContainerGroup>>()
  useEffect(refreshView, [])

  function refreshView () {
    setData(ipcRenderer.sendSync('query', 'SELECT * FROM `kelcontainer`'))
  }

  return (
    <div className='ref-page'>
      <h1>Container Groups</h1>
      <div>
        <div>Container Code</div>
        <div>Container Description</div>
        <div>Size</div>
      </div>
      {data?.map((row, i) => <Row key={i} row={row} refreshView={refreshView} />)}
      <AddRow refreshView={refreshView} />
    </div>
  )
}

export default ContainerGroups
