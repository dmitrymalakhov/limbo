import React from 'react';

class UserList extends React.Component {
	render() {
		return <div className='user-list'>{this.props.children}</div>;
	}
}