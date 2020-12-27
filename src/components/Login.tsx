/* eslint-disable curly */
/* eslint-disable no-trailing-spaces */
import React, { useState, useEffect } from 'react'
import { ipcRenderer, remote } from 'electron'

import App from './Layout'
import LoadAnim from './LoadAnim'

const { dialog } = remote

function Login (): JSX.Element {
  useEffect(() => {
    ipcRenderer.once('login-success', (event, username) => {
      setView(<App username={username} />)
      ipcRenderer.removeAllListeners('login-failed')
    })

    ipcRenderer.on('login-failed', (event, error, message) => {
      switch (error) {
        case 'ER_ACCESS_DENIED_ERROR':
          setView(<Auth/>)
          dialog.showMessageBox({
            message: 'Invalid Login credentials',
            detail: 'Incorrect username or password.'
          })
          break
        case 'ER_DBACCESS_DENIED_ERROR':
          setView(<Auth/>)
          dialog.showMessageBox({
            message: 'Permission Denied',
            detail: 'Your account does not have access to this database.'
          })
          break
        case 'ECONNREFUSED':
          dialog.showMessageBox({
            message: 'Connection Refused',
            detail: 'There was a problem connecting to the database server.'
          })
          remote.getCurrentWindow().close()
          break
        default:
          dialog.showMessageBox({
            message: 'Fatal Error occured',
            detail: message
          })
          remote.getCurrentWindow().close()
          break
      }
    })
  }, [])

  const Loading = (): JSX.Element => 
    <div className="center">
      <LoadAnim/>
    </div>

  const Auth = (): JSX.Element => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    
    return (
      <div id="login">
        <h1>Handal Cargo</h1>
        <div>
          <input 
            type="text" 
            placeholder="Username"
            onChange={e => setUsername(e.target.value)} />
          <input 
            type="password" 
            placeholder="Password"
            onChange={e => setPassword(e.target.value)} />
          <button onClick={() => {
            setView(<Loading/>)
            ipcRenderer.send('login', username, password)
          }}>
            Login
          </button>
        </div>
      </div>
    )
  }

  const [view, setView] = useState<JSX.Element>(<Auth/>)
  return view
}

export default Login
