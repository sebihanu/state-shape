import createCachedSelector from 're-reselect'
import * as commentActions from 'actions/comments';
import { union } from 'lodash';

const ids = (blogId, pageSize, state) => {
    const key = commentActions.loadBlogCommentsKey(blogId, pageSize);
    if (!state.blogComments[key]) {
        return [];
    }

    const comments = state.blogComments[key];
    const result = Object.values(comments).reduce((acc, val, index, array) => {
        return union(acc, val.ids ? val.ids : []);
    }, []);

    return result;
}
const comments = (blogId, pageSize, state) => (state.entities.comments ? state.entities.comments : [])

export const getComments = createCachedSelector(
    ids,
    comments,
    (ids, comments) => ids.map(id => comments[id])
)(
    (blogId, pageSize, state) => commentActions.loadBlogCommentsKey(blogId, pageSize)
);

export const getCommentsPageLoading = (blogId, page, pageSize, state) => {
    const key = commentActions.loadBlogCommentsKey(blogId, pageSize);
    const loading = state.blogComments[key] && state.blogComments[key][page] ? state.blogComments[key][page].loading : false
    return loading;
};

export const getLastLoadedPage = (blogId, pageSize, state) => {
    const key = commentActions.loadBlogCommentsKey(blogId, pageSize);
    if (!state.blogComments[key]) {
        return 0;
    }
    const result = Object.entries(state.blogComments[key]).reduce((acc, [k, v]) => {
        return Math.max(acc, v.loading ? 0 : k);
    }, 0);

    return result;
}