import createCachedSelector from 're-reselect'
import * as commentActions from 'actions/comments';

const ids = (postId, pageSize, state) => {
    const key = commentActions.loadPostCommentsKey(postId, pageSize);
    return (state.postComments[key] && state.postComments[key].ids ? state.postComments[key].ids : []);    
}
const comments = (postId, pageSize, state) => (state.entities.comments ? state.entities.comments : [])

export const getComments = createCachedSelector(
    ids,
    comments,
    (ids, comments) => ids.map(id => comments[id])
)(
    (postId, pageSize, state) => commentActions.loadPostCommentsKey(postId, pageSize)
);

export const getCommentsLoading = (postId, pageSize, state) => {
    const key = commentActions.loadPostCommentsKey(postId, pageSize);
    const loading = state.postComments[key] ? state.postComments[key].loading : false
    return loading;
};