/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/ban-types */
import React, { useState, useEffect } from 'react'
import { ipcRenderer } from 'electron'

import App from './Layout'
import LoadAnim from './LoadAnim'

const Login = (): JSX.Element => {
  const Loading = (): JSX.Element =>
    <div className="center">
      <LoadAnim/>
    </div>

  const Auth = (): JSX.Element => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    
    return (
      <div id="login">
        <h1 className='accent1'>Handal Cargo</h1>
        <div>
          <input 
            type="text" 
            placeholder="Username"
            onChange={e => setUsername(e.target.value)} />
          <input 
            type="password" 
            placeholder="Password"
            onChange={e => setPassword(e.target.value)} />
          <button className='accent2 hover-light'
            onClick={() => {
              setView(<Loading/>)
              ipcRenderer.send('login', username, password)
            }}>
            Login
          </button>
        </div>
      </div>
    )
  }

  const [view, setView] = useState<JSX.Element>(<Loading/>)

  useEffect(() => {
    ipcRenderer.once('connected', () => setView(<Auth />))
    ipcRenderer.send('connect')

    ipcRenderer.once('login-success', (event, username) => {
      setView(<App username={username} />)
      ipcRenderer.removeAllListeners('login-failed')
    })

    ipcRenderer.on('login-failed', () => { setView(<Auth/>) })
  }, [])

  return view
}

export default Login
