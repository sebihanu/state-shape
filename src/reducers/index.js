import { combineReducers } from 'redux'
import { merge } from 'lodash'
import viewPosts from './posts/viewPosts'
import editPosts from './posts/editPosts'
import blogComments from './comments/blogComments'
import postComments from './comments/postComments'
import postReplies from './comments/postReplies'
import currentUser from './currentUser'
import initialState from 'utils/initialState';

const entities = (state = initialState.entities, action) => {
  if (action.entities) {
    return merge({}, state, action.entities);
  }

  return state;
}

const comments = combineReducers({
  blogComments,
  postComments,
  postReplies
});

const posts = combineReducers({
  viewPosts,
  editPosts
});

export default combineReducers({
  entities,
  comments,
  posts,
  currentUser
})