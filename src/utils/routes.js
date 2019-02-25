import React from 'react';
import { Switch, Route} from 'react-router-dom';

import Dashboard from 'containers/Dashboard/Dashboard';


export default (
  <Switch>            
    <Route component={Dashboard} />
  </Switch>
);

