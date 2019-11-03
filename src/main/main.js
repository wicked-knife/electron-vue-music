const { app, BrowserWindow } = require('electron')
require('../../server/app')

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    frame: true, // for dev
    width: 1200,
    height: 741,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  })

  //开发环境下打开本地的webpack-dev-server,
  //生产环境下则打开express的静态服务

  process.env.NODE_ENV === 'development' ? mainWindow.loadURL('http://localhost:8080/') : mainWindow.loadURL('http://localhost:3000/')

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })
})
