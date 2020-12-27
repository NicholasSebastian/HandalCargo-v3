/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable curly */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable no-unused-expressions */

import { app, BrowserWindow, dialog, ipcMain } from 'electron'
import mariadb from 'mariadb'

import '@babel/polyfill'
import * as path from 'path'
import * as url from 'url'

const DB_PING_INTERVAL = 60000

let mainWindow: Electron.BrowserWindow | null
let connection: mariadb.Connection

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 300,
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
    mainWindow = null
  })
})

app.allowRendererProcessReuse = true

ipcMain.on('login', (event, username, password) => {
  mariadb.createConnection({
    host: '101.50.1.10',
    port: 3306,
    database: 'dhicom_handalcargo',
    user: `dhicom_${username}`,
    password
  })
    .then(newConnection => {
      mainWindow?.setSize(1280, 720)
      mainWindow?.setMinimumSize(800, 500)
      mainWindow?.setResizable(true)
      mainWindow?.center()
      ipcMain.removeAllListeners('login')

      connection = newConnection
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
