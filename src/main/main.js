const { app, BrowserWindow, ipcMain } = require('electron')
require('../../server/app')

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    frame: false,
    minWidth: 1200,
    minHeight: 741,
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

  // 最小化窗口
  ipcMain.on('window:minimize', () => {
    mainWindow.minimize()
  })
  // 最大化窗口
  ipcMain.on('window:maximize', ev => {
    mainWindow.maximize()
    if(mainWindow.isMaximized()) {
      ev.sender.send('window:maximized')
    }
  })
  // 从最大化窗口恢复
  ipcMain.on('window:restore', ev => {
    mainWindow.restore()
    if(!mainWindow.isMaximized()) {
      ev.sender.send('window:restored')
    }
  })
  // 关闭窗口
  ipcMain.on('window:close', () => {
    mainWindow.close()
  })
})
