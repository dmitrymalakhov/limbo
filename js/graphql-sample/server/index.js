var graphql = require('graphql');
var graphqlHTTP = require('express-graphql');
var express = require('express');

var users = require('./data/users.json');

var userType = new graphql.GraphQLObjectType({
	name: 'User',
	fields: {
		'id': { type: graphql.GraphQLString },
		'name': { type: graphql.GraphQLString }
	}
});

var schema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: userType,
        args: {
          id: { type: graphql.GraphQLString }
        },
        resolve: function(_, args) {
          return users[args.id];
        }
      }
    }
  })
});

express().use('/graphql', graphqlHTTP({schema: schema, pretty: true})).listen(3000)