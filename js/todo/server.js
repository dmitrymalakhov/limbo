import express from 'express';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './webpack.config.js';

const APP_PORT = 8090;

const compiler = webpack(config);
const app = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  stats: { colors: true },
  hot: true,
});

app.use('/', express.static(path.resolve(__dirname, 'public')));
app.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`);
});
