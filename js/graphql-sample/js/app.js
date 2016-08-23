import React from 'react';
import ReactDOM from 'react-dom';
import {IndexRoute, Route, Router} from 'react-router';
import Relay from 'react-relay';
import {createHashHistory} from 'history';
import {applyRouterMiddleware, useRouterHistory} from 'react-router';
import useRelay from 'react-router-relay';

import UserApp from './components/UserApp';
import UserList from './components/UserList';

import ViewerQueries from './queries/ViewerQueries';

const history   = useRouterHistory(createHashHistory)({ queryKey: false });
const mountNode = document.getElementById('root');

ReactDOM.render(
  <Router
    environment={Relay.Store}
    history={history}
    render={applyRouterMiddleware(useRelay)}>
      <Route
        path='/'
        component={UserApp}
        queries={ViewerQueries}>
          <IndexRoute
            component={UserList}
            queries={ViewerQueries}
          />
      </Route>
  </Router>,
  mountNode
);