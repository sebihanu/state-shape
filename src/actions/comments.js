import * as types from './commentTypes';
import { MockApi as api } from 'api/mockApi'
import { CALL_API } from 'utils/reduxApiMiddleware'
import schemas from 'utils/schemas'

export const loadBlogCommentsKey = (blogId, pageSize) => {
    return JSON.stringify({ blogId, pageSize });
}

export const loadBlogComments = (blogId, pageSize = 10, loadType = '') => { //loadType: '' as current, more, reload
    return async (dispatch, getState) => {
        const key = loadBlogCommentsKey(blogId, pageSize);

        const comments = getState().blogComments[key];
        let shouldCallApi = !(comments && comments.page) || loadType === 'more';
        if (!shouldCallApi) {
            return;
        }
        //TODO implement reload
        const page = (comments && comments.page) ? (loadType === 'more' ? comments.page + 1 : comments.page) : 1;
        const loadCommentsAction = (prom) => ({
            [CALL_API]: {
                prom: prom,
                promParams: { blogId, page, pageSize },
                types: [types.LOAD_BLOGCOMMENTS_STARTED, types.LOAD_BLOGCOMMENTS_SUCCEEDED, types.LOAD_BLOGCOMMENTS_FAILED],
                schema: schemas.comments,
                apiType: 'list',
                key: key,
                page,
                pageSize
            }
        });

        dispatch(loadCommentsAction(api.getCommentsByBlog));
    }
}