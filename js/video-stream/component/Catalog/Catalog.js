'use strict';

import React, { PropTypes, Component } from 'react';
import { List } from 'material-ui/List';

import { Item } from './Item';
import { noop } from '../../utils/misc';

const propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      src: PropTypes.string,
    }),
  ),
  onChange: PropTypes.func,
};

const defaultProps = {
  list: '',
  onChange: noop,
};

export class Catalog extends Component {
  _handleClick = index => {
    this.props.onChange(index);
  }

  render() {
    const items = this.props.list.map(
      (item, index) => (
        <Item
          key={index}
          index={index}
          title={item.title}
          onClick={this._handleClick}
        />
      ),
    );

    return (
      <List>
        {items}
      </List>
    );
  }
}

Catalog.propTypes = propTypes;
Catalog.defaultProps = defaultProps;
Catalog.displayName = 'Catalog';
