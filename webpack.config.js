// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Entry point of your app
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // Output file
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Transpile .js and .jsx files using Babel
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/, // Handle CSS files
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve these extensions automatically
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Use the HTML template from public folder
    }),
  ],
  devServer: {
    static: {
        directory: path.join(__dirname, '../dist'), // Serve static files from public directory
      },
      historyApiFallback: true,
    compress: true,
    port: 3000, // Run the server on port 3000
    hot: true, // Enable hot reloading
  },
  mode: 'development', // Set development mode for easier debugging
};
