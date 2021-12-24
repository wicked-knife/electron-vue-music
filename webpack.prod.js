const webpack = require('webpack')
const {merge} = require('webpack-merge')
const commonConf = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

module.exports = env => {

  const prodConf = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    output: {
      filename: 'js/[name]_[contenthash:5].js',
    },
    module: {
      rules: [
        {
          test: /\.sass$/,
          use: [
            MiniCssExtractPlugin.loader,
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
            MiniCssExtractPlugin.loader,
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
      new ProgressBarPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/[name]_[contenthash:5].css',
        chunkFilename: 'css/[id]_[contenthash:5].css'
      }),
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({
        DEV: JSON.stringify(false)
      })
    ].concat(env && env.analyse ? new BundleAnalyzerPlugin() : []),
    optimization: {
      minimizer: [
        new TerserJSPlugin({
          sourceMap: true
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    }
  }
  return merge(commonConf, prodConf)
}
