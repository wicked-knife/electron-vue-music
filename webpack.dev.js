const webpack = require('webpack')
const {merge} = require('webpack-merge')
const commonConf = require('./webpack.common.js')

const devConf = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    filename: 'js/[name]_[hash:5].js',
  },
  devServer: {
    contentBase: 'dist',
    open: false,
    hot: true,
    overlay: true,
    proxy: {
    }
  },
  module: {
    rules: [
      {
        test: /\.sass$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                indentedSyntax: true // optional
              },
            }
          }
        ]
      },
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: '@import "@/scss/variable.scss";',
            }
          }
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
