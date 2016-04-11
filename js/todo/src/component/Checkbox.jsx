import React from 'react';

class Checkbox extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = 'Checkbox';
	}

	onChange = () => {
		this.props.onChange && this.props.onChange();
	}

	render() {
		return <input className="checkbox" checked={this.props.checked} onChange={this.onChange} type="checkbox"/>;
	}
}

export default Checkbox;
