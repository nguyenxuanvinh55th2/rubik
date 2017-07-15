import React from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import __ from 'lodash';
import store from '../../store.js';

export default class HeaderManager extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div className="header-admin">
        <div className="top-header-admin">
          <div className="left-top-header">
            <p>RUBIK NHA TRANG</p>
          </div>
          <ul className="text-right">
            <li><a href=""><i className="fa fa-bell-o" aria-hidden="true"></i></a></li>
            <li>
          <div className="dropdown">
              <a className="btn dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"><i className="fa fa-user-o" aria-hidden="true"></i> Admin<span className="caret"> </span>
            </a>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
              <li><a href="#">Thông tin</a></li>
              <li><a href="#">Đổi mật khẩu</a></li>
              <li><a onClick={() => {
                Meteor.logout();
                browserHistory.push('/');
              }}>Đăng xuất</a></li>
              </ul>
          </div>
          </li>
          </ul>
        </div>
        <nav className="navbar navbar-inverse" style={{borderRadius: 0}}>
          <div className="container-fluid">
            <ul className="nav navbar-nav">
              <li><a onClick={() => browserHistory.push('/dashboard')}>Dashboard</a></li>
              <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown">Danh mục
                <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><a onClick={() => browserHistory.push('/category')}>Chủng loại</a></li>
                  <li><a onClick={() => browserHistory.push('/stockModels')}>Kiểu hàng</a></li>
                  <li><a onClick={() => browserHistory.push('/customer')}>Khách hàng</a></li>
                </ul>
              </li>
              <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown">Kho cửa hàng
                <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><a href="#">Nhập kho</a></li>
                  <li><a href="#">Nhật kí cửa hàng</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
    </div>
    )
  }
}
