import {
    GraphQLNonNull,
    GraphQLString,
} from 'graphql';
import { contextType } from '../../lib/abstract-types';
import { StrongTypedFieldConfig } from '../../lib/strongTypes';
import { PostType, postType as typeOfPost, PostTypeList, postTypeList } from './postTypeType';

export interface PostTypesArgs {
    /** Scope under which the request is made; determines fields present in response. */
    context?: 'view'|'embed'|'edit';
}

export interface PostTypeArgs extends PostTypesArgs {
    /** Slug of the post type being requested. */
    slug: string;
}

const postTypes: StrongTypedFieldConfig<PostTypesArgs, any, any> = {
    description: 'Retrieve an object of post types.',
    type: postTypeList,
    args: {
        context: {
            description: 'Scope under which the request is made; determines fields present in response.',
            type: contextType,
        },
    },
    resolve: (_root, args: PostTypesArgs, context): PromiseLike<PostTypeList> => context.get('/types', args),
};

const postType: StrongTypedFieldConfig<PostTypeArgs, any, any> = {
    description: 'Retrieve a single post type.',
    type: typeOfPost,
    args: {
        context: {
            description: 'Scope under which the request is made; determines fields present in response.',
            type: contextType,
        },
        slug: {
            description: 'Slug of the post type being requested.',
            type: new GraphQLNonNull(GraphQLString),
        },
    },
    resolve: (_root, { slug, ...args }: PostTypeArgs, context): PromiseLike<PostType<string>> => (
        context.get(`/types/${slug}`, args)
    ),
};

export default {
    postTypes,
    postType,
};