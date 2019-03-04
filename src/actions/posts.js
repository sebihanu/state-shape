import * as types from './postTypes';
import { MockApi as api } from 'api/mockApi'
import { CALL_API } from 'utils/reduxApiMiddleware'
import schemas from 'utils/schemas'

export const loadPostsKey = (filter, orderBy, pageSize) => {
    return JSON.stringify({ filter, orderBy, pageSize });
}

export const loadPosts = (filter, orderBy, pageSize = 10, loadType = '') => { //loadType: '' as current, more, reload
    return async (dispatch, getState) => {
        const key = loadPostsKey(filter, orderBy, pageSize);

        const myPosts = getState().myPosts[key];
        let shouldCallApi = !(myPosts && myPosts.page) || loadType === 'more';
        if (!shouldCallApi) {
            return;
        }
//TODO implement reload
        const page = (myPosts && myPosts.page) ? (loadType === 'more' ? myPosts.page + 1 : myPosts.page) : 1;
        const loadPostsAction = (prom) => ({
            [CALL_API]: {
                prom: prom,
                promParams: { filter, orderBy, page, pageSize },
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