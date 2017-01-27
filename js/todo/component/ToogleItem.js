import React, { Component, PropTypes } from 'react';
import { noop } from '../utils/misc';

class ToggleItem extends Component {
  static displayName = 'ToggleItem';
  static propTypes = {
    k: PropTypes.string,
    v: PropTypes.string,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    k: '',
    v: '',
    onChange: noop,
  };

  _handleClick = () => {
    this.props.onChange(this.props.k);
  }

  render() {
    return (
      <div key={this.props.k} className="item" onClick={this._handleClick}>
        <span className="caption">{this.props.v}</span>
      </div>
    );
  }
}

export default ToggleItem;
