/* eslint-disable curly */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable no-unused-expressions */
import { app, BrowserWindow, ipcMain } from 'electron'
import mariadb from 'mariadb'

import '@babel/polyfill'
import * as path from 'path'
import * as url from 'url'

let mainWindow: Electron.BrowserWindow | null
let connection: mariadb.Connection

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 300,
    backgroundColor: '#ffffff',
    resizable: false,
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

ipcMain.on('login', async (event, username, password) => {
  mariadb.createConnection({
    host: '101.50.1.10',
    port: 3306,
    database: 'handalcargo',
    user: `dhicom_${username}`,
    password
  })
    .then(newConnection => {
      mainWindow?.setSize(1280, 720)
      mainWindow?.setResizable(true)
      mainWindow?.center()
      ipcMain.removeAllListeners('login')
      connection = newConnection
      event.reply('logged-in', 0)
    })
    .catch((error) => {
      if (error.code === 'ER_ACCESS_DENIED_ERROR' || error.code === 'ER_DBACCESS_DENIED_ERROR') 
        event.reply('logged-in', 1)
      else if (error.code === 'ECONNREFUSED') 
        event.reply('logged-in', 2)
      else 
        event.reply('logged-in', error.message)
    })
})
