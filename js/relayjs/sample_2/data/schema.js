import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import {
  mutationWithClientMutationId,
} from 'graphql-relay';

const STORY = {
  comments: [],
  id: '42',
};

var CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    id: {type: GraphQLID},
    text: {type: GraphQLString},
  }),
});

var StoryType = new GraphQLObjectType({
  name: 'Story',
  fields: () => ({
    comments: { type: new GraphQLList(CommentType) },
    id: { type: GraphQLString },
  }),
});

var CreateCommentMutation = mutationWithClientMutationId({
  name: 'CreateComment',
  inputFields: {
    text: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    story: {
      type: StoryType,
      resolve: () => STORY,
    },
  },
  mutateAndGetPayload: ({text}) => {
    var newComment = {
      id: STORY.comments.length,
      text,
    };
    STORY.comments.push(newComment);
    return newComment;
  },
});

const RemoveCommentMutation = mutationWithClientMutationId({
  name: 'RemoveComment',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    deletedCommentId: {
      type: GraphQLID,
      resolve: () => STORY
    }
  },
  mutateAndGetPayload: ({id}) => {
    STORY.comments = STORY.comments.filter((item) => {return item.id !== id});
    return {id};
  },
});

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      story: {
        type: StoryType,
        resolve: () => STORY,
      },
    }),
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      createComment: CreateCommentMutation,
      removeComment: RemoveCommentMutation
    }),
  }),
});
