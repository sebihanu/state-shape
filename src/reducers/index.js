import { combineReducers } from 'redux'
import { merge } from 'lodash'
import posts from './posts'
import editPosts from './editPosts'
import updatedPosts from './updatedPosts'
import blogComments from './blogComments'
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
  editPosts,
  updatedPosts,
  blogComments,
  currentUser
})