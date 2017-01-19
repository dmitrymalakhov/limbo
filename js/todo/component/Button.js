'use strict';

import React, { Component, PropTypes } from 'react';
import { noop } from '../utils/misc';

export default class Button extends Component {
  static displayName = 'Button';
  static propTypes = {
    title: PropTypes.string,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    title: '',
    onClick: noop,
  };

  _handleClick = () => {
    this.props.onClick();
  }

  render() {
    return (
      <button onClick={this._handleClick}>
        {this.props.title}
      </button>
    );
  }
}
