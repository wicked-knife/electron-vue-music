const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConf = require('./webpack.common.js')

const devConf = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    filename: 'js/[name]_[hash:5].js',
  },
  devServer: {
    contentBase: 'dist',
    open: true,
    hot: true,
    overlay: true,
    proxy: {
    }
  },
  module: {
    rules: [
      {
        test: /(?<!\.module)\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'sass-loader',
          'postcss-loader'
        ]
      },
      {
        test: /(?<=\.module)\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true
            }
          },
          'sass-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      DEV: JSON.stringify(true)
    })
  ]
}

module.exports = merge(commonConf, devConf)
