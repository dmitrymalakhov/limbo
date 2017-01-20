import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { noop } from '../utils/misc';

import {
  addItem,
  changeInput,
  changeFilter,
  changeSort,
} from '../actions/app';

import List from './List';
import Button from './Button';
import Toggle from './Toggle';

class ToDoList extends Component {
  static displayName = 'ToDoList';
  static propTypes = {
    app: PropTypes.shape({
      items: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          content: PropTypes.string,
          completed: PropTypes.bool,
          show: PropTypes.bool,
        }),
      ),
      content: PropTypes.string,
    }),
    onAddItem: PropTypes.func,
    onChangeInput: PropTypes.func,
    onChangeFilter: PropTypes.func,
    onChangeSort: PropTypes.func,
  };

  static defaultProps = {
    app: {
      items: [],
      content: '',
    },
    onAddItem: noop,
    onChangeInput: noop,
    onChangeFilter: noop,
    onChangeSort: noop,
  };

  _handleAddItem = () => {
    if (!this.props.app.content.length) return;
    this.props.onAddItem(this.props.app.content);
  }

  _handleInput = event => {
    this.props.onChangeInput(event.target.value);
  }

  _handleFilter = k => {
    this.props.onChangeFilter(k);
  }

  _handleSort = k => {
    this.props.onChangeSort(k);
  }

  _getItems() {
    if (!this.props.app.items.length) return [];
    return this.props.app.items.filter(item => item.show === true);
  }

  render() {
    return (
      <div className="todolist">
        <div className="form">
          <input onChange={this._handleInput} value={this.props.app.content} />
          <Button title="Add Item" onClick={this._handleAddItem} />
        </div>
        <div className="toolbar">
          <div>
            Filter by:
            <Toggle
              onChange={this._handleFilter}
              data={[
                { k: 'all', v: 'All' },
                { k: 'completed', v: 'Completed' },
                { k: 'uncompleted', v: 'Uncompleted' },
              ]}
            />
          </div>
          <div>
            Sort by:
            <Toggle
              onChange={this._handleSort}
              data={[
                { k: 'id', v: 'ID' },
                { k: 'content', v: 'Content' },
              ]}
            />
          </div>
          <div>
            <List
              items={this._getItems()}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  app: state.app,
});

const mapDispatchToProps = dispatch => ({
  onAddItem: content => void dispatch(addItem(content)),
  onChangeInput: value => void dispatch(changeInput(value)),
  onChangeFilter: k => void dispatch(changeFilter(k)),
  onChangeSort: k => void dispatch(changeSort(k)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToDoList);
