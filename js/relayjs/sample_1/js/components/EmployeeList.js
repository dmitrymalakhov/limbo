import React from 'react';
import Relay from 'react-relay';

export default class EmployeeList extends React.Component {
  render() {
    return <div>
      {this.props.data.map(edge =>
        <div key={edge.node.id}>{edge.node.name} (ID: {edge.node.id})</div>
      )}
    </div>
  }
}
