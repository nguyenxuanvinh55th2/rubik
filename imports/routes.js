import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { history } from './store.js';
import { Meteor } from 'meteor/meteor';

import App from './components/App.jsx';
import Category from './containers/Category'
import Home from './components/home/Home.jsx';
import Login from './components/login/Login.jsx';
import Manager from './components/manager/Manager.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';

function requireAuth(nextState, replace){
  if (!Meteor.userId()) {
    replace({
      pathname: '/login'
    })
  }
}

export const renderRoutes = () => (
  <Router history={history}>
    <Route path="/" component={App} >
      <IndexRoute component={Home}/>
      <Route path="/Category" component={Category}/>
      <Route path="login" component={Login}/>
      <Route path="manager" component={Manager} onEnter={requireAuth}>
        <IndexRoute component={Dashboard}/>
      </Route>
      <Route path="*" component={Home} />
    </Route>
  </Router>
)
