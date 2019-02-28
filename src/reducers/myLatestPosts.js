import * as types from 'actions/postTypes';
import initialState from 'utils/initialState';
import { union } from 'lodash';

const reducer = (state = initialState.myLatestPosts, action) => {
    switch (action.type) {
        case types.LOAD_POSTS_STARTED: {
            return {
                ...state,
                loading: true
            }
        }

        case types.LOAD_POSTS_SUCCEEDED: {
            const { mapIdsKey, page, pageSize } = action;
            const mapIds = { ...state.mapIds };
            const currentIds = mapIds[mapIdsKey] ? mapIds[mapIdsKey].ids : [];
            mapIds[mapIdsKey] = { ...mapIds[mapIdsKey], ids: union(currentIds, action.result), page, pageSize };

            return {
                ...state,
                loading: false,
                mapIds: mapIds
            };
        }

        case types.LOAD_POSTS_FAILED: {
            return {
                ...state,
                loading: false
            }
        }

        default:
            return state
    }
}

export default reducer