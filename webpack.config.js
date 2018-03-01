const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// Settings
const PROD = true
const ES6 = true

const jsLoader = !ES6 ? {
  test: /\.js$/,
  loader: 'babel-loader',
  query: {
    presets: ['es2015']
  }
} : {}

module.exports = {
  entry: !ES6 ? ['babel-polyfill', './src/index.js'] : './src/index.js',
  output: {
    filename: PROD ? 'bundle.min.js' : 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      // JS
      jsLoader,
      // SCSS
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader' // translates CSS into CommonJS
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      },
      // IMAGES
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      // FONTS
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      // JSON
      {
        test: /\.(json)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: PROD ? [
    // new UglifyJsPlugin({
    //   uglifyOptions: {
    //     ie8: false,
    //     ecma: 6,
    //     output: {
    //       comments: false,
    //       beautify: false
    //     },
    //     warnings: true
    //   }
    // }),
    new HtmlWebpackPlugin({
      template: 'src/html/entry.html',
      filename: 'index.html',
      favicon: 'src/img/Logo.png',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        conservativeCollapse: false,
        preserveLineBreaks: false
      }
    })] : [
    new HtmlWebpackPlugin({
      favicon: 'src/img/Logo.png',
      template: 'src/html/entry.html'
    })
  ]
}
