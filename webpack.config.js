const path = require('path');

module.exports = {
  entry: './src/index.js',
  devServer: {
    contentBase: './dist',
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
        rules: [
           {
             test: /\.js$/,
             use: [
               'babel-loader',
            ],
        },{
            test: /\.css$/,
            use: [
            'style-loader',
            'css-loader',
            ],
        }
        // { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      ],
      
    },
    mode: 'development'
};