import React from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';

import Dashboard from 'containers/Dashboard/Dashboard';
import MyBlogPage from 'containers/MyBlog/MyBlogPage';
import AddEditPostPage from 'containers/AddEditPost/AddEditPostPage';
import MessageBusPage from 'containers/MessageBus/MessageBusPage';

const NotFound = () => (
  <div>
      <h2>Not found</h2>      
  </div>
);

export default (
  <Switch>                
    <Route exact path="/myblog" component={MyBlogPage} />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route exact path="/bus" component={MessageBusPage} />
    <Route path="/posts/:postId(\d+)" component={AddEditPostPage} />
    <Route exact path="/posts/:newPost(new)" component={AddEditPostPage} />
    <Redirect exact from="/" to="/bus" />
    <Route render={() => <NotFound title="PageNotFound"></NotFound>} />
  </Switch>
);

