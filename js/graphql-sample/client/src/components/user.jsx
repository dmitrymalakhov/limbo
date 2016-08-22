import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

class User extends React.Component {
	render() {
		<div>
			<h2>User: {this.props.user.name}</h2>
		</div>
	}
}

exports.Container = Relay.createContailner(App, {
	user: () => Relay.QL 'query={user(id:"2"){name}}'
});