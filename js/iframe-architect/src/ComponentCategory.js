import React, { Component } from 'react';
import ComponentItem from './ComponentItem';

export default class ComponentCategory extends Component {
  render() {
    let _items = this.props.data.map((item) => {
      return <ComponentItem name={item.componentName}/>
    });

    return <div>
      <h3>{this.props.title}</h3>
      {_items}
    </div>;
  }
}