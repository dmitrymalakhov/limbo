import React from 'react';
import Item from './Item.jsx';

class List extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = 'List';
	}

	getItems() {
		let items = [];

		for(let i = 0, len = this.props.items.length; i < len; i++) {
			let item= this.props.items[i];
			items.push(<Item key={i} content={item.content} id={item.id} completed={item.completed}/>);
		}

		return items;
	}

	render() {
		return <div className="list">
			{this.getItems()}
		</div>;
	}
}

export default List;
