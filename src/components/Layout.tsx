/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
import React, { useState } from 'react'
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { remote } from 'electron'

import shippingIcon from '../assets/shipping.png'
import masterIcon from '../assets/master.png'
import referencesIcon from '../assets/references.png'
import reportsIcon from '../assets/reports.png'
import settingsIcon from '../assets/settings.png'
import logoutIcon from '../assets/logoutandexit.png'

import Dashboard from '../pages/Dashboard'
import SeaFreight from '../pages/SeaFreight'
import AirCargo from '../pages/AirCargo'
import Customers from '../pages/Customers'
import CustomerGroups from '../pages/CustomerGroups'

const { dialog } = remote

function App (): JSX.Element {
  
  const Header = () => {
    return (
      <header id="header">
        <h1>Handal Cargo</h1>
        <button>username</button>
      </header>
    )
  }
  
  const Sidenav = () => {
    const [selected, setSelected] = useState<number | null>(null)

    const navElements = [
      ['Sea Freight', 'Air Cargo', 'Invoice Entry', 'Payment'],
      ['Customers', 'Staff'],
      ['Customer Groups', 'Shippers', 'Routes', 'Handlers', 'Planes', 'Currencies', 'Product Details', 'Expeditions'],
      ['Dashboard', 'Payroll'],
      ['Staff Groups', 'Company Setup', 'Backup and Restore']
    ]

    function promptExit () {
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
    }

    return (
      <nav id="sidenav">
        <div>
          <button onClick={() => 
            selected !== 0 ? setSelected(0) : setSelected(null)}>
            <img src={shippingIcon} />
            <span>Shipping</span>
          </button>
          <button onClick={() => 
            selected !== 1 ? setSelected(1) : setSelected(null)}>
            <img src={masterIcon} />
            <span>Master</span>
          </button>
          <button onClick={() => 
            selected !== 2 ? setSelected(2) : setSelected(null)}>
            <img src={referencesIcon} />
            <span>References</span>
          </button>
          <button onClick={() => 
            selected !== 3 ? setSelected(3) : setSelected(null)}>
            <img src={reportsIcon} />
            <span>Reports</span>
          </button>
          <button onClick={() => 
            selected !== 4 ? setSelected(4) : setSelected(null)}>
            <img src={settingsIcon} />
            <span>Settings</span>
          </button>
          <button onClick={promptExit}>
            <img src={logoutIcon} />
            <span>Log Out and Exit</span>
          </button>
        </div>
        <div>
          {selected !== null && 
          navElements[selected!].map(element => {
            const link = element === 'Dashboard' ? '/' : element.toLowerCase().replace(' ', '-')
            return <Link key={link} to={link}>{element}</Link>
          })}
        </div>
      </nav>
    )
  }

  return (
    <Router>
      <div id="main">
        <Header />
        <Sidenav />
        <Switch>
          <Route path="/" exact component={ Dashboard } />
          <Route path="/sea-freight" component={ SeaFreight } />
          <Route path="/air-cargo" component={ AirCargo } />
          <Route path="/customers" component={ Customers } />
          <Route path="/customer-groups" component={ CustomerGroups } />
        </Switch>
      </div>
    </Router>
  )
}

export default App
