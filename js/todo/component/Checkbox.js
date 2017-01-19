import React, { Component, PropTypes } from 'react';
import { noop } from '../utils/misc';

export default class Checkbox extends Component {
  static displayName = 'Checkbox';
  static propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    checked: false,
    onChange: noop,
  };

  _handleChange = () => {
    this.props.onChange();
  }

  render() {
    return (
      <input
        className="checkbox"
        checked={this.props.checked}
        onChange={this._handleChange}
        type="checkbox"
      />
    );
  }
}
