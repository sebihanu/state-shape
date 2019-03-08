import { combineReducers } from 'redux'
import { merge } from 'lodash'
import posts from './posts'
import editPosts from './editPosts'
import blogComments from './blogComments'
import postComments from './postComments'
import postReplies from './postReplies'
import currentUser from './currentUser'
import initialState from 'utils/initialState';

const entities = (state = initialState.entities, action) => {
  if (action.entities) {    
    return merge({}, state, action.entities);
  }

  return state;
}

const comments = combineReducers({
  blogComments
});

export default combineReducers({
  entities,
  comments,
  posts,
  editPosts,    
  postComments,
  postReplies,
  currentUser
})