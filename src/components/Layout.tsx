import React, { useState } from 'react'
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { remote } from 'electron'

import Dashboard from '../pages/Dashboard'
import SeaFreight from '../pages/SeaFreight'

const { dialog } = remote

function App (): JSX.Element {
  const Sidenav = () => {
    const [selected, setSelected] = useState<number | null>(null)

    return (
      <nav id="sidenav">
        <div>
          <button onClick={() => setSelected(selected === 0 ? null : 0)}>
            Shipping
          </button>
          <div style={{ display: selected === 0 ? 'block' : 'none' }}>
            <Link to="/seafreight">Sea Freight</Link>
            <Link to="/">Air Cargo</Link>
            <Link to="/">Invoice Entry</Link>
            <Link to="/">Payment</Link>
          </div>
        </div>
        <div>
          <button onClick={() => setSelected(selected === 1 ? null : 1)}>
            Master
          </button>
          <div style={{ display: selected === 1 ? 'block' : 'none' }}>
            <Link to="/">Customers</Link>
            <Link to="/">Staff</Link>
          </div>
        </div>
        <div>
          <button onClick={() => setSelected(selected === 2 ? null : 2)}>
            References
          </button>
          <div style={{ display: selected === 2 ? 'block' : 'none' }}>
            <Link to="/">Customer Groups</Link>
            <Link to="/">Shippers</Link>
            <Link to="/">Routes</Link>
            <Link to="/">Handlers</Link>
            <Link to="/">Planes</Link>
            <Link to="/">Currencies</Link>
            <Link to="/">Product Details</Link>
            <Link to="/">Expeditions</Link>
          </div>
        </div>
        <div>
          <button onClick={() => setSelected(selected === 3 ? null : 3)}>
            Reports
          </button>
          <div style={{ display: selected === 3 ? 'block' : 'none' }}>
            <Link to="/">Dashboard</Link>
            <Link to="/">Payroll</Link>
          </div>
        </div>
        <div>
          <button onClick={() => setSelected(selected === 4 ? null : 4)}>
            Settings
          </button>
          <div style={{ display: selected === 4 ? 'block' : 'none' }}>
            <Link to="/">Staff Groups</Link>
            <Link to="/">Company Setup</Link>
            <Link to="/">Backup and Restore</Link>
          </div>
        </div>
        <button onClick={() => {
          dialog.showMessageBox({
            title: 'Log Out and Exit',
            message: 'Log Out and Exit?',
            detail: 'This will close the application and its connection to the database.',
            buttons: ['Log Out and Exit', 'Cancel']
          }).then(({ response }) => {
            if (response === 0) {
              remote.getCurrentWindow().close()
            }
          })
        }}>
          Log Out and Exit
        </button>
      </nav>
    )
  }

  return (
    <Router>
      <header id="header">
        <h1>Handal Cargo</h1>
        <button>username</button>
      </header>
      <Sidenav />
      <Switch>
        <Route path="/" exact component={ Dashboard } />
        <Route path="/seafreight" component={ SeaFreight } />
      </Switch>
    </Router>
  )
}

export default App