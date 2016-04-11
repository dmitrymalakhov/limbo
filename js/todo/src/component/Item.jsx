import React from 'react';
import Checkbox from "./Checkbox.jsx";
import * as Action from '../common/Action.jsx';

class Item extends React.Component {
	static contextTypes = {
		"store": React.PropTypes.object
	}

	constructor(props) {
		super(props);
		this.displayName = 'Item';
	}

	handlerRemove = () => {
		let { id } = this.props;
		const { store } = this.context;

		store.dispatch(Action.removeItem(id));
	}

	handlerComplete = () => {
		const { store } = this.context;
		let { id, completed } = this.props;

		store.dispatch(Action.сompleteItem(id, completed ? false : true));
	}

	render() {
		let { content, completed } = this.props;

		let className = ["item"];

		completed && className.push("completed");

		return <div className={className.join(" ")}>
			<div className="content">{content}</div>
			<div className="remove" onClick={this.handlerRemove}>X</div>
			<Checkbox checked={completed} onChange={this.handlerComplete}/>
		</div>;
	}
}

export default Item;
