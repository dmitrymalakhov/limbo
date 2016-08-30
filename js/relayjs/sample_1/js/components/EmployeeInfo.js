import React from 'react';
import Relay from 'react-relay';

class EmployeeInfo extends React.Component {
  render() {
    return <div>
      <h3>Name: {this.props.currentName}</h3>
      <h3>Phone: {this.props.currentPhone}</h3>
    </div>;
  }
}

export default Relay.createContainer(EmployeeInfo, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        employees (first: 100){
          edges {
            node {
              id,
              name
            },
          },
        },
      }
    `,
  },
});