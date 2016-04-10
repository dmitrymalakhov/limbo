import React from 'react';
import * as Action from '../common/Action.jsx';

class Item extends React.Component {
	static contextTypes = {
		"store": React.PropTypes.object
	}

	constructor(props) {
		super(props);
		this.displayName = 'Item';
	}

	remove = () => {
		let { id } = this.props;
		const { store } = this.context;

		store.dispatch(Action.removeItem(id));
	}

	render() {
		let { content } = this.props;

		return <div className="item">
			<div className="content">{content}</div>
			<div className="remove" onClick={this.remove}>X</div>
		</div>;
	}
}

export default Item;
