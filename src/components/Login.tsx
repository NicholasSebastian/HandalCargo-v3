/* eslint-disable no-trailing-spaces */
import React, { useState } from 'react'
import { ipcRenderer, remote } from 'electron'

import App from './Layout'

const { dialog } = remote

function Login (): JSX.Element {
  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  const Login = (): JSX.Element => {
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
            type="text" 
            placeholder="Password"
            onChange={e => setPassword(e.target.value)} />
          <button onClick={() => {
            const valid = ipcRenderer.sendSync('login', username, password)
            if (valid) setLoggedIn(true)
            else {
              dialog.showMessageBox({
                message: 'Invalid Login credentials',
                detail: 'Incorrect username or password.'
              })
            }
          }}>Login</button>
        </div>
      </div>
    )
  }

  return loggedIn ? <App/> : <Login/>
}

export default Login
