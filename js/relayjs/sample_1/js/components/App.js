import React from 'react';
import Relay from 'react-relay';

import AddEmployeeMutation from '../mutations/AddEmployeeMutation';

import EmployeeList from './EmployeeList.js';

class App extends React.Component {
  state = {
    text: ''
  }

  _addEmployee = () => {
    this.props.relay.commitUpdate(
      new AddEmployeeMutation({name: this.state.text, viewer: this.props.viewer})
    )
  }

  _updateEmployee = () => {
    
  }

  render() {
    return (
      <div>
        <EmployeeList viewer={this.props.viewer}/>
        <div>
          <input onChange={(e) => {this.setState({text: e.target.value})}}/>
          <button onClick={this._addEmployee}>Add</button>
          <button onClick={this._updateEmployee}>Update</button>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        ${EmployeeList.getFragment('viewer')}
        ${AddEmployeeMutation.getFragment('viewer')}
      }
    `,
  },
});
