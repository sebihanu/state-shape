import { createSelector } from 'reselect'
import * as postActions from 'actions/posts';

export const getPosts = (filter, orderBy, state) => {
    const key = postActions.loadPostsKey(filter, orderBy);

    const ids = state => (state.myLatestPosts[key] && state.myLatestPosts[key].ids ? state.myLatestPosts[key].ids : [])
    const posts = state => state.entities.posts

    const selector = createSelector(
        [ids, posts],
        (ids, posts) => ids.map(id => posts[id])
    )

    return selector(state);
};

export const getPostsLoading = (filter, orderBy, state) => {
    const key = postActions.loadPostsKey(filter, orderBy);
    const loading = state.myLatestPosts[key] ? state.myLatestPosts[key].loading : false
    return loading;
};