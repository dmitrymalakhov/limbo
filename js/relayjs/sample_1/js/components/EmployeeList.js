import React from 'react';
import Relay from 'react-relay';

import Employee from './Employee.js';

import AddEmployeeMutation from '../mutations/AddEmployeeMutation';

class EmployeeList extends React.Component {
  state = {
    text: ''
  }

  _addEmployee = () => {
    this.props.relay.commitUpdate(
      new AddEmployeeMutation({name: this.state.text, viewer: this.props.viewer})
    )
  }

  render() {
    return <div>
      <ul>
        {
          this.props.viewer.employees.edges.map(edge => <Employee key={edge.node.id} employee={edge.node} viewer={this.props.viewer}/>)
        }
      </ul>
      <div>
          <input onChange={(e) => {this.setState({text: e.target.value})}}/>
          <button onClick={this._addEmployee}>Add</button>
        </div>
    </div>
  }
}

export default Relay.createContainer(EmployeeList, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        employees (first: 100){
          edges {
            node {
              id,
              ${Employee.getFragment('employee')},
            },
          },
        },
        ${AddEmployeeMutation.getFragment('viewer')}
      }
    `,
  },
});