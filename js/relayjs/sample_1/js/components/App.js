import React from 'react';
import Relay from 'react-relay';

import AddEmployeeMutation from '../mutations/AddEmployeeMutation';

import EmployeeList from './EmployeeList';

class App extends React.Component {
  _addEmployee = () => {
    this.props.relay.commitUpdate(
      new AddEmployeeMutation({name: "TEST"})
    )
  }

  render() {
    return (
      <div>
        <EmployeeList data={this.props.viewer.employees.edges}/>
        <div>
          <input/>
          <button onClick={this._addEmployee}>Add</button>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        employees (first: 10){
          edges {
            node {
              id,
              name,
            },
          },
        },
      }
    `,
  },
});
