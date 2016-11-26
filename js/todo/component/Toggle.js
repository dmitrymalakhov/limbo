import React, { Component } from 'react';

class Toggle extends Component {
	constructor(props) {
		super(props);
		this.displayName = 'Toggle';
	}

	handleClick = (k) => {
		this.props.onChange && this.props.onChange(k);
	}

	render() {
		let items = [];

		for (var i = 0, len = this.props.data.length; i < len; i ++) {
			const {k, v} = this.props.data[i];

			items.push(
				<div key={k} className="item" onClick={this.handleClick.bind(this, k)}>
					<span className="caption">{v}</span>
				</div>
			);
		}

		return <div className="toggle">
			{items}
		</div>;
	}
}

export default Toggle;
