import React from 'react';
import Relay from 'react-relay';

export default class Employee extends React.Component {
  _removeEmployee(id) {

  }

  render() {
    return <div>
      {this.props.employee.name}
      <button onClick={this._removeEmployee.bind(this, this.props.employee.id)}>Remove</button>
    </div>
  }
}