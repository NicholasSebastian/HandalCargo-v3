/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ipcRenderer } from 'electron'

import shippingIcon from '../assets/shipping.png'
import masterIcon from '../assets/master.png'
import referencesIcon from '../assets/references.png'
import reportsIcon from '../assets/reports.png'
import configsIcon from '../assets/configs.png'
import logoutIcon from '../assets/logoutandexit.png'

interface NavButtonProps {
  headerName: string,
  icon: string,
  index: number
}

const Sidenav = (): JSX.Element => {
  const [selected, setSelected] = useState<number | null>(null)

  const navElements = [
    ['Sea Freight', 'Air Cargo', 'Invoice Entry', 'Payment'],
    ['Customers', 'Staff'],
    ['Container Groups', 'Carriers', 'Routes', 'Handlers', 'Planes', 'Currencies', 'Product Details', 'Expeditions'],
    ['Dashboard', 'Payroll'],
    ['Staff Groups', 'Company Setup', 'Backup and Restore']
  ]

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
        <div>
          <NavButton headerName='Shipping' icon={shippingIcon} index={0} />
          <NavButton headerName='Master' icon={masterIcon} index={1} />
          <NavButton headerName='References' icon={referencesIcon} index={2} />
          <NavButton headerName='Reports' icon={reportsIcon} index={3} />
          <NavButton headerName='Configuration' icon={configsIcon} index={4} />
        </div>
        <button onClick={() => ipcRenderer.send('logout')}>
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

export default Sidenav
