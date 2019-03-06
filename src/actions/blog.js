import * as types from './blogTypes';
import { MockApi as api } from 'api/mockApi'
import { CALL_API } from 'utils/reduxApiMiddleware'
import schemas from 'utils/schemas'

export const loadMyBlog = () => { 
    return async (dispatch, getState) => {        
        const currentUser = getState().currentUser;
        let shouldCallApi = !currentUser.blogId;
        if (!shouldCallApi) {
            return;
        }
        
        const loadMyBlog = (prom) => ({
            [CALL_API]: {
                prom: prom,
                promParams: { ownerId: currentUser.id },
                types: [types.LOAD_MYBLOG_STARTED, types.LOAD_MYBLOG_SUCCEEDED, types.LOAD_MYBLOG_FAILED],
                schema: schemas.blog                
            }
        });

        dispatch(loadMyBlog(api.getBlogByOwner));
    }
}