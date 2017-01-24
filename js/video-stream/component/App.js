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
  changeView,
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
};

const defaultProps = {
  currentVideo: 0,
  currentView: 0,
  videoList: [],
  onChangeView: noop,
};

class App extends Component {
  _handleChangeView = index => {
    this.props.onChangeView(index);
  }

  _getCurrentVideo() {
    return this.props.videoList[this.props.currentVideo];
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
        <FlatButton label="Play" />
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
});

const mapDispatchToProps = dispatch => ({
  onChangeView: indexView => void dispatch(changeView(indexView)),
});

App.propTypes = propTypes;
App.defaultProps = defaultProps;
App.displayName = 'App';

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
