import * as types from './postTypes';
import { MockApi as api } from 'api/mockApi'
import { bindActionCreators } from 'redux';
import { CALL_API } from 'utils/reduxApiMiddleware'

// const loadPostStarted = () => ({ type: types.LOAD_POSTS_STARTED });
// const loadPostSucceeded = (posts) => ({ type: types.LOAD_POSTS_SUCCEEDED, payload: posts });
// const loadPostFailed = () => ({ type: types.LOAD_POSTS_FAILED });

export const loadPosts = () => {
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
                types: [types.LOAD_POSTS_STARTED, types.LOAD_POSTS_SUCCEEDED, types.LOAD_POSTS_FAILED]
            }
        });

        dispatch(loadPostsAction(api.getPostsByBlog));
    }
}