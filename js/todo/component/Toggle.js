import React, { Component, PropTypes } from 'react';
import { noop } from '../utils/misc';

import ToogleItem from './ToogleItem';

class Toggle extends Component {
  static displayName = 'Toggle';
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      k: PropTypes.string,
      v: PropTypes.string,
    })),
    onChange: PropTypes.func,
  };

  static defaultProps = {
    data: [],
    onChange: noop,
  };

  _handleClick = k => {
    this.props.onChange(k);
  }

  render() {
    const items = this.props.data.map(item => (
      <ToogleItem key={item.k} k={item.k} v={item.v} />
    ));

    return (
      <div className="toggle">
        {items}
      </div>
    );
  }
}

export default Toggle;
