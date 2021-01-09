import React from 'react'
import { render } from 'react-dom'

import Context from './components/Context'
import Login from './components/Login'

import './styles/Layout.scss'
import './styles/Pages.scss'
import './styles/Theme.scss'

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

render(<Context><Login /></Context>, mainElement)
