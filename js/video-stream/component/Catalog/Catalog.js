import React, { PropTypes, Component } from 'react';
import { List } from 'material-ui/List';

import { Item } from './Item';

const propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      src: PropTypes.string,
    }),
  ),
};

const defaultProps = {
  list: '',
};

export class Catalog extends Component {
  _handleClick = index => {
    console.log(index);
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
