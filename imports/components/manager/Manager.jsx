import React from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import __ from 'lodash';
import store from '../../store.js'

export default class Manager extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    let childProps = __.cloneDeep(this.props);
    delete childProps.children;
    return (
      <div>
        <nav className="navbar navbar-inverse" style={{borderRadius: 0}}>
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">RUBIK NHA TRANG</a>
            </div>
            <ul className="nav navbar-nav">
              <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" href="#">Danh mục
                <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><a href="#">Chủng loại</a></li>
                  <li><a href="#">Kiểu hàng</a></li>
                  <li><a href="#">Khách hàng</a></li>
                </ul>
              </li>
              <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" href="#">Kho cửa hàng
                <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><a href="#">Nhập kho</a></li>
                  <li><a href="#">Nhật kí cửa hàng</a></li>
                </ul>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#"><span className="glyphicon glyphicon-user"></span>{}</a></li>
              <li><a onClick={() => {
                Meteor.logout();
                browserHistory.push('/');
              }}><span className="glyphicon glyphicon-log-out"></span>Đăng xuất</a></li>
            </ul>
          </div>
        </nav>
        {React.cloneElement(this.props.children, childProps)}
      </div>
    )
  }
}
