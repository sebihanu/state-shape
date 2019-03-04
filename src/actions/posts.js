import * as types from './postTypes';
import { MockApi as api } from 'api/mockApi'
// import { bindActionCreators } from 'redux';
import { CALL_API } from 'utils/reduxApiMiddleware'
import schemas from 'utils/schemas'

// const loadPostStarted = () => ({ type: types.LOAD_POSTS_STARTED });
// const loadPostSucceeded = (posts) => ({ type: types.LOAD_POSTS_SUCCEEDED, payload: posts });
// const loadPostFailed = () => ({ type: types.LOAD_POSTS_FAILED });

export const loadPostsKey = (filter, orderBy) => {
    return JSON.stringify({ filter, orderBy });
}

export const loadPosts = (filter, orderBy, page = 1, pageSize = 3) => {
    return async dispatch => {
        // const actions = bindActionCreators({ loadPostStarted, loadPostSucceeded, loadPostFailed }, dispatch);

        // actions.loadPostStarted();

        // try {
        //     const posts = await api.getPostsByBlog();
        //     actions.loadPostSucceeded(posts);
        // }
        // catch{
        //     actions.loadPostFailed();
        // }        

        const loadPostsAction = (prom) => ({
            [CALL_API]: {
                prom: prom,
                promParams: { filter, orderBy, page, pageSize },
                types: [types.LOAD_POSTS_STARTED, types.LOAD_POSTS_SUCCEEDED, types.LOAD_POSTS_FAILED],
                schema: schemas.posts,
                apiType: 'list',
                key: loadPostsKey(filter, orderBy),
                page,
                pageSize
            }
        });

        dispatch(loadPostsAction(api.getPostsByBlog));
    }
}