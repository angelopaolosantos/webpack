// webpack.config.js
var webpack = require('webpack');
var path = require('path');
// var HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: {
    app: './src/app.js',
    //vendors: './src/vendors.js'
  },
  // for multi page application 
  /* 
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js'
  }
  */
 output: {
    path: path.join(__dirname, 'public','assets'), // This is where images AND js will go
    publicPath: 'http://mycdn.com/assets/', // This is used to generate URLs to e.g. images
    filename: '[name].bundle.js'  // Template based on keys in entry above    
  },
  module: {
    rules: [
      /*
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'jshint-loader'

      },
      */
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react']
        }
      },
      { 
        test: /\.less$/, 
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader' }
        ] 
      }, // use ! to chain loaders
      { 
        test: /\.scss$/, 
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'scss-loader' }
        ] 
      },
      { 
        test: /\.sass$/, 
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ] 
      },  
      { 
        test: /\.css$/, 
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ]  
      },
      { 
        test: /\.(png|jpg)$/, 
        loader: 'url-loader?limit=8192' 
      } // inline base64 URLs for <=8k images, direct URLs for the rest
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new webpack.optimize.UglifyJsPlugin(),
    // new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};

module.exports = config;