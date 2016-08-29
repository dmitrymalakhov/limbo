import React from 'react';
import Relay from 'react-relay';

import RemoveEmployeeMutation from '../mutations/RemoveEmployeeMutation';

class Employee extends React.Component {
  _removeEmployee() {
    this.props.relay.commitUpdate(
      new RemoveEmployeeMutation({employee: this.props.employee, viewer: this.props.viewer})
    )
  }

  _onClick = () => {
    this.props.onClick && this.props.onClick(this.props.employee);
  }

  render() {
    return <div>
      <span onClick={this._onClick}>{this.props.employee.name}</span>
      <button onClick={this._removeEmployee.bind(this)}>Remove</button>
    </div>
  }
}

export default Relay.createContainer(Employee, {
  fragments: {
    employee: () => Relay.QL `
      fragment on Employee {
        id,
        name,
        phone,
        ${RemoveEmployeeMutation.getFragment('employee')}
      }
    `,
  }
});