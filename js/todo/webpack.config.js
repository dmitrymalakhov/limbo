import path from 'path';
import webpack from 'webpack';

export default {
    module: {
      loaders: [
        {
          exclude: /node_modules/,
          loader: 'babel',
          test: /\.js$/,
        },
      ],
    },
    entry: [
      path.resolve(__dirname, 'index.js'),
      "webpack-dev-server/client?http://localhost:3000/",
      'webpack/hot/dev-server'
    ],
    output: {
      path: path.resolve(__dirname, './', 'public'),
      filename: 'bundle.js'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
};