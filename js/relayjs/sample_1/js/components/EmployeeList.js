import React from 'react';
import Relay from 'react-relay';

import Employee from './Employee.js';

class EmployeeList extends React.Component {
  state = {
    currentName: '',
    currentPhone: ''
  }

  _showEmployeeCard(employee) {
    this.setState({
      currentName: employee.name,
      currentPhone: employee.phone
    });
  }

  render() {
    return <div>
      <h3>Name: {this.state.currentName}</h3>
      <h3>Phone: {this.state.currentPhone}</h3>
      <ul>
        {
          this.props.viewer.employees.edges.map(edge => <Employee onClick={this._showEmployeeCard.bind(this)} key={edge.node.id} employee={edge.node} viewer={this.props.viewer}/>)
        }
      </ul>
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
      }
    `,
  },
});