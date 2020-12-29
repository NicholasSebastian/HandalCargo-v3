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

let mainWindow: Electron.BrowserWindow | null
let connection: mariadb.Connection

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: loginWindowSize.width,
    height: loginWindowSize.height,
    resizable: false,
    backgroundColor: '#f8f7fc',
    icon: '../src/assets/icon.png',
    webPreferences: {
      nodeIntegration: true
    }
  })

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

  mainWindow.on('closed', () => {
    connection?.end()
    mainWindow = null
  })
})

app.allowRendererProcessReuse = true

ipcMain.on('logout', () => {
  dialog.showMessageBox({
    title: 'Log Out and Exit',
    message: 'Log Out and Exit?',
    detail: 'This will close the application and its connection to the database.',
    buttons: ['Log Out and Exit', 'Cancel']
  }).then(({ response }) => {
    if (response === 0) {
      mainWindow?.close()
    }
  })
})

ipcMain.on('login', (event, username, password) => {
  mariadb.createConnection({
    host: '101.50.1.10',
    port: 3306,
    database: 'dhicom_handalcargo',
    user: `dhicom_${username}`,
    password
  })
    .then(newConnection => {
      mainWindow?.setSize(windowSize.width, windowSize.height)
      mainWindow?.setMinimumSize(windowSize.minWidth, windowSize.minHeight)
      mainWindow?.setResizable(true)
      mainWindow?.center()
      ipcMain.removeAllListeners('login')

      connection = newConnection
      connection.on('error', error => console.log(error))
      setInterval(() => {
        console.log('Pinging the database server.')
        connection.ping()
      }, DB_PING_INTERVAL)

      event.reply('login-success', username)
    })
    .catch((error) => {
      event.reply('login-failed', error.code, error.message)
    })
})

ipcMain.on('query', (event, query) => {
  connection.query(query)
    .then((data: Array<any>) => {
      event.returnValue = data
    })
    .catch((error) => {
      dialog.showMessageBox({
        message: 'Query failed',
        detail: error.message
      })
      event.returnValue = null
    })
})
