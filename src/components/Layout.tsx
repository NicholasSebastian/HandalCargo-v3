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
import ContainerGroups from '../pages/ContainerGroups'

const { dialog } = remote

interface NavButtonProps {
  headerName: string,
  icon: string,
  index: number
}

const App = (): JSX.Element => {

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
      ['Container Groups', 'Shippers', 'Routes', 'Handlers', 'Planes', 'Currencies', 'Product Details', 'Expeditions'],
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

    const NavButton = ({ index, icon, headerName }: NavButtonProps): JSX.Element => {
      return (
        <button onClick={() => 
          selected !== index ? setSelected(index) : setSelected(null)}>
          <img src={icon} />
          <span>{headerName}</span>
        </button>
      )
    }

    return (
      <nav id="sidenav">
        <div>
          <NavButton headerName='Shipping' icon={shippingIcon} index={0} />
          <NavButton headerName='Master' icon={referencesIcon} index={1} />
          <NavButton headerName='References' icon={reportsIcon} index={2} />
          <NavButton headerName='Reports' icon={settingsIcon} index={3} />
          <NavButton headerName='Settings' icon={logoutIcon} index={4} />
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
          <Route path="/container-groups" component={ ContainerGroups } />
        </Switch>
      </div>
    </Router>
  )
}

export default App
