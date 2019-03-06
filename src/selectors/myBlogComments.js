import { createSelector } from 'reselect'
import createCachedSelector from 're-reselect'
import * as postActions from 'actions/posts';

// const ids = (filter, orderBy, pageSize, state) => {
//     const key = postActions.loadPostsKey(filter, orderBy, pageSize);
//     return (state.myPosts[key] && state.myPosts[key].ids ? state.myPosts[key].ids : []);    
// }
// const posts = (filter, orderBy, pageSize, state) => (state.entities.posts ? state.entities.posts : [])

// export const getPosts = createCachedSelector(
//     ids,
//     posts,
//     (ids, posts) => ids.map(id => posts[id])
// )(
//     (filter, orderBy, pageSize, state) => postActions.loadPostsKey(filter, orderBy, pageSize)
// );

// export const getPostsLoading = (filter, orderBy, pageSize, state) => {
//     const key = postActions.loadPostsKey(filter, orderBy, pageSize);
//     const loading = state.myPosts[key] ? state.myPosts[key].loading : false
//     return loading;
// };