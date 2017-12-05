const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './index.js',
  output: {
    filename: 'reshader.js',
    path: path.join(__dirname, '/dist'),
    library: 'reshader',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['transform-object-rest-spread']
          }
        }
      }
    ]
  },
  plugins: [new UglifyJsPlugin()]
}
