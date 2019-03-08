import * as types from './commentTypes';
import { MockApi as api } from 'api/mockApi'
import { CALL_API } from 'utils/reduxApiMiddleware'
import schemas from 'utils/schemas'

export const loadBlogCommentsKey = (blogId, pageSize) => {
    return JSON.stringify({ blogId, pageSize });
}

export const loadBlogComments = (blogId, page, pageSize = 10) => { 
    return async (dispatch, getState) => {
        const key = loadBlogCommentsKey(blogId, pageSize);

        const comments = getState().blogComments[key];
        let shouldCallApi = !(comments && comments[page] && !comments[page].loading);
        if (!shouldCallApi) {
            return;
        }
        //TODO implement reload
        
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

export const loadPostCommentsKey = (postId, pageSize) => {
    return JSON.stringify({ postId, pageSize });
}

export const loadPostComments = (postId, pageSize = 10, loadType = '') => { //loadType: '' as current, more, reload
    return async (dispatch, getState) => {
        const key = loadPostCommentsKey(postId, pageSize);

        const comments = getState().postComments[key];
        let shouldCallApi = !(comments && comments.page) || loadType === 'more';
        if (!shouldCallApi) {
            return;
        }
        //TODO implement reload
        const page = (comments && comments.page) ? (loadType === 'more' ? comments.page + 1 : comments.page) : 1;
        const loadCommentsAction = (prom) => ({
            [CALL_API]: {
                prom: prom,
                promParams: { postId, page, pageSize },
                types: [types.LOAD_POSTCOMMENTS_STARTED, types.LOAD_POSTCOMMENTS_SUCCEEDED, types.LOAD_POSTCOMMENTS_FAILED],
                schema: schemas.comments,
                apiType: 'list',
                key: key,
                page,
                pageSize
            }
        });

        dispatch(loadCommentsAction(api.getCommentsByPost));
    }
}

export const reply = (postId, comment) => {
    return async (dispatch, getState) => {
        const userId = getState().currentUser.id;

        const action = (prom) => ({
            [CALL_API]: {
                prom: prom,
                promParams: { postId, userId, comment },
                types: [types.REPLY_POST_STARTED, types.REPLY_POST_SUCCEEDED, types.REPLY_POST_FAILED],
                apiType: 'command',
                key: postId                
                //,commandCallback: () => getPost(post.id, true)
            }
        });

        dispatch(action(api.replyPost));
    }
}