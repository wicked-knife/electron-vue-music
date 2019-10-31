  
const { app, BrowserWindow} = require('electron')

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true, webSecurity: false
    }
  })

  mainWindow.loadURL('http://localhost:8080/')

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })
})
