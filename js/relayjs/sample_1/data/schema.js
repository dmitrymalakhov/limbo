import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

const STORE = {
  products: [
    {name: 'Product #1', steepingTime: 5, externalInfo: {price: 10, weight: 100}},
    {name: 'Product #2', steepingTime: 3, externalInfo: {price: 12, weight: 120}},
    {name: 'Product #3', steepingTime: 3, externalInfo: {price: 13, weight: 140}}
  ],
};

var ExternalInfoType = new GraphQLObjectType({
  name: 'ExternalInfo',
  fields: () => ({
    price: {type: GraphQLInt},
    weight: {type: GraphQLInt}
  })
});

var ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    name: {type: GraphQLString},
    steepingTime: {type: GraphQLInt},
    externalInfo: {type: ExternalInfoType}
  }),
});

var StoreType = new GraphQLObjectType({
  name: 'Store',
  fields: () => ({
    products: {type: new GraphQLList(ProductType)},
  }),
});

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      store: {
        type: StoreType,
        resolve: () => STORE,
      },
    }),
  }),
});
