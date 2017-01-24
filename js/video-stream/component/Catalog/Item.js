'use strict';

import React, { Component, PropTypes } from 'react';
import { ListItem } from 'material-ui/List';

import { noop } from '../../utils/misc';

const propTypes = {
  title: PropTypes.string,
  index: PropTypes.number,
  onClick: PropTypes.func,
};

const defaultProps = {
  title: '',
  index: 0,
  onClick: noop,
};

export class Item extends Component {
  _handleClick = () => {
    this.props.onClick(this.props.index);
  }

  render() {
    return (
      <ListItem
        primaryText={this.props.title}
        onClick={this._handleClick}
      />
    );
  }
}

Item.propTypes = propTypes;
Item.defaultProps = defaultProps;
Item.displayName = 'Item';
