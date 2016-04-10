 import React from 'react';

class Button extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = 'Button';
	}

	onClick = () => {
		this.props.onClick && this.props.onClick();
	}

	render() {
		return <button onClick={this.onClick}>{this.props.title}</button>;
	}
}

export default Button;