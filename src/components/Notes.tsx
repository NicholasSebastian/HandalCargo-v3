/* eslint-disable @typescript-eslint/ban-types */
import React from 'react'

interface NotesProps {
  close: Function
}

const Notes = ({ close }: NotesProps): JSX.Element => {
  return (
    <div id="notes" className='accent1 shadow'>
      <button onClick={() => close()}>✕</button>
      <ul>
        <li>Expeditions page content overflow</li>
        <li>Revamp how accounts are handled</li>
        <li>Password Encryption</li>
        <li>All the pages</li>
        <li>Report generation / Printing</li>
        <li>Backup page: Just include a link to the cPanel</li>
        <li>Dashboard</li>
        <li>Locking access to pages according to account access permissions</li>
        <li>Account profiles?? with photos??</li>
        <li>Language switch</li>
        <li>Customizable Keyboard Shortcuts</li>
        <li>Extras like calculator, notes, etc</li>
        <li>Dark mode???</li>
        <li>Email type short-messages</li>
        <li>Application is now still vulverable to SQL Injection attacks</li>
      </ul>
    </div>
  )
}

export default Notes
