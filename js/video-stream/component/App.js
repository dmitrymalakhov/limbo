'use strict';

import React, { PropTypes, Component } from 'react';
import { deepOrange500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { FlatButton } from 'material-ui';
import { connect } from 'react-redux';

import { Catalog } from './Catalog/Catalog';
import { Video } from './Video';

import { noop } from '../utils/misc';

import {
  changeVideo,
  changeView,
  playVideo,
} from '../actions/app';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

const propTypes = {
  currentVideo: PropTypes.number,
  currentView: PropTypes.number,
  videoList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      src: PropTypes.string,
    }),
  ),
  onChangeView: PropTypes.func,
  onPlayVideo: PropTypes.func,
  onChangeVideo: PropTypes.func,
};

const defaultProps = {
  currentVideo: 0,
  currentView: 0,
  videoList: [],
  onChangeView: noop,
  onPlayVideo: noop,
  onChangeVideo: noop,
};

const CATALOG_VIEW = 0,
  PLAYER_VIEW = 1;

class App extends Component {
  _handleChangeView = index => {
    this.props.onChangeView(PLAYER_VIEW);
    this.props.onChangeVideo(index);
  }

  _getCurrentVideo() {
    return this.props.videoList[this.props.currentVideo];
  }
  
  _handlePlayVideo = () => {
    this.props.onPlayVideo();
  }

  _renderCatalog() {
    if (!this.props.videoList.length) return null;

    return (
      <Catalog
        list={this.props.videoList}
        onChange={this._handleChangeView}
      />
    );
  }
  
  _renderPlayer() {
    const video = this._getCurrentVideo();

    return (
      <div>
        <Video src={video.src} />
        <FlatButton label="Play" onClick={this._handlePlayVideo} />
        <FlatButton label="Pause" />
        <FlatButton label="Stop" />
      </div>
    );
  }
  
  _renderCurrentView() {
    if (this.props.currentView === 0)
      return this._renderCatalog();
    else if (this.props.currentView === 1)
      return this._renderPlayer();

    return null;
  }

  render() {
    const view = this._renderCurrentView();

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          {view}
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  currentView: state.app.currentView,
  currentVideo: state.app.currentVideo,
  videoMode: state.app.videoMode,
});

const mapDispatchToProps = dispatch => ({
  onChangeView: index => void dispatch(changeView(index)),
  onChangeVideo: index => void dispatch(changeVideo(index)),
  onPlayVideo: () => void dispatch(playVideo()),
});

App.propTypes = propTypes;
App.defaultProps = defaultProps;
App.displayName = 'App';

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
