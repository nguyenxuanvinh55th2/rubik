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
import StockModel from './components/stockModel/StockModel.jsx';
import StockModelForm from './components/stockModel/StockModelForm.jsx';

import DetailProduct from './components/product/DetailProduct.jsx';
import Cart from './components/product/Cart.jsx';
import Checkout from './components/product/Checkout.jsx';

import StockType from './containers/StockType.js';

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
      <Route path="login" component={Login}/>
      <Route path="dashboard" component={Manager} onEnter={requireAuth}>
        <IndexRoute component={Dashboard}/>
        <Route path="/stockModels" component={StockModel}/>
        <Route path="/category" component={Category}/>
        <Route path="/stockModelForm" component={StockModelForm}/>
        <Route path="/stockType" component={StockType}/>
      </Route>
      <Route path="/productDetail/:id" component={DetailProduct} />
      <Route path="/shoppingCart" component={Cart} />
      <Route path="/checkOut" component={Checkout} />
      <Route path="*" component={Home} />
    </Route>
  </Router>
)
