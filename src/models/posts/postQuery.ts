import {
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
} from 'graphql';
import {
    Context,
    contextType,
    Order,
    orderType,
} from '../../lib/abstract-types/';
import { ArgumentField } from '../../lib/strongTypes';
import enumFactory from '../../lib/type-factories/enumFactory';
import { PostStatus, postStatusType } from '../post-statuses/postStatusType';
import postType, { Post } from './types/postType';

export interface PostsArgs {
    /** Limit response to resources published after a given ISO8601 compliant date. */
    after?: string;
    /** Limit result set to posts assigned to specific authors. */
    author?: number[];
    /** Ensure result set excludes posts assigned to specific authors. */
    author_exclude?: number[];
    /** Limit response to resources published before a given ISO8601 compliant date. */
    before?: string;
    /** Limit result set to all items that have the specified term assigned in the categories taxonomy. */
    categories?: number[];
    /** Limit result set to all items except those that have the specified term assigned in the categories taxonomy. */
    categories_exclude?: number[];
    /** Scope under which the request is made; determines fields present in response. */
    context?: Context;
    /** Ensure result set excludes specific ids. */
    exclude?: number[];
    /** Limit result set to specific ids. */
    include?: number[];
    /** Offset the result set by a specific number of items. */
    offset?: number;
    /** Order sort attribute ascending or descending. */
    order?: Order;
    /** Sort collection by object attribute. */
    orderby?: 'date'|'relevance'|'id'|'include'|'title'|'slug';
    /** Current page of the collection. */
    page?: number;
    /** Maximum number of items to be returned in result set. */
    per_page?: number;
    /** Limit results to those matching a string. */
    search?: string;
    /** Limit result set to posts with a specific slug. */
    slug?: string;
    /** Limit result set to posts assigned a specific status. */
    status?: PostStatus;
    /** Limit result set to items that are sticky. */
    sticky?: boolean;
    /** Limit result set to all items that have the specified term assigned in the tags taxonomy. */
    tags?: number[];
    /** Limit result set to all items except those that have the specified term assigned in the tags taxonomy. */
    tags_exclude?: number[];
}

const posts: ArgumentField<PostsArgs, any, any> = {
    description: 'Retrieve a list of posts.',
    type: new GraphQLList(postType),
    args: {
        after: {
            description: 'Limit response to resources published after a given ISO8601 compliant date.',
            type: GraphQLString,
        },
        author: {
            description: 'Limit result set to posts assigned to specific authors.',
            type: new GraphQLList(GraphQLInt),
        },
        author_exclude: {
            description: 'Ensure result set excludes posts assigned to specific authors.',
            type: new GraphQLList(GraphQLInt),
        },
        before: {
            description: 'Limit response to resources published before a given ISO8601 compliant date.',
            type: GraphQLString,
        },
        categories: {
            description:
                'Limit result set to all items that have the specified term assigned in the categories taxonomy.',
            type: new GraphQLList(GraphQLInt),
        },
        categories_exclude: {
            description: 'Limit result set to all items except those that have the specified term ' +
                'assigned in the categories taxonomy.',
            type: new GraphQLList(GraphQLInt),
        },
        context: {
            description: 'Scope under which the request is made; determines fields present in response.',
            type: contextType,
        },
        exclude: {
            description: 'Ensure result set excludes specific ids.',
            type: new GraphQLList(GraphQLInt),
        },
        include: {
            description: 'Limit result set to specific ids.',
            type: new GraphQLList(GraphQLInt),
        },
        offset: {
            description: 'Offset the result set by a specific number of items.',
            type: GraphQLInt,
        },
        order: {
            description: 'Order sort attribute ascending or descending.',
            type: orderType,
        },
        orderby: {
            description: 'Sort collection by object attribute.',
            type: enumFactory('PostOrderBy', [
                'date',
                'id',
                'include',
                'relevance',
                'slug',
                'title',
            ]),
        },
        page: {
            description: 'Current page of the collection.',
            type: GraphQLInt,
        },
        per_page: {
            description: 'Maximum number of items to be returned in result set.',
            type: GraphQLInt,
        },
        search: {
            description: 'Limit results to those matching a string.',
            type: GraphQLString,
        },
        slug: {
            description: 'Limit result set to posts with a specific slug.',
            type: GraphQLString,
        },
        status: {
            description: 'Limit result set to posts assigned a specific status.',
            type: new GraphQLList(postStatusType),
        },
        sticky: {
            description: 'Limit result set to items that are sticky.',
            type: GraphQLBoolean,
        },
        tags: {
            description: 'Limit result set to all items that have the specified term assigned in the tags taxonomy.',
            type: new GraphQLList(GraphQLInt),
        },
        tags_exclude: {
            description: 'Limit result set to all items except those that have the ' +
                'specified term assigned in the tags taxonomy.',
            type: new GraphQLList(GraphQLInt),
        },
    },
    resolve: (_root, args: PostsArgs, context): PromiseLike<Post[]> => context.get('/posts', args),
};

export interface PostArgs {
    /** Scope under which the request is made; determines fields present in response. */
    context?: Context;
    /** The ID of the post. */
    id: number;
    /** The password for the post if it is password protected. */
    password?: string;
}

const post: ArgumentField<PostArgs, any, any> = {
    type: postType,
    args: {
        context: {
            description: 'Scope under which the request is made; determines fields present in response.',
            type: contextType,
        },
        id: {
            description: 'The ID of the post.',
            type: new GraphQLNonNull(GraphQLInt),
        },
        password: {
            description: 'The password for the post if it is password protected.',
            type: GraphQLString,
        },
    },
    resolve: (_root, { id, ...args }: PostArgs, context): PromiseLike<Post> => context.get(`/posts/${id}`, args),
};

export default {
    posts,
    post,
};
