import * as React from "react";
import * as ReactDOM from "react-dom";

import { createStore } from "redux";

import Reducer from "./common/Reducer.jsx";
import ToDoList from "./component/ToDoList.jsx";

let store = createStore(Reducer);

console.log(store);

class App extends React.Component {
	static childContextTypes = {
		"store": React.PropTypes.object
	}

	getChildContext() {
		return {
			"store": this.props.store
		}
	}

	constructor(props) {
		super(props);
		this.displayName = 'App';
	}

	render() {
		console.log(this.context);
		return <ToDoList/>;
	}
}

ReactDOM.render(<App store={store}/>, document.getElementById('app'));