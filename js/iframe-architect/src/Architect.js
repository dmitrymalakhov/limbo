import React, { Component } from 'react';
import Library from './Library';

export default class Architect extends Component {
  static propTypes = {
    data: React.PropTypes.object,
  };

  static defaultProps = {
    data: {}
  };

  _onMouseOver(params) {
    this.props.onElement && this.props.onElement(params);
  }

  _compose(data) {
    if(data) {
      if(data instanceof Array) {
        return data.map((item) => {
          return this._compose(item);
        });
      } else {
        let _component = Library[data['type']];

        return React.createElement(
          _component['constructor'],
          {
            onMouseOver: this._onMouseOver.bind(this, {name: data['name'], type: _component['type']}),
            ...data['props']
          },
          
          this._compose(data['children'])
        );
      }
    } else {
      return null;
    }
  }

  render() {
    return React.createElement('div', {}, this._compose(this.props.data));
  }
}