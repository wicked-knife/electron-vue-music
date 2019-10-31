const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const pagesPath = path.resolve(__dirname, '../src/pages')
const entryPath = path.resolve(__dirname, '../src/entries')
const pagesFiles = fs.readdirSync(pagesPath, 'utf-8')

const mkFile = path => {
  return fs.closeSync(fs.openSync(path, 'w'))
}

const genHtmlWebpackPlugin = (files) => {
  return files.map(fileName => {
    const chunkName = path.basename(fileName, '.html')
    return new HtmlWebpackPlugin({
      template: path.join(pagesPath, fileName),
      filename: fileName,
      chunks: [chunkName],
      minify: false
    })
  })
}

const genEntry = (entries) => {
  let entry = {}
  entries.forEach(entryName => {
    let _name = path.basename(entryName, '.html')
    const matchReg = new RegExp('^' + _name + '.(j|t)s$')
    const entryFile = fs.readdirSync(entryPath).find(f => matchReg.test(f))
    if(entryFile) {
      entry[_name] = path.join(entryPath, entryFile)
    } else {
      const defaultPath = path.join(entryPath, _name + '.js')
      mkFile(defaultPath)
      entry[_name] = defaultPath
    }
  })
  return entry
}

module.exports.HTMLWebpackPlugins = genHtmlWebpackPlugin(pagesFiles)
module.exports.entry = genEntry(pagesFiles)
