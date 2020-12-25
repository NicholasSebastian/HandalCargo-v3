/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable no-unused-expressions */
import { app, BrowserWindow, ipcMain } from 'electron'
import * as mysql from 'mysql'

import '@babel/polyfill'
import * as path from 'path'
import * as url from 'url'

let mainWindow: Electron.BrowserWindow | null
let connection: mysql.Connection

function createWindow () {
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
}

ipcMain.on('login', async (event, username, password) => {
  connection = mysql.createConnection({
    host: '101.50.1.10',
    port: 3306,
    user: `dhicom_${username}`,
    password
  })

  connection.connect(error => {
    if (error) {
      event.returnValue = false
    } else {
      mainWindow?.setSize(1280, 720)
      mainWindow?.setResizable(true)
      mainWindow?.center()
      event.returnValue = true
      ipcMain.removeAllListeners('login')
    }
  })
})

app.on('ready', createWindow)
app.allowRendererProcessReuse = true
