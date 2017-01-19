import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Checkbox from './Checkbox';

import {
   removeItem,
   сompleteItem,
} from '../actions/app';

class Item extends Component {
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
  };

  constructor(props) {
    super(props);
  }

  handlerRemove = () => {
    this.props.onRemoveItem(this.props.id);
  }

  handlerComplete = () => {
    const { id, completed } = this.props;

    this.props.onCompleteItem(id, !completed);
  }

  render() {
    const { content, completed } = this.props;

    const className = ['item'];

    completed && className.push('completed');

    return (<div className={className.join(' ')}>
      <div className="content">{content}</div>
      <div className="remove" onClick={this.handlerRemove}>X</div>
      <Checkbox checked={completed} onChange={this.handlerComplete} />
    </div>);
  }
}


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onRemoveItem: id => void dispatch(removeItem(id)),
  onCompleteItem: (id, completed) => void dispatch(сompleteItem(id, completed)),
    
});

Item.displayName = 'Item';

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Item);
