import { schema } from 'normalizr'

const userSchema = new schema.Entity('users');
const labelSchema = new schema.Entity('labels');

// const blogSchema = new schema.Entity('blogs', {
//     owner: userSchema
// }, { idAttribute: blog => blog.id });

const commentSchema = new schema.Entity('comments', {
    user: userSchema,
}, { idAttribute: comment => comment.id });

const postSchema = new schema.Entity('posts', {
    labels: [labelSchema],
    comments: [commentSchema]
}, { idAttribute: post => post.id });

export default {
    posts: [postSchema]
}