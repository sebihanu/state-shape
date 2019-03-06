import React from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';

import Dashboard from 'containers/Dashboard/Dashboard';
import MyBlog from 'containers/MyBlog/MyBlog';
import AddEditPost from 'containers/AddEditPost/AddEditPost';

const NotFound = () => (
  <div>
      <h2>Not found</h2>      
  </div>
);

export default (
  <Switch>                
    <Route exact path="/myblog" component={MyBlog} />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route path="/posts/:postId(\d+)" component={AddEditPost} />
    <Route exact path="/posts/:newPost(new)" component={AddEditPost} />
    <Redirect exact from="/" to="/dashboard" />
    <Route render={() => <NotFound title="PageNotFound"></NotFound>} />
  </Switch>
);

