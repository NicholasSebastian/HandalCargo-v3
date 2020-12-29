/* eslint-disable @typescript-eslint/ban-types */
import React from 'react'

interface NotesProps {
  close: Function
}

const Notes = ({ close }: NotesProps): JSX.Element => {
  return (
    <div id="notes">
      <button onClick={() => close()}>✕</button>
      <ul>
        <li>Expeditions page content overflow</li>
        <li>All the pages obviously</li>
        <li>Backup and restore</li>
        <li>Report generation / Printing</li>
        <li>Dashboard</li>
        <li>Locking access to pages according to account access permissions</li>
        <li>Application is now still vulverable to SQL Injection attacks</li>
        <li>Account profiles?? with photos??</li>
        <li>Revamp how accounts are handled??? Allows acc creation from app??</li>
        <li>Language switch</li>
        <li>Customizable Keyboard Shortcuts</li>
        <li>Extras like calculator, notes, etc</li>
        <li>Dark mode???</li>
        <li>Backend??? Allows for more features e.g. notifications, built-in chat???</li>
        <li>Even if no backend, email type short-messages still possible</li>
      </ul>
    </div>
  )
}

export default Notes
