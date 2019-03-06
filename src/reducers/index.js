import { combineReducers } from 'redux'
import { merge } from 'lodash'
import posts from './posts'
import currentUser from './currentUser'
import initialState from 'utils/initialState';

const entities = (state = initialState.entities, action) => {
  if (action.entities) {    
    return merge({}, state, action.entities);
  }

  return state;
}

export default combineReducers({
  entities,
  posts,
  currentUser
})