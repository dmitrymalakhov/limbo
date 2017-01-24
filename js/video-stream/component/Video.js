import React, { PropTypes } from 'react';

const propTypes = {
  src: PropTypes.string,
};

const defaultProps = {
  src: '',
};

export const Video = props => (
  <video src={props.src} preload="auto" />
);

Video.propTypes = propTypes;
Video.defaultProps = defaultProps;
Video.displayName = 'Video';
