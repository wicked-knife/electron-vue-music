const webpack = require('webpack')
const electron = require('electron')
const WebpackDevServer = require('webpack-dev-server')
const path = require('path')
const devConf = require('../webpack.dev.js')
const {spawn} = require('child_process')

function startDevServer(){
  return new Promise(resolve => {
    const compiler = webpack(devConf)
    const devServer = new WebpackDevServer(compiler, devConf.devServer)
    devServer.listen(8080, 'localhost', () => {
      resolve()
    })
  })
}


function startElectron(){
  const electronProcess = spawn(electron, [path.join(__dirname, '../src/main/main.js'), '--disable-gpu'], {
    env: {
      NODE_ENV: 'development'
    }
  })
  electronProcess.stdout.on('data', data => {
    console.log(data.toString())
  })
  electronProcess.on('close', () => {
    console.log('dev process exit')
    process.exit()
  })
}


startDevServer().then(startElectron)
