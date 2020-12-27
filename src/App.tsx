import React from 'react'
import { render } from 'react-dom'

import Login from './components/Login'
import './styles/Layout.scss'
import './styles/Pages.scss'

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

render(<Login />, mainElement)
