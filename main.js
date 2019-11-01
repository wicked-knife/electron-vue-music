  
const { app, BrowserWindow} = require('electron')
const express = require('express')
const server = express()

server.listen(3000, function () {
  console.log('Express server listening on port 3000.')
})


app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true, webSecurity: false
    }
  })

  process.env.NODE_ENV === 'development' ? mainWindow.loadURL('http://localhost:8080/') : mainWindow.loadFile('dist/index.html')

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })
})
