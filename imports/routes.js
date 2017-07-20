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

import OrderDevoice from './components/OrderManager.jsx';

import DetailProduct from './components/product/DetailProduct.jsx';
import Cart from './components/product/Cart.jsx';
import Checkout from './components/product/Checkout.jsx';

import StockType from './containers/StockType.js';

import Post from './components/post/Post.jsx';
import PostForm from './components/post/PostForm.jsx';
import WrapFontEnd from './components/wrap/WrapFontEnd.jsx';
import About from './components/about/About.jsx';
import DetailNew from './components/news/DetailNew.jsx';
import EditAbout from './components/theme/EditAbout.jsx';
import News from './containers/News';
import AllPoduct from './components/product/AllPoduct.jsx';

function requireAuth(nextState, replace){
  if (!Meteor.userId()) {
    replace({
      pathname: '/login'
    })
  }
}

export const renderRoutes = () => (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
    <Route path="/" component={App} >
      <Route component={WrapFontEnd}>
          <IndexRoute component={Home}/>
          <Route path="/productDetail/:id" component={DetailProduct} />
          <Route path="/shoppingCart" component={Cart} />
          <Route path="/checkOut" component={Checkout} />
          <Route path="/gioi-thieu" component={About} />
          <Route path="/chi-tiet/:_id" component={DetailNew} />
          <Route path="/tin-tuc/:_id" component={News} />
          <Route path="/huong-dan-choi/:_id" component={News} />
          <Route path="/san-pham" component={AllPoduct} />
      </Route>
      <Route path="login" component={Login}/>
      <Route path="dashboard" component={Manager} onEnter={requireAuth}>
        <IndexRoute component={Dashboard}/>
        <Route path="/stockModels" component={StockModel}/>
        <Route path="/category" component={Category}/>
        <Route path="/stockModelForm" component={StockModelForm}/>
        <Route path="/stockModelForm/:_id" component={StockModelForm}/>
        <Route path="/stockType" component={StockType}/>
        <Route path="/post" component={Post}/>
        <Route path="/postForm" component={PostForm}/>
        <Route path="/postForm/:_id" component={PostForm}/>
        <Route path="/editAbout" component={EditAbout}/>
      </Route>
      <Route path="*" component={Home} />
    </Route>
    <Router>

    </Router>
  </Router>
)
