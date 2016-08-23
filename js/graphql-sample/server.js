import express from 'express';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import path from 'path';
import graphQLHTTP from 'express-graphql';

import schema from './data/schema.js';

const APP_PORT = 3000;
const GRAPHQL_PORT = 8080;

const graphQLServer = express();

graphQLServer.use('/', graphQLHTTP({schema, pretty: true}));
graphQLServer.listen(GRAPHQL_PORT);

const compiler = webpack({
  entry: path.resolve(__dirname, 'js', 'app.js'),
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        test: /\.js$/,
      },
    ],
  },
  output: {filename: 'app.js', path: '/'},
});

const app = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  proxy: {'/graphql': 'http://localhost:${GRAPHQL_PORT}'},
  publicPath: '/js/'
});

app.use('/', express.static(path.resolve(__dirname, 'public')));
app.listen(APP_PORT);