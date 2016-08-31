import React, { Component } from 'react';
import ProxyIFrame from './ProxyIFrame';

import Architect from './Architect';
import ComponentList from './ComponentList';

let data = {
  name: '_0',
  type: 'div',
  props: {},
  children: [
    {
      name: '_1',
      type: 'input',
      props: {},
      children: null
    },
    {
      name: '_2',
      type: 'input',
      props: {},
      children: null
    }
  ]
}

export default class App extends Component {
  render() {
    return (
      <div>
        <ProxyIFrame src="./static/index.html">
          <Architect data={data}/>
        </ProxyIFrame>
        <ComponentList />
      </div>
    );
  }
}
