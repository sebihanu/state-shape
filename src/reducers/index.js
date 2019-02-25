import { combineReducers } from 'redux'
import posts from './entities/posts'
import myLatestPosts from './myLatestPosts'

const entities = combineReducers({ posts });

export default combineReducers({
  myLatestPosts,
  entities
})