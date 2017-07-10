import React from 'react'
import Sliders from './Slider.jsx'
import SliderNew from './SliderNews.jsx'
import Header from '../main/Header.jsx'
import Footer from '../main/Footer.jsx'
import Product from '../product/Product.jsx'
import {PinTop} from '../../javascript/header.js'
import { Link } from 'react-router';
import {showProduct} from '../../javascript/header.js'
export default class Home extends React.Component {
constructor(props) {
super(props)
}
 componentDidMount() {
PinTop();
showProduct();
}
render(){
return (
<div>
	<Header />
	<Sliders />
	<div className="sec-cate">
		<div className="container">
			<div className="row">
				<div className="col-sm-4">
					<div className="item bg" style={{backgroundImage: "url('http://i1266.photobucket.com/albums/jj538/dinhvnquang/image-cate_zpsl60oehs8.jpg')"}}>
						<Link to={'#'}  className="gray"></Link>
						<p>
							<Link to={'#'} className="btn btn-cate">Spinner</Link>
						</p>
					</div>
					<div className="item bg" style={{backgroundImage: "url('http://i1266.photobucket.com/albums/jj538/dinhvnquang/img2-cate_zpsj29lzkqx.jpg')"}}>
						<Link to={'#'}  className="gray"></Link>
						<p>
							<Link to={'#'} className="btn btn-cate">rubik</Link>
						</p>
					</div>
				</div>
				<div className="col-sm-4">
					<div className="item-center bg" style={{backgroundImage: "url('http://i1266.photobucket.com/albums/jj538/dinhvnquang/img3-cate_zpsogr7lgka.jpg')"}}>
						<Link to={'#'}  className="gray" ></Link>
						<p>
							<Link to={'#'} className="btn btn-cate">Hướng dẫn chơi</Link>
						</p>
					</div>
				</div>
				<div className="col-sm-4">
					<div className="item bg" style={{backgroundImage: "url('http://i1266.photobucket.com/albums/jj538/dinhvnquang/image-cate_zpsl60oehs8.jpg')"}}>
						<Link to={'#'}  className="gray"></Link>
						<p>
							<Link to={'#'} className="btn btn-cate">Sản phẩm mới</Link>
						</p>
					</div>
					<div className="item bg" style={{backgroundImage: "url('http://i1266.photobucket.com/albums/jj538/dinhvnquang/img2-cate_zpsj29lzkqx.jpg')"}}>
						<Link to={'#'}  className="gray"></Link>
						<p>
							<Link to={'#'} className="btn btn-cate">phụ kiện</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div className="sec-product">
	<div className="container">
	<h2 className="text-center">SẢN PHẨM MỚI</h2>
	<div className="two-space"></div>
		<div className="row">
			<Product />
		</div>
		<p className="text-center"><Link to={'#'} className="btn-more">Xem thêm</Link></p>
	</div>
	</div>
	<div className="sec-product">
	<div className="container">
	<h2 className="text-center">TOP SẢN PHẨM BÁN CHẠY</h2>
	<div className="two-space"></div>
		<div className="row">
			<Product />
		</div>
		<p className="text-center"><Link to={'#'} className="btn-more">Xem thêm</Link></p>
	</div>
	</div>
	<SliderNew />
	<Footer />
	<div className="pin-top">
		<Link to={'#'} ><i className="fa fa-long-arrow-up" aria-hidden="true"></i></Link>
	</div>
</div>
)
}
}
