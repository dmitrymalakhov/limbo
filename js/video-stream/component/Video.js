'use strict';

import React, { Component, PropTypes } from 'react';
import video from '../video/jellyfish-3-mbps-hd-h264.mkv';

const propTypes = {
  src: PropTypes.string,
  mode: PropTypes.oneOf(['play', 'pause', 'stop']),
};

const defaultProps = {
  src: '',
  mode: 'play',
};

export class Video extends Component {
  constructor() {
    super();
    
    this.videoDomNode = null;
    
    this._saveRef = this._saveRef.bind(this);
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.mode !== this.props.mode) {
      if (this.props.mode === 'play') this._play();
      if (this.props.mode === 'pause') this._pause();
    }
  }

  _pause() {
    this.videoDomNode.pause();
  }

  _play() {
    this.videoDomNode.play();
  }

  _saveRef = ref => {
    this.videoDomNode = ref;
  }

  render() {
    return (
      <video ref={this._saveRef} preload="auto">
        <source src={video} type="video/mkv" />
      </video>
    );
  }
}

Video.propTypes = propTypes;
Video.defaultProps = defaultProps;
Video.displayName = 'Video';
