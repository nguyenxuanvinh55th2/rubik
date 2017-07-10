import React from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory} from 'react-router';
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }
  handleLogin(){
    Meteor.loginWithPassword(this.state.email, this.state.password, (err)=>{
      if(err){
        this.props.addNotificationMute({fetchData: true, message: 'Đăng nhập thất bại', level:'error'});
      }
      else {
        this.props.addNotificationMute({fetchData: true, message: 'Đăng nhập thành công', level:'success'});
        browserHistory.push('/manager')
      }
    });
  }
  render(){
    return(
      <form className="form-horizontal">
        <div className="form-group">
          <div className="col-sm-9">
            <input type="text" className="form-control" placeholder="Email" value={this.state.email} onChange={({target}) => this.setState({email: target.value})}/></div>
        </div>
        <div className="form-group">
          <div className="col-sm-9">
            <input type="password" className="form-control" placeholder="Mật khẩu" value={this.state.password} onChange={({target}) => this.setState({password: target.value})}/></div>
        </div>
        <div className="form-group">
          <label className="col-sm-3 control-label" ></label>
          <div className="col-sm-9" style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <button className="btn btn-primary" type="button" onClick={() => this.handleLogin()}>Đăng Nhập</button>
          </div>
        </div>
    </form>
    )
  }
}
