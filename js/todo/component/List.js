import React, { Component } from 'react';
import Item from './Item';

class List extends Component {
  constructor(props) {
    super(props);
    this.displayName = 'List';
  }

  getItems() {
    const items = [];

    for (let i = 0, len = this.props.items.length; i < len; i++) {
      const item = this.props.items[i];
      items.push(<Item key={i} content={item.content} id={item.id} completed={item.completed} />);
    }

    return items;
  }

  render() {
    return (<div className="list">
      {this.getItems()}
    </div>);
  }
}

export default List;
