import {
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import { basePost, BasePost } from '../../../lib/abstract-types/';
import { Meta, TypedFields } from '../../../lib/strongTypes';

export interface UniquePostFields {
    /** The terms assigned to the object in the category taxonomy. */
    categories: number[];
    /** The format for the object. */
    format: 'standard'|'status';
    /** The number of Liveblog Likes the post has. */
    liveblog_likes: number;
    /** A password to protect access to the content and excerpt. */
    password: 'string';
    /** Whether or not the object should be treated as sticky. */
    sticky: boolean;
    /** The terms assigned to the object in the post_tag taxonomy. */
    tags: number[];
}

export interface Post<TMeta = Meta> extends BasePost<TMeta>, UniquePostFields {
    /** String literal. Will always be "post" for posts. */
    readonly type: 'post';
}

const postFields: TypedFields<UniquePostFields, Post> = {
    categories: {
        description: 'The terms assigned to the object in the category taxonomy.',
        type: new GraphQLList(GraphQLInt),
    },
    format: {
        description: 'The format for the object.',
        type: GraphQLString,
    },
    liveblog_likes: {
        description: 'The number of Liveblog Likes the post has.',
        type: GraphQLInt,
    },
    password: {
        description: 'A password to protect access to the content and excerpt.',
        type: GraphQLString,
    },
    sticky: {
        description: 'Whether or not the object should be treated as sticky.',
        type: GraphQLBoolean,
    },
    tags: {
        description: 'The terms assigned to the object in the post_tag taxonomy.',
        type: new GraphQLList(GraphQLInt),
    },
};

export default new GraphQLObjectType({
    name: 'Post',
    description: 'A WordPress Post Object.',
    fields: () => ({
        ...basePost,
        ...postFields,
    }),
});
