import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import {IndexRoute, Route, Router} from 'react-router';

import App from './components/App';
import EmployeeList from './components/EmployeeList';
import EmployeeInfo from './components/EmployeeInfo';
import ViewerQueries from './queries/ViewerQueries';

import {createHashHistory} from 'history';
import {applyRouterMiddleware, useRouterHistory} from 'react-router';
const history = useRouterHistory(createHashHistory)({ queryKey: false });
import useRelay from 'react-router-relay';

ReactDOM.render(
  <Router environment={Relay.Store} history={history} render={applyRouterMiddleware(useRelay)}>
    <Route path="/" component={App} queries={ViewerQueries}>
      <Route path="employees" component={EmployeeList} queries={ViewerQueries}/>
      <Route path="employee"  component={EmployeeInfo} queries={ViewerQueries}/>
    </Route>
  </Router>,
  document.getElementById('root')
)