import React, { useState } from 'react'
import { ipcRenderer } from 'electron'

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
  return (
    <button id="profile-button">
      {username}
      <div>
        <button>{username}</button>
        <hr/>
        <button>Language</button>
        <button>Dark Mode</button>
        <button>Keyboard Shortcuts</button>
        <hr/>
        <button onClick={() => ipcRenderer.send('logout')}>Logout and Exit</button>
      </div>
    </button>
  )
}

const Header = ({ username }: HeaderProps): JSX.Element => {
  const [floaty, setFloaty] = useState(0)

  // yes the syntax looks bad. oh well.
  return (
    <header id="header">
      <h1>Handal Cargo</h1>
      <div>
        <button onClick={() => setFloaty(floaty === 1 ? 0 : 1)}>
          <img src={notesIcon} />
          <span>Notes</span>
        </button>
        <button onClick={() => setFloaty(floaty === 2 ? 0 : 2)}>
          <img src={calculatorIcon} />
          <span>Calculator</span>
        </button>
        <button onClick={() => setFloaty(floaty === 3 ? 0 : 3)}>
          <img src={mailIcon} />
          <span>Messages</span>
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
