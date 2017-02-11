import {
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
    GraphQLUnionType,
} from 'graphql';
import { openClosedType } from '../../lib/abstract-types/';
import { ArgumentField } from '../../lib/strongTypes';
import { postStatusType, Status } from '../post-statuses/postStatusType';
import deletedPageType, { DeletedPage } from './types/deletedPageType';
import pageType, { Page } from './types/pageType';

export interface PageMutationOptions {
    /** The ID for the author of the object. */
    author?: number;
    /** Whether or not comments are open on the object. */
    comment_status?: 'open'|'closed';
    /** The content for the object. */
    content?: string;
    /** The date the object was published, in the site’s timezone. */
    date?: string;
    /** The date the object was published, as GMT. */
    date_gmt?: string;
    /** The excerpt for the object. */
    excerpt?: string;
    /** The ID of the featured media for the object. */
    featured_media?: number;
    /** The order of the object in relation to other object of its type. */
    menu_order: any;
    /** Meta fields. */
    meta?: any[]; // FIXME:
    /** The id for the parent of the object. */
    parent?: number;
    /** Whether or not the object can be pinged. */
    ping_status?: 'open'|'closed';
    /** An alphanumeric identifier for the object unique to its type. */
    slug?: string;
    /** A named status for the object. */
    status?: Status;
    /** The theme file to use to display the object. */
    template?: string;
    /** The title for the object. */
    title?: string;
}

const createPage: ArgumentField<PageMutationOptions, any, any> = {
    description: 'Create a page.',
    type: pageType,
    args: {
        author: {
            description: 'The ID for the author of the object.',
            type: GraphQLInt,
        },
        comment_status: {
            description: 'Whether or not comments are open on the object.',
            type: openClosedType,
        },
        content: {
            description: 'The content for the object.',
            type: GraphQLString,
        },
        date: {
            description: 'The date the object was published, in the site’s timezone.',
            type: GraphQLString,
        },
        date_gmt: {
            description: 'The date the object was published, as GMT.',
            type: GraphQLString,
        },
        excerpt: {
            description: 'The excerpt for the object.',
            type: GraphQLString,
        },
        featured_media: {
            description: 'The ID of the featured media for the object.',
            type: GraphQLInt,
        },
        menu_order: {
            description: 'The order of the object in relation to other object of its type.',
            type: GraphQLInt,
        },
        meta: {
            description: 'Meta fields.',
            type: new GraphQLList(GraphQLString),
        },
        parent: {
            description: 'The id for the parent of the object.',
            type: GraphQLInt,
        },
        ping_status: {
            description: 'Whether or not the object can be pinged.',
            type: openClosedType,
        },
        slug: {
            description: 'An alphanumeric identifier for the object unique to its type.',
            type: GraphQLString,
        },
        status: {
            description: 'A named status for the object.',
            type: postStatusType,
        },
        template: {
            description: 'The theme file to use to display the object.',
            type: GraphQLString,
        },
        title: {
            description: 'The title for the object.',
            type: GraphQLString,
        },
    },
    resolve: (_root, args, context): PromiseLike<Page> => context.post('/pages', args),
};

export interface UpdatePageArgs extends PageMutationOptions {
    /** ID of the page being upadated. */
    id: number;
}

const updatePage: ArgumentField<UpdatePageArgs, any, any> = {
    description: 'Update a page.',
    type: pageType,
    args: {
        author: {
            description: 'The ID for the author of the object.',
            type: GraphQLInt,
        },
        comment_status: {
            description: 'Whether or not comments are open on the object.',
            type: openClosedType,
        },
        content: {
            description: 'The content for the object.',
            type: GraphQLString,
        },
        date: {
            description: 'The date the object was published, in the site’s timezone.',
            type: GraphQLString,
        },
        date_gmt: {
            description: 'The date the object was published, as GMT.',
            type: GraphQLString,
        },
        excerpt: {
            description: 'The excerpt for the object.',
            type: GraphQLString,
        },
        featured_media: {
            description: 'The ID of the featured media for the object.',
            type: GraphQLInt,
        },
        id: {
            description: 'ID of the page being upadated.',
            type: new GraphQLNonNull(GraphQLInt),
        },
        menu_order: {
            description: 'The order of the object in relation to other object of its type.',
            type: GraphQLInt,
        },
        meta: {
            description: 'Meta fields.',
            type: new GraphQLList(GraphQLString),
        },
        parent: {
            description: 'The id for the parent of the object.',
            type: GraphQLInt,
        },
        ping_status: {
            description: 'Whether or not the object can be pinged.',
            type: openClosedType,
        },
        slug: {
            description: 'An alphanumeric identifier for the object unique to its type.',
            type: GraphQLString,
        },
        status: {
            description: 'A named status for the object.',
            type: postStatusType,
        },
        template: {
            description: 'The theme file to use to display the object.',
            type: GraphQLString,
        },
        title: {
            description: 'The title for the object.',
            type: GraphQLString,
        },
    },
    resolve: (_root, { id, ...args }: UpdatePageArgs, context): PromiseLike<Page> => (
        context.post(`/pages/${id}`, args)
    ),
};

const deletePageResponseUnion = new GraphQLUnionType({
    name: 'DeletePageResponse',
    types: [ deletedPageType, pageType ],
    resolveType: res => {
        if (res.deleted) {
            return deletedPageType;
        }
        return pageType;
    },
});

export interface DeletePageArgs {
    /** Whether to bypass trash and force deletion. */
    force?: boolean;
    /** The ID of the page being deleted. */
    id: number;
}

const deletePage: ArgumentField<DeletePageArgs, any, any> = {
    description: 'Delete a single page by ID.',
    type: deletePageResponseUnion,
    args: {
        force: {
            description: 'Whether to bypass trash and force deletion.',
            type: GraphQLBoolean,
        },
        id: {
            description: 'The ID of the page being deleted.',
            type: new GraphQLNonNull(GraphQLInt),
        },
    },
    resolve: (_root, { id, ...args }: DeletePageArgs, context): PromiseLike<Page|DeletedPage> => (
        context.delete(`/pages/${id}`, args)
    ),
};

export default {
    createPage,
    deletePage,
    updatePage,
};