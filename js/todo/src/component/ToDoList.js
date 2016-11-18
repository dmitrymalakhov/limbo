import React, { Component, PropTypes } from "react";
import { connect } from 'react-redux';

import {
	addItem,
	changeInput,
	removeItem,
	сompleteItem,
	changeFilter,
	changeSort
} from '../actions/app';

import List from "./List";
import Button from "./Button";
import Toggle from "./Toggle";

class ToDoList extends Component {
	static propTypes = {
		app: PropTypes.any,
		onAddItem: PropTypes.func,
		onChangeInput: PropTypes.func,
		onChangeFilter: PropTypes.func,
		onChangeSort: PropTypes.func,
	};

	static defaultProps = {};

	addItem = () => {
		this.props.app.content.length && this.props.onAddItem(this.props.app.content);
	}

	handlerInput = (event) => {
		this.props.onChangeInput(event.target.value);
	}

	handlerFilter = (k) => {
		this.props.onChangeFilter(k);
	}

	handleSort = (k) => {
		this.props.onChangeSort(k);
	}

	render() {
		return <div className="todolist">
			<div className="form">
				<input onChange={ this.handlerInput } value={ this.props.app.content } />
				<Button title="Add Item" onClick={ this.addItem } />
			</div>
			<div className="toolbar">
				<div>
					Filter by:
					<Toggle
						onChange={this.handlerFilter}
						data={[
							{k: "all", v: "All"},
							{k: "completed", v: "Completed"},
							{k: "uncompleted", v: "Uncompleted"}
						]}
					/>
				</div>
				<div>
					Sort by:
					<Toggle
						onChange={this.handleSort}
						data={[{k: "id", v: "ID"}, {k: "content", v: "Content"}]}
					/>
				</div>
			</div>
			<List items={ this.props.app.items.filter((item) => { return item.show == true }) } />
		</div>;
	}
}

const mapStateToProps = (state) => ({
	app: state.app
});

const mapDispatchToProps = dispatch => ({
	onAddItem: content => void dispatch(addItem(content)),
	onChangeInput: value => void dispatch(changeInput(value)),
	onChangeFilter: k => void dispatch(changeFilter(k)),
	onChangeSort: k => void dispatch(changeSort(k))
});

ToDoList.displayName = "ToDoList";

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ToDoList);
