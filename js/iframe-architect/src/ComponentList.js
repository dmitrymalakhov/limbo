import React, { Component } from 'react';
import ComponentCategory from './ComponentCategory';
import Library from './Library';

var _components = []

export default class ComponentList extends React.Component {
  ;

  componentDidMount() {
    let _items = {};

    Library.forEach((item) => {
      if(!_items[item.type]) {
        _items[item.type] = [];
      }

      _items[item.type].push(item);
    });

    for(key in _item) {
      _components.push(
        <ComponentCategory data={_item[key]} title={key}/>
      );
    }
  }
  render() {
    return <div>
      {_components}
    </div>;
  }
}