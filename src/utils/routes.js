import React from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';

import Dashboard from 'containers/Dashboard/Dashboard';
import MyBlogPage from 'containers/MyBlog/MyBlogPage';
import AddEditPost from 'containers/AddEditPost/AddEditPost';

const NotFound = () => (
  <div>
      <h2>Not found</h2>      
  </div>
);

export default (
  <Switch>                
    <Route exact path="/myblog" component={MyBlogPage} />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route path="/posts/:postId(\d+)" component={AddEditPost} />
    <Route exact path="/posts/:newPost(new)" component={AddEditPost} />
    <Redirect exact from="/" to="/dashboard" />
    <Route render={() => <NotFound title="PageNotFound"></NotFound>} />
  </Switch>
);

