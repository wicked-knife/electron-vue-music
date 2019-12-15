const { app, BrowserWindow, ipcMain } = require('electron')
const createLoginWindow = require('./loginWindow.js')
require('../../server/app')

function registerMainWindowEvents(mainWindow) {
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  // 最小化窗口
  ipcMain.on('mainWindow:minimize', () => {
    mainWindow.minimize()
  })
  // 最大化窗口
  ipcMain.on('mainWindow:maximize', () => {
    mainWindow.maximize()
  })
  // 从最大化窗口恢复
  ipcMain.on('mainWindow:restore', () => {
    mainWindow.restore()
  })
  // 关闭窗口
  ipcMain.on('mainWindow:close', () => {
    mainWindow.close()
  })
  // 当从最大化窗口退出时触发
  mainWindow.on('unmaximize', ev => {
    ev.sender.send('mainWindow:restored')
  })
  // 当窗口最大化时
  mainWindow.on('maximize', ev => {
    ev.sender.send('mainWindow:maximized')
  })
}

function registerLoginWindowEvens(mainWindow) {
  let loginWindow = null
  ipcMain.on('loginWindow:show', () => {
    if(loginWindow) return
    loginWindow = createLoginWindow(mainWindow)
    loginWindow.on('close', () => {
      loginWindow = null
    })
  })

  ipcMain.on('loginWindow:loginSuccess', () => {
    // 将消息告诉主窗口，所以用主窗口发送事件
    // 登录成功后关闭登录窗口
    mainWindow.send('loginWindow:loginSuccess')
    loginWindow.close()
  })

  ipcMain.on('loginWindow:close', () => {
    loginWindow.close()
  })


}

function installDevExtension(){
  const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer')

  installExtension(VUEJS_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err))
}

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    show: false,
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

  process.env.NODE_ENV === 'development'
    ? mainWindow.loadURL('http://localhost:8080/')
    : mainWindow.loadURL('http://localhost:3000/')

  registerMainWindowEvents(mainWindow)
  registerLoginWindowEvens(mainWindow)

  process.env.NODE_ENV === 'development' && installDevExtension()
})
