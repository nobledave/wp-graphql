import test from 'ava';
import WPGraphQL from '../../index';

const transport = new WPGraphQL('http://localhost:8080/wp-json/wp/v2', { __INTERNAL_TESTING__: true });
let commentId: number;

test.serial('createComment', async t => {
    const expected = {
        createComment: {
            id: 0,
            status: 'approved',
            post: 1,
            parent: 0,
            content: {
                raw: 'Test comment content.',
            },
        },
    };
    const actual = await transport.send(`
        mutation {
            createComment(post: 1, content: "Test comment content.") {
                id
                status
                post
                parent
                content {
                    raw
                }
            }
        }
    `);
    commentId = actual.createComment.id;
    expected.createComment.id = commentId;
    t.deepEqual(actual, expected);
});

test.serial('updateComment', async t => {
    if (typeof commentId === 'undefined') {
        t.pass('Dependent test failure.');
    }
    const expected = {
        updateComment: {
            id: commentId,
            status: 'spam',
            content: {
                raw: 'Test comment content.',
            },
        },
    };
    const actual = await transport.send(`
        mutation UpdateComment($id: Int!) {
            updateComment(id: $id, status: spam) {
                id
                status
                content {
                    raw
                }
            }
        }
    `, { id: commentId });
    t.deepEqual(actual, expected);
});

test.serial('deleteComment (to trash)', async t => {
    if (typeof commentId === 'undefined') {
        t.pass('Dependent test failure.');
    }
    const expected = {
        deleteComment: {
            id: commentId,
            status: 'trash',
        },
    };
    const actual = await transport.send(`
        mutation DeleteComment($id: Int!) {
            deleteComment(id: $id) {
                ... on Comment {
                    id
                    status
                }
            }
        }
    `, { id: commentId });
    t.deepEqual(actual, expected);
});

test.serial('deleteComment (skip trash)', async t => {
    if (typeof commentId === 'undefined') {
        t.pass('Dependent test failure.');
    }
    const expected = {
        deleteComment: {
            deleted: true,
            previous: {
                id: commentId,
                content: {
                    raw: 'Test comment content.',
                },
            },
        },
    };
    const actual = await transport.send(`
        mutation DeleteComment($id: Int!) {
            deleteComment(id: $id, force: true) {
                ... on DeletedComment {
                    deleted
                    previous {
                        id
                        content {
                            raw
                        }
                    }
                }
            }
        }
    `, { id: commentId });
    t.deepEqual(actual, expected);
});
