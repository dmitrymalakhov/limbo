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
  nodeDefinitions,
} from 'graphql-relay';

import {
  User,
  Employee,
  getUser,
  addEmployee,
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
      return userType;
    } else if(obj instanceof Employee) {
      return employeeType;
    } else {
      return null;
    }
  }
);

var userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: globalIdField('User'),
    employees: {
      type: employeeConnection,
      args: connectionArgs,
      resolve: (user, args) => connectionFromArray(getEmployees(), args)
    }
  }),
  interface: [nodeInterface]
});

var employeeType = new GraphQLObjectType({
  name: 'Employee',
  fields: () => ({
    id: globalIdField('Employee'),
    name: {
      type: GraphQLString
    }
  }),
  interface: [nodeInterface]
});

var {connectionType: employeeConnection} = connectionDefinitions({
  name: 'Employee', nodeType: employeeType
});

var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    viewer: {
      type: userType,
      resolve: () => getUser()
    },
    node: nodeField
  }
});

var addEmployeeMutation = mutationWithClientMutationId({
  name: 'AddEmployee',
  imputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  outputFields: {
    employee: {
      type: employeeType,
      resolve: ({id}) => {
        const employee = getEmployee(id);
        return {
          cursor: cursorForObjectInConnection(getEmployees(), employee),
          node: employee
        }
      }
    },
    viewer: {
      type: userType,
      resolve: () => getUser()
    }
  },
  mutateAndGetpayload: ({name}) => {
    const id = addEmployee(name);
    return {id};
  }
});

var mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addEmployee: addEmployeeMutation
  })
});

export const Schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
})