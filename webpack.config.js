const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => ({
    entry: './src/index.ts',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist/'),
    },
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: ['@babel/plugin-transform-runtime'],
            },
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          type: 'javascript/auto',
          test: /\.html/,
          exclude: /(node_modules|bower_components)/,
          use: [
            {
              loader: 'file-loader',
              options: { name: '[name].[ext]' },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
              },
            },
          ],
        },
      ],
    },
  plugins: [new HtmlWebpackPlugin()],

    devServer: {
      inline: true,
      index: 'index.html',
      port: 8080,
    },

    optimization: {
      minimize: true,
    },
  resolve: {
  extensions: ['.ts', '.js', '.json']
  }
})
