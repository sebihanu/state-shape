import { createSelector } from 'reselect'

export const getPosts = (key, state) => {

    const ids = state => (state.myLatestPosts.mapIds[key] ? state.myLatestPosts.mapIds[key].ids: [])
    const posts = state => state.entities.posts

    const selector = createSelector(
        [ids, posts],
        (ids, posts) => ids.map(id => posts[id])
    )

    return selector(state);
};