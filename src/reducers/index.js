import { combineReducers } from 'redux'
import { merge } from 'lodash'
import myLatestPosts from './myLatestPosts'
import initialState from 'utils/initialState';

const entities = (state = initialState.entities, action) => {
  if (action.entities) {    
    return merge({}, state, action.entities);
  }

  return state;
}

export default combineReducers({
  entities,
  myLatestPosts
})