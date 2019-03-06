import * as types from './postTypes';
import { MockApi as api } from 'api/mockApi'
import { CALL_API } from 'utils/reduxApiMiddleware'
import schemas from 'utils/schemas'

export const loadPostsKey = (filter, blogId, orderBy, pageSize) => {
    return JSON.stringify({ filter, blogId, orderBy, pageSize });
}

export const loadPosts = (filter, blogId, orderBy, pageSize = 10, loadType = '') => { //loadType: '' as current, more, reload
    return async (dispatch, getState) => {
        const key = loadPostsKey(filter, blogId, orderBy, pageSize);

        const posts = getState().posts[key];
        let shouldCallApi = !(posts && posts.page) || loadType === 'more';
        if (!shouldCallApi) {
            return;
        }
//TODO implement reload
        const page = (posts && posts.page) ? (loadType === 'more' ? posts.page + 1 : posts.page) : 1;
        const loadPostsAction = (prom) => ({
            [CALL_API]: {
                prom: prom,
                promParams: { filter, blogId, orderBy, page, pageSize },
                types: [types.LOAD_POSTS_STARTED, types.LOAD_POSTS_SUCCEEDED, types.LOAD_POSTS_FAILED],
                schema: schemas.posts,
                apiType: 'list',
                key: key,
                page,
                pageSize
            }
        });

        dispatch(loadPostsAction(api.getPostsByBlog));
    }
}