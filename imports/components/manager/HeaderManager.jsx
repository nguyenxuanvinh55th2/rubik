import React from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import __ from 'lodash';
import store from '../../store.js';
import Dialog from 'material-ui/Dialog';
import { Accounts } from 'meteor/accounts-base';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import CryptoJS from "crypto-js";
class HeaderManager extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
      oldPassword: '',
      password: '',
      confirmPassword: '',
      error: ''
    }
  }
  handleSave(){
    if(this.state.password !== this.state.confirmPassword){
      this.setState({
        error: 'Mật khẩu mới và xác nhận mật khẩu không đúng '
      })
    }
    else {
      let encryptedPass = CryptoJS.AES.encrypt(this.state.password, "def4ult");
      let encryptedOldPass = CryptoJS.AES.encrypt(this.state.oldPassword, "def4ult");
      this.props.changePassword({
          userId: Meteor.userId(),
          password: encryptedPass.toString(),
          oldPassword: encryptedOldPass.toString()
      }).then(res=>{
        browserHistory.push('/login');
      })
      .catch(err=>{
          this.setState({error: err.message.split('error: ')[1]});
      });
    }
  }
  render(){
    return(
      <div className="header-admin">
        <div className="top-header-admin">
          <div className="left-top-header">
            <p style={{cusor: 'pointer'}} onClick={() => browserHistory.push('/')}>RUBIK NHA TRANG</p>
          </div>
          <ul className="text-right">
            {/* <li><a href=""><i className="fa fa-bell-o" aria-hidden="true"></i></a></li> */}
            <li>
          <div className="dropdown">
              <a className="btn dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"><i className="fa fa-user-o" aria-hidden="true"></i> Admin<span className="caret"> </span>
            </a>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
              {/* <li><a href="#">Thông tin</a></li> */}
              <li><a onClick={() => this.setState({open: true})}>Đổi mật khẩu</a></li>
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
                  <li><a onClick={() => browserHistory.push('/stockType')}>Loại hàng</a></li>
                  <li><a onClick={() => browserHistory.push('/category')}>Chủng loại</a></li>
                  <li><a onClick={() => browserHistory.push('/stockModels')}>Kiểu hàng</a></li>
                  {/* <li><a onClick={() => browserHistory.push('/customer')}>Khách hàng</a></li> */}
                </ul>
              </li>
              <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown">Kho cửa hàng
                <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><a onClick={() => browserHistory.push('/orderDevoice')}>Đặt hàng</a></li>
                  <li><a onClick={() => browserHistory.push('/invoiceManage')}>Quản lý đơn hàng</a></li>
                </ul>
              </li>
              <li><a onClick={() => browserHistory.push('/post')}>Bài đăng</a></li>
              <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown">Giao diện
                <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><a onClick={() => browserHistory.push('/editAbout')}>Chỉnh sửa trang giới thiệu</a></li>
                  <li><a href="#">Slider</a></li>
                </ul>
              </li>
              <li><a onClick={() => browserHistory.push('/user')}>Người dùng</a></li>
            </ul>
          </div>
        </nav>
        <Dialog modal={true}
            open={this.state.open}
            contentStyle={{width: 500, maxWidth: 'none',}}
            bodyStyle={{padding: 0}}
        >
          <div className="modal-dialog" style={{width: 'auto', margin: 0}}>
              <div className="modal-content">
                  <div className="modal-header">
                      <h4 className="modal-title">Đổi mật khẩu</h4>
                  </div>
                  <div className="modal-body" style={{height: window.innerHeight - 250, overflowY: 'auto', overflowX: 'hidden'}}>
                    {this.state.error?
                        <div className="alert alert-danger">
                            <span className="pficon pficon-error-circle-o"></span>
                            <strong>{this.state.error}</strong>
                        </div>
                    :null}
                    <form className="form-horizontal">
                      <div className="form-group">
                        <label className="control-label col-sm-4">Mật khẩu cũ</label>
                        <div className="col-sm-8">
                          <input type="password" className="form-control" value={this.state.oldPassword} onChange={({target}) => this.setState({oldPassword: target.value})} />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="control-label col-sm-4">Mật khẩu mới</label>
                        <div className="col-sm-8">
                          <input type="password" className="form-control" value={this.state.password} onChange={({target}) => this.setState({password: target.value})} />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="control-label col-sm-4">Xác nhận MK mới</label>
                        <div className="col-sm-8">
                          <input type="password" className="form-control" value={this.state.confirmPassword} onChange={({target}) => this.setState({confirmPassword: target.value})} />
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer" style={{margin: 0}}>
                      <button type="button" className="btn btn-default" onClick={() => this.setState({open: false})}>Thoát</button>
                      <button type="button" className="btn btn-primary" disabled={!this.state.password || !this.state.confirmPassword || !this.state.oldPassword} onClick={() => this.handleSave()}>Lưu</button>
                  </div>
              </div>
          </div>
        </Dialog>
    </div>
    )
  }
}

const CHANGE_PASSWORD = gql`
  mutation changePassword($userId: String, $oldPassword: String, $password: String) {
    changePassword(userId: $userId, oldPassword: $oldPassword, password: $password)
  }
`;
export default compose(graphql(CHANGE_PASSWORD, {
    props: ({mutate}) => ({
        changePassword: ({userId, oldPassword, password}) => mutate({
            variables: {userId, oldPassword, password}
        })
    })
}))(HeaderManager);
