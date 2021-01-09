/* eslint-disable brace-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-expressions */
import { app, BrowserWindow, dialog, ipcMain } from 'electron'
import mariadb from 'mariadb'

import '@babel/polyfill'
import * as path from 'path'
import * as url from 'url'

const loginWindowSize = { width: 400, height: 300 }
const windowSize = { width: 1280, height: 720, minWidth: 1100, minHeight: 600 }

const DB_PING_INTERVAL = 60000
const connectionSettings = {
  host: '101.50.1.10',
  port: 3306,
  database: 'dhicom_handalcargo',
  user: 'dhicom_nicholas', // temp
  password: 'hunter1389' // temp
}

let mainWindow: Electron.BrowserWindow | null
let connection: mariadb.Connection

app.on('ready', () => {
  // Create a new window.
  mainWindow = new BrowserWindow({
    width: loginWindowSize.width,
    height: loginWindowSize.height,
    resizable: false,
    icon: '../src/assets/icon.png',
    webPreferences: {
      nodeIntegration: true
    }
  })

  // Load the content.
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:4000')
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'renderer/index.html'),
        protocol: 'file:',
        slashes: true
      })
    )
  }

  // Close the connection and free memory on close.
  mainWindow.on('closed', () => {
    connection?.end()
    mainWindow = null
  })
})

app.allowRendererProcessReuse = true

function handleConnectionError (error: mariadb.SqlError) {
  if (error.code === 'ECONNREFUSED') {
    dialog.showMessageBox({
      message: 'Connection Refused',
      detail: 'There was a problem connecting to the database server.'
    })
  }
  else {
    dialog.showMessageBoxSync({
      message: 'Fatal Error occured',
      detail: error.message
    })
  }
  mainWindow?.close()
}

ipcMain.on('connect', async (event) => {
  try {
    connection = await mariadb.createConnection(connectionSettings)
    connection.on('error', handleConnectionError)

    // Ping database every minute to sustain the connection
    setInterval(() => {
      console.log('Pinging the database server.')
      connection.ping()
    }, DB_PING_INTERVAL)

    event.reply('connected')
  }
  catch (error) {
    handleConnectionError(error)
  }
})

ipcMain.on('login', (event, username, password) => {
  connection.query(
    'SELECT * FROM `staff` WHERE `staffid` = ? AND `pwd` = ?',
    [username, password]
  )
    .then(data => {
      if (data.length > 0) {
        mainWindow?.setSize(windowSize.width, windowSize.height)
        mainWindow?.setMinimumSize(windowSize.minWidth, windowSize.minHeight)
        mainWindow?.setResizable(true)
        mainWindow?.center()
        ipcMain.removeAllListeners('login')

        event.reply('login-success', username)
      }
      else {
        dialog.showMessageBox({
          message: 'Invalid Login credentials',
          detail: 'Incorrect username or password.'
        })
        event.reply('login-failed')
      }
    })
    .catch(error => {
      dialog.showMessageBoxSync({
        message: 'Fatal Error occured',
        detail: error.message
      })
      mainWindow?.close()
    })
})

ipcMain.on('logout', () => {
  dialog.showMessageBox({
    title: 'Log Out and Exit',
    message: 'Log Out and Exit?',
    detail: 'This will close the application and its connection to the database.',
    buttons: ['Log Out and Exit', 'Cancel']
  })
    .then(({ response }) => { if (response === 0) mainWindow?.close() })
})

ipcMain.on('query', (event, query) => {
  if (connection.isValid()) {
    connection.query(query)
      .then((data: Array<any>) => {
        event.returnValue = data
      })
      .catch(error => {
        dialog.showMessageBox({
          message: 'Query failed',
          detail: error.message
        })
        event.returnValue = null
      })
  } else {
    dialog.showMessageBoxSync({
      message: 'Connection ended',
      detail: 'Connection with database unexpectedly is no longer valid.'
    })
    mainWindow?.close()
  }
})
