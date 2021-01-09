/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState, useContext } from 'react'
import { ipcRenderer } from 'electron'

import { ThemeContext } from '../components/Context'
import Notes from '../components/Notes'
import Calculator from '../components/Calculator'
import Messages from '../components/Messages'

import notesIcon from '../assets/notes.png'
import calculatorIcon from '../assets/calculator.png'
import mailIcon from '../assets/mail.png'

interface HeaderProps {
  username: string
}

interface ProfileProps {
  username: string
}

const ProfileButton = ({ username }: ProfileProps): JSX.Element => {
  const { theme, setTheme } = useContext(ThemeContext)!

  return (
    <button id="profile-button" className='accent1 hover-dark'>
      {username}
      <div className='secondary shadow'>
        <button className='hover-light'>
          {username}
        </button>
        <hr/>
        <button className='hover-light'>
          Language
        </button>
        <button className='hover-light'
          onClick={() => setTheme(theme === 'Light' ? 'Dark' : 'Light')}>
          Theme: {theme}
        </button>
        <button className='hover-light'>
          Keyboard Shortcuts
        </button>
        <hr/>
        <button className='hover-light' onClick={() => ipcRenderer.send('logout')}>
          Logout and Exit
        </button>
      </div>
    </button>
  )
}

const Header = ({ username }: HeaderProps): JSX.Element => {
  const [floaty, setFloaty] = useState(0)

  // yes the syntax looks bad. oh well.
  return (
    <header id="header" className='accent1'>
      <h1>Handal Cargo</h1>
      <div>
        <button onClick={() => setFloaty(floaty === 1 ? 0 : 1)} className='accent1 hover-dark'>
          <img src={notesIcon} />
          <span className='accent3'>Notes</span>
        </button>
        <button onClick={() => setFloaty(floaty === 2 ? 0 : 2)} className='accent1 hover-dark'>
          <img src={calculatorIcon} />
          <span className='accent3'>Calculator</span>
        </button>
        <button onClick={() => setFloaty(floaty === 3 ? 0 : 3)} className='accent1 hover-dark'>
          <img src={mailIcon} />
          <span className='accent3'>Messages</span>
        </button>
        <ProfileButton username={username} />
        {floaty === 1 ? <Notes close={() => setFloaty(0)} />
          : floaty === 2 ? <Calculator close={() => setFloaty(0)} />
            : floaty === 3 ? <Messages close={() => setFloaty(0)} />
              : null}
      </div>
    </header>
  )
}

export default Header
