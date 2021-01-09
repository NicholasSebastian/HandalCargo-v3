import React from 'react'

function Customers (): JSX.Element {
  const columns = ['one', 'two', 'three', 'four']

  return (
    <div className='table-page'>
      <h1>Customers</h1>
      <table className='secondary shadow'>
        <thead>
          <tr>
            {columns.map((col, i) => <th key={i}>{col}</th>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
          </tr>
          <tr>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Customers
