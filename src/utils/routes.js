import React from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';

import Dashboard from 'containers/Dashboard/Dashboard';
import MyBlog from 'containers/MyBlog/MyBlog';


export default (
  <Switch>                
    <Route exact path="/myblog" component={MyBlog} />
    <Route exact path="/dashboard" component={Dashboard} />
    <Redirect exact from="/" to="/dashboard" />
  </Switch>
);

