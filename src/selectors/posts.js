import createCachedSelector from 're-reselect'
import * as postActions from 'actions/posts';

const ids = (filter, blogId, orderBy, pageSize, state) => {
    const key = postActions.loadPostsKey(filter, blogId, orderBy, pageSize);
    return (state.posts[key] && state.posts[key].ids ? state.posts[key].ids : []);    
}
const posts = (filter, blogId, orderBy, pageSize, state) => (state.entities.posts ? state.entities.posts : [])

export const getPosts = createCachedSelector(
    ids,
    posts,
    (ids, posts) => ids.map(id => posts[id])
)(
    (filter, blogId, orderBy, pageSize, state) => postActions.loadPostsKey(filter, blogId, orderBy, pageSize)
);

export const getPostsLoading = (filter, blogId, orderBy, pageSize, state) => {
    const key = postActions.loadPostsKey(filter, blogId, orderBy, pageSize);
    const loading = state.posts[key] ? state.posts[key].loading : false
    return loading;
};