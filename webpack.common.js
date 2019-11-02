
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src/renderer/index.js')
  },
  output: {
    chunkFilename: 'js/[name]_[contenthash:5].js'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'eslint-loader',
            options: {
              fix: true
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':src']
          }
        }
      },
      {
        test: /\.(svg|jpe?g|gif|png|bmp)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]_[hash:5].[ext]',
            outputPath: 'images',
            limit: 2048
          }
        }
      },
      {
        test: /\.(eot|ttf|woff2?|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]_[hash:5].[ext]',
            outputPath: 'fonts'
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/renderer/index.html'),
      filename: 'index.html',
      chunks: ['index'],
      minify: false

    }),
    new VueLoaderPlugin(),
    new VuetifyLoaderPlugin()
  ]
}
