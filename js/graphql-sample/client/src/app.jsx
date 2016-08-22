import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import User from './components/user';

ReactDOM.render(
  <Relay.RootContainer Component={User.Container} route={User.queries}
    onReadyStateChange={({error}) => { if (error) console.error(error) }} />,

  document.getElementById('app')
)