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
    ['Sea Freight', 'Air Cargo', 'Invoice Entry', 'Payment', 'Customers'],
    ['Container Groups', 'Carriers', 'Routes', 'Handlers', 'Planes', 'Currencies', 'Product Details', 'Expeditions'],
    ['Dashboard', 'Payroll'],
    ['Staff', 'Staff Groups', 'Access Levels', 'Company Setup'],
    ['Database Settings', 'Backup and Restore']
  ]

  const NavButton = ({ index, icon, headerName }: NavButtonProps): JSX.Element => {
    return (
      <button onClick={() =>
        selected !== index ? setSelected(index) : setSelected(null)}>
        <img className='hover-dark' src={icon} />
        <span className='accent3'>{headerName}</span>
      </button>
    )
  }

  return (
    <nav id="sidenav">
      <div className='accent2'>
        <div>
          <NavButton headerName='Shipping' icon={shippingIcon} index={0} />
          <NavButton headerName='References' icon={referencesIcon} index={1} />
          <NavButton headerName='Reports' icon={reportsIcon} index={2} />
          <NavButton headerName='Master' icon={masterIcon} index={3} />
          <NavButton headerName='Settings' icon={configsIcon} index={4} />
        </div>
        <button onClick={() => ipcRenderer.send('logout')}>
          <img className='hover-dark' src={logoutIcon} />
          <span className='accent3'>Log Out and Exit</span>
        </button>
      </div>
      <div className='secondary shadow'>
        {selected !== null &&
        navElements[selected!].map(element => {
          const link = element === 'Dashboard' ? '/' : element.toLowerCase().replace(/ /g, '-')
          return <Link key={link} to={link} className='hover-light'>{element}</Link>
        })}
      </div>
    </nav>
  )
}

export default Sidenav
