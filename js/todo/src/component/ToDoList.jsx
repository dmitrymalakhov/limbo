import React from "react";
import List from "./List.jsx";
import Button from "./Button.jsx";
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

	onChangeInput = (event) => {
		const { store } = this.context;
		store.dispatch(Action.changeInput(event.target.value));
	}

	render() {
		const { store } = this.context;
		const state = store.getState();

		return <div className="todolist">
			<div className="form">
				<input onChange={ this.onChangeInput }/>
				<Button title="Add Item" onClick={ this.addItem }/>
			</div>
			<List items={ state.items }/>
		</div>;
	}
}

export default ToDoList;
