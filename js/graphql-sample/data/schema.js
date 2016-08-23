import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  nodeDefinitions,
  globalIdField,
} from 'graphql-relay';

import {
  User,
  addUser,
  getUser,
  getUsers,
  getViewer
} from './database';

const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    const {type, id} = fromGlobalId(globalId);
    if (type === 'User') {
      return getUser(id);
    }
    return null;
  },
  (obj) => {
    if (obj instanceof User) {
      return GraphQLUser;
    }
    return null;
  }
);

const GraphQLUser = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: globalIdField('User'),
    name: {
      type: GraphQLString,
      resolve: (obj) => obj.name,
    }
  },
  interfaces: [nodeInterface]
});

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Root',
    fields: {
      viewer: {
        type: GraphQLUser,
        resolve: () => getViewer(),
      },
      node: nodeField,
    },
  })
});
