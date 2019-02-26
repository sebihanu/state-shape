import { createSelector } from 'reselect'

const ids = state => state.myLatestPosts.ids
const posts = state => state.entities.posts

export const getPosts = createSelector(
    [ids, posts],
    (ids, posts) => ids.map(id => posts[id])
);