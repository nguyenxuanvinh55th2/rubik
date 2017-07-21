import React from 'react';
import {Search} from '../../javascript/header.js'
import {removeSearch} from '../../javascript/header.js'
import {menuMobile} from '../../javascript/header.js'
import {Link} from 'react-router';
import {PinHeader, removeMenu} from '../../javascript/header.js'
import { browserHistory } from 'react-router';
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyCode: ''
    }
  }
  componentDidMount() {
    Search();
    removeSearch();
    PinHeader();
    menuMobile();
    removeMenu();
  }
  onKeyPress(event) {
    if((event.keyCode == 13 || event.charCode == 13) && !this.state.keyCode){
      browserHistory.push(`/san-pham/${this.state.keyCode}`)
    }
  }
  render() {
    return (
      <div>
        <div id="header">
          <div className="header-top hidden-xs">
            <div className="container text-right">
              <ul>
                <li>
                  <div className="form-group">
                    <input type="text" className="form-control" value={this.state.keyCode} onChange={({target}) =>{
                      this.setState({keyCode: target.value})
                    }} placeholder="Tìm kiếm" onKeyPress={(event) => this.onKeyPress(event)}/>
                    <Link className="icon-search">
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </Link>
                  </div>
                </li>
                <li>
                  <a href="https://www.facebook.com/rubiknt/" target="blank">
                    <i className="fa fa-facebook" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/channel/UCdrq9JuGSPd0aCJH-tAOXZQ" target="blank">
                    <i className="fa fa-youtube-play" aria-hidden="true"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="header-main">
            <div className="container">
              <div className="row">
                <div className="col-sm-3 col-xs-4">
                  <div className="logo">
                    <Link to={'/'}><img src="/imgs/logo.png" alt=""/></Link>
                  </div>
                </div>
                <div className="col-sm-9 col-xs-8 text-right">
                  <nav className=" hidden-xs">
                    <ul>
                      <li className="active">
                        <Link to={'/'}>TRANG CHỦ</Link>
                      </li>
                      <li>
                        <Link to={'/gioi-thieu'}>GIỚI THIỆU</Link>
                      </li>
                      <li>
                        <Link to={'/san-pham'}>SẢN PHẨM</Link>
                      </li>
                      <li>
                        <Link to={`/tin-tuc/1`}>TIN TỨC</Link>
                      </li>
                      <li>
                        <Link to={'/huong-dan-choi/2'}>HƯỚNG DẪN CHƠI</Link>
                      </li>
                      <li>
                        <Link to={'/gio-hang'}>
                          <i className="fa fa-cart-arrow-down" aria-hidden="true"></i>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                  <Link className="cart">
                    <i className="fa fa-cart-arrow-down visible-xs" aria-hidden="true"></i>
                  </Link>
                  <button type="button" className="menu-control color-red visible-xs" id="open-menu">
                    <span className="box">
                      <span className="icon-bar bar1"></span>
                      <span className="icon-bar bar2"></span>
                      <span className="icon-bar bar3"></span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="menu-mobile">
            <ul>
              <li className="active">
                <Link to={'/'}>TRANG CHỦ</Link>
              </li>
              <li>
                <Link to={'/gioi-thieu'}>GIỚI THIỆU</Link>
              </li>
              <li>
                <Link to={'/san-pham'}>SẢN PHẨM</Link>
              </li>
              <li>
                <Link to={'/tin-tuc/1'}>TIN TỨC</Link>
              </li>
              <li>
                <Link to={'/huong-dan-choi/2'}>HƯỚNG DẪN CHƠI</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
