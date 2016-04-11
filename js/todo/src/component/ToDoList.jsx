import React from "react";
import List from "./List.jsx";
import Button from "./Button.jsx";
import Toggle from "./Toggle.jsx";
import * as Action from '../common/Action.jsx';

class ToDoList extends React.Component {
	static contextTypes = {
		"store": React.PropTypes.object
	}

	constructor(props) {
		super(props);
		this.displayName = 'ToDoList';
	}

	componentDidMount() {
		const { store } = this.context;
		this.unsubscribe = store.subscribe(() => {
			this.forceUpdate();
		})
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	addItem = () => {
		const { store } = this.context;
		const state = store.getState();

		store.dispatch(Action.addItem(state.content));
	}

	handlerInput = (event) => {
		const { store } = this.context;
		store.dispatch(Action.changeInput(event.target.value));
	}

	handlerFilter = (k) => {
		const { store } = this.context;
		store.dispatch(Action.changeFilter(k));
	}

	handleSort = (k) => {
		const { store } = this.context;
		store.dispatch(Action.changeSort(k));
	}

	render() {
		const { store } = this.context;
		const state = store.getState();

		return <div className="todolist">
			<div className="form">
				<input onChange={ this.handlerInput } value={ state.content }/>
				<Button title="Add Item" onClick={ this.addItem }/>
			</div>
			<div className="toolbar">
				<div>
					Filter by: <Toggle onChange={this.handlerFilter} data={[{k: "all", v: "All"}, {k: "completed", v: "Completed"}, {k: "uncompleted", v: "Uncompleted"}]}/>
				</div>
				<div>
					Sort by: <Toggle onChange={this.handleSort} data={[{k: "id", v: "ID"}, {k: "content", v: "Content"}]}/>
				</div>
			</div>
			<List items={ state.items.filter((item) => { return item.show == true }) }/>
		</div>;
	}
}

export default ToDoList;