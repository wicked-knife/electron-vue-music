const {BrowserWindow} = require('electron')

function createLoginWindow (parent){
  let loginWindow = new BrowserWindow({
    show:false,
    frame: false,
    minWidth: 350,
    minHeight: 530,
    width: 350,
    height: 530,
    useContentSize: true,
    resizable:false,
    movable:false,
    parent,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  })

  process.env.NODE_ENV === 'development' ? loginWindow.loadURL('http://localhost:8080/#/login') : loginWindow.loadURL('http://localhost:3000/#/login')

  loginWindow.on('ready-to-show', () => {
    loginWindow.show()
  })

  loginWindow.on('closed', () => {
    loginWindow = null
  })
  

  return loginWindow
}


module.exports = createLoginWindow
