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
  Tag,
  getUser,
  addEmployee,
  removeEmployee,
  getEmployee,
  getEmployees,
  getTag,
  getTags
} from './database';

const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    const {type, id} = fromGlobalId(globalId);

    if(type === 'User') {
      return getUser(id);
    } else if (type === 'Employee') {
      return getEmployee(id);
    } else if (type === 'Tag') {
      return getTag(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if(obj instanceof User) {
      return GraphQLUser;
    } else if(obj instanceof Employee) {
      return GraphQLEmployee;
    } else if(obj instanceof Tag) {
      return GraphQLTag;
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
    },
    tags: {
      type: TagConnection,
      args: connectionArgs,
      resolve: (user, args) => connectionFromArray(getTags(), args)
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
    },
    tags: {
      type: TagConnection,
      args: connectionArgs,
      resolve: (employee, args) => {
        console.log(getTags(employee.id));
        return connectionFromArray(getTags(employee.id), args)
      }
    }
  }),
  interface: [nodeInterface]
});

var GraphQLTag = new GraphQLObjectType({
  name: 'Tag',
  fields: () => ({
    id: globalIdField('Tag'),
    name: {
      type: GraphQLString,
      resolve: obj => obj.name
    }
  }),
  interface: [nodeInterface]
})

var {
  connectionType: EmployeeConnection,
  edgeType: GraphQLEmployeeEdge
} = connectionDefinitions({
  name: 'Employee', nodeType: GraphQLEmployee
});

var {
  connectionType: TagConnection,
  edgeType: GraphQLTagEdge
} = connectionDefinitions({
  name: 'Tag', nodeType: GraphQLTag
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