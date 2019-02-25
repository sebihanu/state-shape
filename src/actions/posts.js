import * as types from './postTypes';
import { MockApi as api } from 'api/mockApi'

export const loadPosts = () => {
    return async dispatch => {
        dispatch({ type: types.LOAD_POSTS_STARTED });

        try {
            const posts = await api.getPostsByBlog();
            dispatch({ type: types.LOAD_POSTS_SUCCEEDED, payload: posts });
        }
        catch{
            dispatch({ type: types.LOAD_POSTS_FAILED });
        }
    }
}