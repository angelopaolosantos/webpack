// webpack.config.js
var webpack = require('webpack');
var path = require('path');

// definePlugin takes raw strings and inserts them, so you can put strings of JS if you want.
var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});

module.exports = {
  devtool: 'inline-source-map',
  entry: {
  	Profile: './profile.js',
  	Feed: './feed.js'
  },
  output: {
  	path: path.join(__dirname, 'public','assets'); // This is where images AND js will go
  	publicPath: 'http://mycdn.com/assets/', // This is used to generate URLs to e.g. images
    filename: '[name].bundle.js'  // Template based on keys in entry above    
  },
  module: {
  	preLoaders: [
 	  {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'jshint-loader'

      }
  	],
    loaders: [
      { 
      	test: /\.coffee$/, 
      	loader: 'coffee-loader' 
      },
      {
        test: /\.es6$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      { 
      	test: /\.less$/, 
      	loader: 'style-loader!css-loader!less-loader' 
      }, // use ! to chain loaders
      { 
      	test: /\.scss$/, 
      	loader: 'style-loader!css-loader!scss-loader' 
      }, 
      { 
      	test: /\.css$/, 
      	loader: 'style-loader!css-loader' 
      },
      { 
      	test: /\.(png|jpg)$/, 
      	loader: 'url-loader?limit=8192' 
      } // inline base64 URLs for <=8k images, direct URLs for the rest
    ]
  },
  resolve: {
    // you can now require('file') instead of require('file.coffee')
    extensions: ['', '.js', 'es6', '.json', '.coffee'],
    moduleDirectories: ['node_modules','src'] 
  },
  plugins: [
  	new webpack.optimize.CommonsChunkPlugin('common.js');
  ],
  // watch: true; or type 'webpack --watch' in the terminal
};