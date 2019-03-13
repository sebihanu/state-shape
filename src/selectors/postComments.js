import createCachedSelector from 're-reselect'
import * as commentActions from 'actions/comments';
import { union } from 'lodash';

const ids = (postId, page, pageSize, state) => {
    const key = commentActions.loadPostCommentsKey(postId, pageSize);
    const comments = state.comments.postComments[key];
    if (!comments) {
        return [];
    }
    
    const result = Object.entries(comments).reduce((acc, [k, v]) => {        
        return union(acc, k <= page ? v.ids : []);
    }, []);

    return result;    
}
const comments = (postId, page, pageSize, state) => (state.entities.comments ? state.entities.comments : [])

export const getComments = createCachedSelector(
    ids,
    comments,
    (ids, comments) => ids.map(id => comments[id])
)(
    (postId, page, pageSize, state) => commentActions.loadPostCommentsKey(postId, pageSize)
);

export const getCommentsLoading = (postId, page, pageSize, state) => {
    const key = commentActions.loadPostCommentsKey(postId, pageSize);
    const comments = state.comments.postComments[key];
    const loading = comments && comments[page] ? comments[page].loading : false
    return loading;
};