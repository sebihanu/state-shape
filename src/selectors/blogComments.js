import { createSelector } from 'reselect'
import createCachedSelector from 're-reselect'
import * as commentActions from 'actions/comments';

const ids = (blogId, pageSize, state) => {
    const key = commentActions.loadBlogCommentsKey(blogId, pageSize);
    return (state.blogComments[key] && state.blogComments[key].ids ? state.blogComments[key].ids : []);    
}
const comments = (blogId, pageSize, state) => (state.entities.comments ? state.entities.comments : [])

export const getComments = createCachedSelector(
    ids,
    comments,
    (ids, comments) => ids.map(id => comments[id])
)(
    (blogId, pageSize, state) => commentActions.loadBlogCommentsKey(blogId, pageSize)
);

export const getCommentsLoading = (blogId, pageSize, state) => {
    const key = commentActions.loadBlogCommentsKey(blogId, pageSize);
    const loading = state.blogComments[key] ? state.blogComments[key].loading : false
    return loading;
};