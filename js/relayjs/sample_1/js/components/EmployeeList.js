import React from 'react';
import Relay from 'react-relay';

import Employee from './Employee.js';

class EmployeeList extends React.Component {
  render() {
    return <ul>
      {
        this.props.viewer.employees.edges.map(edge => <Employee key={edge.node.id} employee={edge.node} viewer={this.props.viewer}/>)
      }
    </ul>
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
              name,
            },
          },
        }
      }
    `,
  },
});