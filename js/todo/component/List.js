import React, { Component, PropTypes } from 'react';
import Item from './Item';

export default class List extends Component {
  static displayName = 'List';
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        content: PropTypes.string,
        completed: PropTypes.bool,
        show: PropTypes.bool,
      }),
    ),
  };

  static defaultProps = {
    items: [],
  };

  _renderItems() {
    return this.props.items.map(item => (
      <Item
        key={item.id}
        content={item.content}
        id={item.id}
        completed={item.completed}
      />
    ));
  }

  render() {
    const items = this._renderItems();

    return (
      <div className="list">
        {items}
      </div>
    );
  }
}
