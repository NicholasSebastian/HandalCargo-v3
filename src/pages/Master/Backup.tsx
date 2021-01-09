import React from 'react'
import { shell } from 'electron'

const DB_BACKUP_LINK = 'https://maiden.jagoanhosting.com:2083/cpsess2054456072/3rdparty/phpMyAdmin/db_export.php?db=dhicom_handalcargo'

function BackupAndRestore (): JSX.Element {
  return (
    <div id="backup-page">
      <h1>Backup And Restore</h1>
      <p className='secondary shadow'>
        Unfortunately, you are unable to backup the database directly from this app.<br/>
        You can still Backup and Restore the database from cPanel though!<br/>
        <button className='accent2 hover-light'
          onClick={() => shell.openExternal(DB_BACKUP_LINK)}>
            Access cPanel
        </button>
      </p>
    </div>
  )
}

export default BackupAndRestore
