const { app, BrowserWindow, ipcMain } = require('electron')
require('../../server/app')

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    frame: false,
    minWidth: 1022,
    minHeight: 631,
    width: 1022,
    height: 631,
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
  ipcMain.on('window:maximize', () => {
    mainWindow.maximize()
  })
  // 从最大化窗口恢复
  ipcMain.on('window:restore', () => {
    mainWindow.restore()
  })
  // 关闭窗口
  ipcMain.on('window:close', () => {
    mainWindow.close()
  })
  // 当从最大化窗口退出时触发
  mainWindow.on('unmaximize', ev => {
    ev.sender.send('window:restored')
  })
  // 当窗口最大化时
  mainWindow.on('maximize', ev => {
    ev.sender.send('window:maximized')
  })
})
