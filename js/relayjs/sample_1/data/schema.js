/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  cursorForObjectInConnection,
  nodeDefinitions,
} from 'graphql-relay';

import {
  User,
  Employee,
  getUser,
  addEmployee,
  removeEmployee,
  getEmployee,
  getEmployees
} from './database';

const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    const {type, id} = fromGlobalId(globalId);

    if(type === 'User') {
      return getUser(id);
    } else if (type === 'Employee') {
      return getEmployee(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if(obj instanceof User) {
      return GraphQLUser;
    } else if(obj instanceof Employee) {
      return GraphQLEmployee;
    } else {
      return null;
    }
  }
);

var GraphQLUser = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: globalIdField('User'),
    employees: {
      type: EmployeeConnection,
      args: connectionArgs,
      resolve: (user, args) => connectionFromArray(getEmployees(), args)
    }
  }),
  interface: [nodeInterface]
});

var GraphQLEmployee = new GraphQLObjectType({
  name: 'Employee',
  fields: () => ({
    id: globalIdField('Employee'),
    name: {
      type: GraphQLString,
      resolve: obj => obj.name
    },
    phone: {
      type: GraphQLString,
      resolve: obj => obj.phone
    }
  }),
  interface: [nodeInterface]
});

var {
  connectionType: EmployeeConnection,
  edgeType: GraphQLEmployeeEdge
} = connectionDefinitions({
  name: 'Employee', nodeType: GraphQLEmployee
});

var Root = new GraphQLObjectType({
  name: 'Query',
  fields: {
    viewer: {
      type: GraphQLUser,
      resolve: () => getUser()
    },
    node: nodeField
  }
});

var GraphQLAddEmployeeMutation = mutationWithClientMutationId({
  name: 'AddEmployee',
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    employeeEdge: {
      type: GraphQLEmployeeEdge,
      resolve: ({id}) => {
        const employee = getEmployee(id);
        return {
          cursor: cursorForObjectInConnection(getEmployees(), employee),
          node: employee
        }
      }
    },
    viewer: {
      type: GraphQLUser,
      resolve: () => getUser()
    }
  },
  mutateAndGetPayload: ({name}) => {
    const id = addEmployee({name});
    return {id};
  }
});

var GraphQLRemoveEmployeeMutation = mutationWithClientMutationId({
  name: 'RemoveEmployee',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  outputFields: {
    deletedEmployeeId: {
      type: GraphQLID,
      resolve: ({id}) => id
    },
    viewer: {
      type: GraphQLUser,
      resolve: () => getUser()
    }
  },
  mutateAndGetPayload: ({id}) => {
    const _id = fromGlobalId(id).id;
    removeEmployee(_id);
    return {id};
  }
})

var Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addEmployee: GraphQLAddEmployeeMutation,
    removeEmployee: GraphQLRemoveEmployeeMutation
  })
});

export const Schema = new GraphQLSchema({
  query: Root,
  mutation: Mutation
})