import React, { Component } from 'react';
import ComponentCategory from './ComponentCategory';
import Library from './Library';

var _components = []

export default class ComponentList extends React.Component {
  componentWillMount() {
    let _items = {};

    for(let key in Library) {
      if(!_items[Library[key]['type']]) {
        _items[Library[key]['type']] = [];
      }

      _items[Library[key]['type']].push(Library[key]);
    }

    for(let key in _items) {
      _components.push(
        <ComponentCategory data={_items[key]} title={key} key={key}/>
      );
    }
  }

  render() {
    return <div className='component-list'>
      {_components}
    </div>;
  }
}