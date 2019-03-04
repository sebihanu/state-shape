import { createSelector } from 'reselect'
import * as postActions from 'actions/posts';

export const getPosts = (filter, orderBy, pageSize, state) => {
    const key = postActions.loadPostsKey(filter, orderBy, pageSize);

    const ids = state => (state.myPosts[key] && state.myPosts[key].ids ? state.myPosts[key].ids : [])
    const posts = state => state.entities.posts

    const selector = createSelector(
        [ids, posts],
        (ids, posts) => ids.map(id => posts[id])
    )

    return selector(state);
};

export const getPostsLoading = (filter, orderBy, pageSize, state) => {
    const key = postActions.loadPostsKey(filter, orderBy, pageSize);
    const loading = state.myPosts[key] ? state.myPosts[key].loading : false
    return loading;
};