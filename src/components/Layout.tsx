import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import Header from '../components/Header'
import Sidenav from '../components/Sidenav'

import Dashboard from '../pages/Dashboard'
import SeaFreight from '../pages/Shipping/SeaFreight'
import AirCargo from '../pages/Shipping/AirCargo'
import Customers from '../pages/Shipping/Customers'

import ContainerGroups from '../pages/References/ContainerGroups'
import Carriers from '../pages/References/Carriers'
import Routes from '../pages/References/Route'
import Handlers from '../pages/References/Handlers'
import Planes from '../pages/References/Planes'
import Currencies from '../pages/References/Currencies'
import ProductDetails from '../pages/References/ProductDetails'
import Expeditions from '../pages/References/Expeditions'

import AccessLevels from '../pages/Master/AccessLevels'
import BackupAndRestore from '../pages/Master/Backup'

interface AppProps {
  username: string
}

const App = ({ username }: AppProps): JSX.Element => {
  return (
    <Router>
      <div id="main">
        <Header username={username} />
        <Sidenav />
        <Switch>
          <Route path="/" exact component={ Dashboard } />
          <Route path="/sea-freight" component={ SeaFreight } />
          <Route path="/air-cargo" component={ AirCargo } />
          <Route path="/customers" component={ Customers } />
          <Route path="/container-groups" component={ ContainerGroups } />
          <Route path="/carriers" component={ Carriers } />
          <Route path="/routes" component={ Routes } />
          <Route path="/handlers" component={ Handlers } />
          <Route path="/planes" component={ Planes } />
          <Route path="/currencies" component={ Currencies } />
          <Route path="/product-details" component={ ProductDetails } />
          <Route path="/expeditions" component={ Expeditions } />
          <Route path="/access-levels" component={ AccessLevels } />
          <Route path="/backup-and-restore" component={ BackupAndRestore } />
        </Switch>
      </div>
    </Router>
  )
}

export default App
