const path = require('path');

module.exports = {
  entry: './src/index.js', // Your entry file
  output: {
    path: path.resolve(__dirname, 'D:\\kishore\\Prod\\cube_api_build\\'), // Output directory
    filename: 'index.js' // Output file name
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  target: 'node', // Ensure Webpack targets Node.js environment
  stats: {
    errorDetails: true // Enable detailed error information
  }
};
