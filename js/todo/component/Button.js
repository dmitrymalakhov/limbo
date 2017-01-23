'use strict';

import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

import { noop } from '../utils/misc';

const StyleButton = styled.button`
  background: #FAF;
`;

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
      <StyleButton onClick={this._handleClick}>
        {this.props.title}
      </StyleButton>
    );
  }
}
