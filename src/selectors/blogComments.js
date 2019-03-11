import createCachedSelector from 're-reselect'
import * as commentActions from 'actions/comments';
import { union } from 'lodash';

const ids = (blogId, page, pageSize, state) => {
    const key = commentActions.loadBlogCommentsKey(blogId, pageSize);
    if (!state.comments.blogComments[key]) {
        return [];
    }

    const comments = state.comments.blogComments[key];
    const result = Object.entries(comments).reduce((acc, [k, v]) => {        
        return union(acc, k <= page ? v.ids : []);
    }, []);

    return result;
}
const comments = (blogId, page, pageSize, state) => (state.entities.comments ? state.entities.comments : [])

export const getComments = createCachedSelector(
    ids,
    comments,
    (ids, comments) => ids.map(id => comments[id])
)(
    (blogId, page, pageSize, state) => commentActions.loadBlogCommentsKey(blogId, pageSize)
);

export const getCommentsPageLoading = (blogId, page, pageSize, state) => {
    const key = commentActions.loadBlogCommentsKey(blogId, pageSize);
    const comments = state.comments.blogComments[key];
    const loading = comments && comments[page] ? comments[page].loading : false
    return loading;
};

// export const getLastLoadedPage = (blogId, pageSize, state) => {
//     const key = commentActions.loadBlogCommentsKey(blogId, pageSize);
//     if (!state.comments.blogComments[key]) {
//         return 0;
//     }
//     const result = Object.entries(state.comments.blogComments[key]).reduce((acc, [k, v]) => {
//         return Math.max(acc, v.loading ? 0 : k);
//     }, 0);

//     return result;
// }