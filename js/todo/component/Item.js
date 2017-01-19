import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { noop } from '../utils/misc';
import Checkbox from './Checkbox';

import {
   removeItem,
   сompleteItem,
} from '../actions/app';

class Item extends Component {
  static displayName = 'Item';
  static propTypes = {
    content: PropTypes.string,
    completed: PropTypes.bool,
    id: PropTypes.number,
    onRemoveItem: PropTypes.func,
    onCompleteItem: PropTypes.func,
  };

  static defaultProps = {
    content: '',
    completed: false,
    id: 0,
    onRemoveItem: noop,
    onCompleteItem: noop,
  };

  _handleRemove = () => {
    this.props.onRemoveItem(this.props.id);
  }

  _handleComplete = () => {
    const { id, completed } = this.props;

    this.props.onCompleteItem(id, !completed);
  }

  render() {
    const { content, completed } = this.props;

    const className = ['item'];

    if (completed)
      className.push('completed');

    return (
      <div className={className.join(' ')}>
        <div className="content">{content}</div>
        <div className="remove" onClick={this._handleRemove}>X</div>
        <Checkbox checked={completed} onChange={this._handleComplete} />
      </div>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  onRemoveItem: id => void dispatch(removeItem(id)),
  onCompleteItem: (id, completed) => void dispatch(сompleteItem(id, completed)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Item);
