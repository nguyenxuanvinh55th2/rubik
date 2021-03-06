import React from 'react'
import {Link} from 'react-router';
import {PinTop} from '../../javascript/header.js';
import { Classifies } from '../../../collections/classifies';
export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    }
  }
  componentDidMount() {
    PinTop();
  }
  render() {
    return (
      <div>
        <div id="footer">
          <div className="main-footer">
            <div className="container">
              <div className="row">
                <div className="col-sm-3">
                  <div className="left-footer">
                    <div className="logo">
                      <Link to={'/'}><img src="/imgs/logo.png" alt=""/></Link>
                    </div>
                    <ul className="list-ft">
                      <p>
                        <i className="fa fa-home" aria-hidden="true"></i>
                        rubiknhatrang.com</p>
                      <p>
                        <i className="fa fa-phone" aria-hidden="true"></i>
                        01867634580 - 01658529638</p>
                      <p>
                        <i className="fa fa-envelope-o" aria-hidden="true"></i>
                        rubiknhatrang@gmail.com</p>
                      <p>
                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                        41/43 Lang Liêu, Vĩnh Phước, Nha Trang</p>
                    </ul>
                  </div>
                </div>
                <div className="col-sm-5">
                  <h3>Đăng kí email để nhận thông tin mới nhất</h3>
                  <div className="form-group">
                    <input type="text" value={this.state.email} className="form-control" onChange={({target}) => {
                      this.setState({email: target.value})
                    }}/>
                    <Link className="btn btn-danger" onClick={() => {
                      let mailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
                      if(this.state.email){
                        if(!mailReg.test(this.state.email)) {
                          this.props.addNotificationMute({fetchData: true, message: 'Sai định dạng mail', level: 'warning'});
                        }
                        else {
                          Classifies.insert({
                            name: this.state.email,
                            isCustomer: true, active: true
                          });
                          this.props.addNotificationMute({fetchData: true, message: 'Cảm ơn bản đã ủng hộ shop, shop sẽ liên hệ lại với bạn, chào bạn!', level: 'success'});
                        }
                      }
                      else {
                        this.props.addNotificationMute({fetchData: true, message: 'Vui lòng nhập địa chỉ mail', level: 'warning'});
                      }
                    }}>ĐĂNG KÍ</Link>
                  </div>
                  <ul className="text-center">
                    <li>
                      <Link to={'https://www.facebook.com/rubiknt'} target="blank">
                        <i className="fa fa-facebook" aria-hidden="true"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to={'https://www.youtube.com/channel/UCdrq9JuGSPd0aCJH-tAOXZQ'} target="blank">
                        <i className="fa fa-youtube-play" aria-hidden="true"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-sm-4">
                  <div className="fanpage">
                    <div className="fb-page" data-href="https://www.facebook.com/rubiknt/" data-tabs="timeline" data-width="360" data-height="200" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true">
                      <blockquote cite="https://www.facebook.com/rubiknt/" className="fb-xfbml-parse-ignore">
                        <Link to={'https://www.facebook.com/rubiknt'}>Rubik-Spinner Nha Trang</Link>
                      </blockquote>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="end-footer">
            <div className="container">
              <p>Coppyright © RubikNhaTrang 2017.
                <span>Design by
                  <a style={{
                    color: '#fff',
                    textDecoration: 'underline'
                  }} target="blank" href="http://lokatech.net/"> LokaTech.</a>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
