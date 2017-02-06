import {
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
} from 'graphql';
import { contextType } from '../../lib/abstract-types';
import { StrongTypedFieldConfig } from '../../lib/strongTypes';
import { Category, categoryType } from './categoryType';

export interface CategoriesArgs {
    /** Scope under which the request is made; determines fields present in response. */
    context?: 'view'|'embed'|'edit';
    /** Current page of the collection. */
    page?: number;
    /** Maximum number of items to be returned in result set. */
    per_page?: number;
    /** Limit results to those matching a string. */
    search?: string;
    /** Ensure result set excludes specific IDs. */
    exclude?: string;
    /** Limit result set to specific IDs. */
    include?: string;
    /** Order sort attribute ascending or descending. */
    order?: 'asc'|'desc';
    /** Sort collection by term attribute. */
    orderby?: 'id'|'name'|'slug'|'term_group'|'description'|'count';
    /** Whether to hide terms not assigned to any posts. */
    hide_empty?: boolean;
    /** Limit result set to terms assigned to a specific parent. */
    parent?: string;
    /** Limit result set to terms assigned to a specific post. */
    post?: string;
    /** Limit result set to terms with a specific slug. */
    slug?: string;
}

const categories: StrongTypedFieldConfig<CategoriesArgs, any, any> = {
    description: 'List categories.',
    type: new GraphQLList(categoryType),
    args: {
        context: {
            description: 'Scope under which the request is made; determines fields present in response.',
            type: contextType,
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
        exclude: {
            description: 'Ensure result set excludes specific IDs.',
            type: GraphQLString,
        },
        include: {
            description: 'Limit result set to specific IDs.',
            type: GraphQLString,
        },
        order: {
            description: 'Order sort attribute ascending or descending.',
            type: GraphQLString,
        },
        orderby: {
            description: 'Sort collection by term attribute.',
            type: GraphQLString,
        },
        hide_empty: {
            description: 'Whether to hide terms not assigned to any posts.',
            type: GraphQLBoolean,
        },
        parent: {
            description: 'Limit result set to terms assigned to a specific parent.',
            type: GraphQLString,
        },
        post: {
            description: 'Limit result set to terms assigned to a specific post.',
            type: GraphQLString,
        },
        slug: {
            description: 'Limit result set to terms with a specific slug.',
            type: GraphQLString,
        },
    },
    resolve: (_root, args: CategoriesArgs, context): Category[] => context.get('/categories', args),
};

export interface CategoryArgs {
    /** Scope under which the request is made; determines fields present in response. */
    context?: 'view'|'embed'|'edit';
    /** ID for the category. */
    id: number;
}

const category: StrongTypedFieldConfig<CategoryArgs, any, any> = {
    description: 'Fetch a single category.',
    type: categoryType,
    args: {
        context: {
            description: 'Scope under which the request is made; determines fields present in response.',
            type: contextType,
        },
        id: {
            description: 'ID for the category.',
            type: new GraphQLNonNull(GraphQLInt),
        },
    },
    resolve: (_root, { id, ...args }: CategoryArgs, context): Category => context.get(`/categories/${id}`, args),
};

export default {
    categories,
    category,
};