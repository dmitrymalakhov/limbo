import Relay from 'react-relay';

export default class AddEmployeeMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL `
      fragment on User {
        id
      }
    `
  };

  getMutation() {
    return Relay.QL `mutation{addEmployee}`;
  }
  getFatQuery() {
    return Relay.QL `
      fragment on AddEmployeePayload @relay(pattern: true) {
        employeeEdge,
        viewer {
          employees
        }
      }
    `
  }
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'employees',
      edgeName: 'employeeEdge',
    }];
  }
  getVariables() {
    return {
      text: this.props.text,
    };
  }
}