const webpack = require('webpack')
const electron = require('electron')
const WebpackDevServer = require('webpack-dev-server')
const devConf = require('../webpack.dev.js')
const {spawn} = require('child_process')

function startDevServer(){
  return new Promise(resolve => {
    const compiler = webpack(devConf)
    const devServer = new WebpackDevServer(compiler, devConf.devServer)
    devServer.listen(8080, 'localhost', () => {
      console.log("Starting server on http://localhost:8080")
      resolve()
    })
  })
}


function startElectron(){
  const electronProcess = spawn(electron, ['./main.js'])
  electronProcess.stdout.on('data', data => {
    console.log(data.toString())
  })
  electronProcess.on('close', () => {
   process.exit()
  })
}


startDevServer().then(() => {
  startElectron()
})
