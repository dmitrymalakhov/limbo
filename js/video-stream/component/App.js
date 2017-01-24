import React from 'react';
import { deepOrange500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { FlatButton } from 'material-ui';

import { Catalog } from './Catalog/Catalog';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

const videoList = [
  {
    title: 'jellyfish-3-mbps-hd-h264.mkv',
    src: 'http://jell.yfish.us/media/jellyfish-3-mbps-hd-h264.mkv',
  },
  {
    title: 'jellyfish-3-mbps-hd-hevc.mkv',
    src: 'http://jell.yfish.us/media/jellyfish-3-mbps-hd-hevc.mkv',
  },
];

export const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>
      <Catalog list={videoList} />
      <FlatButton label="Play" />
      <FlatButton label="Pause" />
      <FlatButton label="Stop" />
    </div>
  </MuiThemeProvider>
);
