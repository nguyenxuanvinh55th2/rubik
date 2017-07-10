import React from 'react'
import {Link} from 'react-router';
export default class Footer extends React.Component{
	constructor(props) {
		super(props);

	}
	render(){
		return(
			<div>
			<div id="footer">
			<div className="main-footer">
			<div className="container">
			<div className="row">
			<div className="col-sm-3">
			<div className = "left-footer">
			<div className="logo">
			<Link to={'#'}><img src="http://i1266.photobucket.com/albums/jj538/dinhvnquang/LASTEST-01_zpsymk9eoks.png" alt="" /></Link>
			</div>
			<p><i className="fa fa-home" aria-hidden="true"></i> rubiknhatrang.com</p>
			<p><i className="fa fa-phone" aria-hidden="true"></i> 21121212</p>
			<p><i className="fa fa-envelope-o" aria-hidden="true"></i> rubiknhatrang.gmail.com</p>
			<p><i className="fa fa-map-marker" aria-hidden="true"></i> 33 nha trang</p>
			</div>
			</div>
			<div className="col-sm-5">
			<h3>Đăng kí email để nhận thông tin mới nhất</h3>
			<div className="form-group">
			<input type="text" className="form-control" />
			<Link to={'#'}  className="btn btn-danger">ĐĂNG KÍ</Link>
			</div>
			<ul>
			<li>
			<Link to={'#'}><i className="fa fa-facebook" aria-hidden="true"></i></Link>
			</li>
			<li>
			<Link to={'#'}><i className="fa fa-youtube-play" aria-hidden="true"></i></Link>
			</li>
			</ul>
			</div>
			<div className="col-sm-4">
			<div className="fanpage">
			<div className="fb-page" data-href="https://www.facebook.com/rubiknt/" data-tabs="timeline" data-width="360" data-height="200" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/rubiknt/" className="fb-xfbml-parse-ignore"><Link to={'https://www.facebook.com/rubiknt'}>Rubik-Spinner Nha Trang</Link></blockquote></div>
			</div>
			</div>
			</div>
			</div>
			</div>
			<div className="end-footer">
			<div className="container">
			<p>Coppyright  © RubikNhaTrang 2017. Design by LokaTech.</p>
			</div>
			</div>
			</div>
			</div>
			)
	}
}
