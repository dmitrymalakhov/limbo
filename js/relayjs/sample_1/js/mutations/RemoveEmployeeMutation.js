import Relay from 'react-relay';

export default class RemoveEmployeeMutation extends Relay.Mutation {
  static fragments = {
    employee: () => Relay.QL `
      fragment on Employee {
        id,
      }
    `,
  };

  getMutation() {
    return Relay.QL `mutation{removeEmployee}`;
  }
  getFatQuery() {
    return Relay.QL `
      fragment on RemoveEmployeePayload @relay(pattern: true) {
        deletedEmployeeId,
        viewer {
          id
        }
      }
    `
  }
  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'employees',
      deletedIDFieldName: 'deletedEmployeeId'
    }]
  }
  getVariables() {
    return {
      id: this.props.employee.id
    }
  }
}