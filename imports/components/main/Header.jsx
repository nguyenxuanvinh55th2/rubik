import React from 'react';
import {Search} from '../../javascript/header.js'
import {removeSearch} from '../../javascript/header.js'
import {menuMobile} from '../../javascript/header.js'
import {Link} from 'react-router';
import {PinHeader} from '../../javascript/header.js'

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    Search();
    removeSearch();
    PinHeader();
    menuMobile();
  }
  render() {
    return (
      <div>
        {/* <div id="circularG">
		<div id="circularG_1" className="circularG"></div>
		<div id="circularG_2" className="circularG"></div>
		<div id="circularG_3" className="circularG"></div>
		<div id="circularG_4" className="circularG"></div>
		<div id="circularG_5" className="circularG"></div>
		<div id="circularG_6" className="circularG"></div>
		<div id="circularG_7" className="circularG"></div>
		<div id="circularG_8" className="circularG"></div>
</div> */}
        <div id="header">
          <div className="header-top hidden-xs">
            <div className="container text-right">
              <ul>
                <li>
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Tìm kiếm"/>
                    <Link to={'#'} className="icon-search">
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
                    <Link to={'#'}><img src="http://i1266.photobucket.com/albums/jj538/dinhvnquang/LASTEST-01_zpsymk9eoks.png" alt=""/></Link>
                  </div>
                </div>
                <div className="col-sm-9 col-xs-8 text-right">
                  <nav className=" hidden-xs">
                    <ul>
                      <li className="active">
                        <Link to={'#'}>TRANG CHỦ</Link>
                      </li>
                      <li>
                        <Link to={'#'}>GIỚI THIỆU</Link>
                      </li>
                      <li>
                        <Link to={'#'}>SẢN PHẨM</Link>
                      </li>
                      <li>
                        <Link to={'#'}>TIN TỨC</Link>
                      </li>
                      <li>
                        <Link to={'#'}>HƯỚNG DẪN CHƠI</Link>
                      </li>
                      <li>
                        <Link to={'#'}>
                          <i className="fa fa-cart-arrow-down" aria-hidden="true"></i>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                  <Link to={'#'} className="cart">
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
                <Link to={'#'}>TRANG CHỦ</Link>
              </li>
              <li>
                <Link to={'#'}>GIỚI THIỆU</Link>
              </li>
              <li>
                <Link to={'#'}>SẢN PHẨM</Link>
              </li>
              <li>
                <Link to={'#'}>TIN TỨC</Link>
              </li>
              <li>
                <Link to={'#'}>HƯỚNG DẪN CHƠI</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
