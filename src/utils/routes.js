import React from 'react';
import { Switch, Route} from 'react-router-dom';

import Comp1Container from 'components/feature1/Comp1Container';


export default (
  <Switch>            
    <Route component={Comp1Container} />
  </Switch>
);

