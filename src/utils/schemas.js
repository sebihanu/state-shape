import { schema } from 'normalizr'

const userSchema = new schema.Entity('users');
const labelSchema = new schema.Entity('labels');
const categorySchema = new schema.Entity('categories');

const subCategorySchema = new schema.Entity('subCategories', {
    category: categorySchema
}, { idAttribute: subCategory => subCategory.id });

const blogSchema = new schema.Entity('blogs', {
    owner: userSchema,
    subCategory: subCategorySchema,
}, { idAttribute: blog => blog.id });

const commentSchema = new schema.Entity('comments', {
    user: userSchema,
}, { idAttribute: comment => comment.id });

const postSchema = new schema.Entity('posts', {
    labels: [labelSchema],    
}, { idAttribute: post => post.id });

export default {
    posts: [postSchema],
    comments: [commentSchema],
    blog: blogSchema,
    post: postSchema
}