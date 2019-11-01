  
const { app, BrowserWindow} = require('electron')
require('./server/app')

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true, webSecurity: false
    }
  })

  process.env.NODE_ENV === 'development' ? mainWindow.loadURL('http://localhost:8080/') : mainWindow.loadURL('http://localhost:3000/')

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })
})
