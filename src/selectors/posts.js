import createCachedSelector from 're-reselect'
import * as postActions from 'actions/posts';
import { union } from 'lodash';

const ids = (filter, blogId, orderBy, page, pageSize, state) => {
    const key = postActions.loadPostsKey(filter, blogId, orderBy, pageSize);
    const posts = state.posts.viewPosts[key];
    if (!posts) {
        return [];
    }

    const result = Object.entries(posts).reduce((acc, [k, v]) => {
        return union(acc, k <= page ? v.ids : []);
    }, []);
    return result;
}
const posts = (filter, blogId, orderBy, page, pageSize, state) => (state.entities.posts ? state.entities.posts : [])

export const getPosts = createCachedSelector(
    ids,
    posts,
    (ids, posts) => ids.map(id => posts[id])
)(
    (filter, blogId, orderBy, page, pageSize, state) => postActions.loadPostsKey(filter, blogId, orderBy, pageSize)
);

export const getPostsLoading = (filter, blogId, orderBy, page, pageSize, state) => {
    const key = postActions.loadPostsKey(filter, blogId, orderBy, pageSize);
    const posts = state.posts.viewPosts[key];
    const loading = posts && posts[page] ? posts[page].loading : false
    return loading;
};

export const getPost = (postId, state) => {
    const editPost = state.posts.editPosts[postId];
    if (editPost && editPost.loaded) {
        const post = state.entities.posts[postId];
        return post;
    }

    return null;
}